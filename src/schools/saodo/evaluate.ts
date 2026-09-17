import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { SAODO_THPT_THRESHOLD } from './eligibility';
import { saodoAdmissionMethods } from './methods';
import { SAODO_THPT_EXAM_THRESHOLD_30, SAODO_THRESHOLD_GROUP_LABELS, type SaodoThresholdGroup } from './thresholds';
import { calculateSaodoEffectivePriority30, lookupSaodoStandardPriority30 } from './priority';
import { saodoThptExamThresholdEvidence } from './evidence';

export function evaluateSaodoAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'saodo',
    schoolShortName: 'SDU',
    method: saodoAdmissionMethods[0],
    profile,
    context,
    threshold: SAODO_THPT_THRESHOLD,
    evidenceSourceId: 'saodo-cutoff-notice-2026',
  });
}

const SAODO_EXACT_METHOD = saodoAdmissionMethods[1];

export interface SaodoThptExamExactEvaluationContext {
  /** Nhóm ngưỡng: 'law' (Luật, 20/30) | 'standard' (18 ngành còn lại, 15/30). */
  group?: SaodoThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** SDU 2026 — thi TN THPT: so TỔNG THÔ 3 môn với điểm chuẩn nhóm ngành (nguồn im lặng về việc
 * gồm ưu tiên hay chưa). Điểm ưu tiên chỉ hiển thị tham khảo trong `score`. */
export function evaluateSaodoThptExamExactAdmission(
  profile: ApplicantProfile,
  context: SaodoThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'saodo',
    year: SAODO_EXACT_METHOD.year,
    methodId: SAODO_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'saodo-program-group', label: 'Chọn nhóm ngành SDU (Luật / ngành khác).' });
    return partial('Cần chọn nhóm ngành SDU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'saodo-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển SDU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét SDU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `saodo-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp SDU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét SDU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupSaodoStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateSaodoEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = SAODO_THPT_EXAM_THRESHOLD_30[context.group];
  const eligible = raw30 >= threshold;

  const reasons = [
    `Điểm chuẩn SDU 2026 (thi TN THPT, ${SAODO_THRESHOLD_GROUP_LABELS[context.group]}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'saodo-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: saodoThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'saodo-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: saodoThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'saodo-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so điểm chuẩn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: saodoThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'saodo-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'saodo',
    year: SAODO_EXACT_METHOD.year,
    methodId: SAODO_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...saodoThptExamThresholdEvidence.evidence],
  };
}
