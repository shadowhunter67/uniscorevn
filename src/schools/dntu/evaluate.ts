import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DNTU_THPT_THRESHOLD } from './eligibility';
import { dntuAdmissionMethods } from './methods';
import { DNTU_THPT_EXAM_THRESHOLD_30, DNTU_THRESHOLD_GROUP_LABELS, type DntuThresholdGroup } from './thresholds';
import { calculateDntuEffectivePriority30, lookupDntuStandardPriority30 } from './priority';
import { dntuThptExamThresholdEvidence } from './evidence';

export function evaluateDntuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dntu',
    schoolShortName: 'DNTU',
    method: dntuAdmissionMethods[0],
    profile,
    context,
    threshold: DNTU_THPT_THRESHOLD,
    evidenceSourceId: 'dntu-cutoff-notice-2026',
  });
}

const DNTU_EXACT_METHOD = dntuAdmissionMethods[1];

export interface DntuThptExamExactEvaluationContext {
  /** Nhóm ngưỡng: 'nursingMedtech' (Điều dưỡng/Xét nghiệm y học, 18/30) | 'standard' (còn lại, 15/30). */
  group?: DntuThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** DNTU 2026 — thi TN THPT: so TỔNG THÔ 3 môn với điểm chuẩn nhóm ngành (nguồn im lặng về việc
 * gồm ưu tiên hay chưa). Điểm ưu tiên chỉ hiển thị tham khảo trong `score`. */
export function evaluateDntuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DntuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dntu',
    year: DNTU_EXACT_METHOD.year,
    methodId: DNTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'dntu-program-group', label: 'Chọn nhóm ngành DNTU (Điều dưỡng/Xét nghiệm y học / ngành khác).' });
    return partial('Cần chọn nhóm ngành DNTU để áp ngưỡng.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dntu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DNTU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét DNTU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `dntu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp DNTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét DNTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDntuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDntuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = DNTU_THPT_EXAM_THRESHOLD_30[context.group];
  const eligible = raw30 >= threshold;

  const reasons = [
    `Điểm chuẩn DNTU 2026 (thi TN THPT, ${DNTU_THRESHOLD_GROUP_LABELS[context.group]}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'dntu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dntuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'dntu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dntuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'dntu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: dntuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dntu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'dntu',
    year: DNTU_EXACT_METHOD.year,
    methodId: DNTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dntuThptExamThresholdEvidence.evidence],
  };
}
