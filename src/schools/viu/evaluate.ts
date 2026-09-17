import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VIU_THPT_THRESHOLD } from './eligibility';
import { viuAdmissionMethods } from './methods';
import { calculateViuEffectivePriority30, lookupViuStandardPriority30 } from './priority';
import { viuThptExamThresholdEvidence } from './evidence';

export function evaluateViuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'viu',
    schoolShortName: 'VIU',
    method: viuAdmissionMethods[0],
    profile,
    context,
    threshold: VIU_THPT_THRESHOLD,
    evidenceSourceId: 'viu-threshold-notice-2026',
  });
}

const VIU_EXACT_METHOD = viuAdmissionMethods[1];
const VIU_THPT_EXAM_THRESHOLD_30 = 15;

export interface ViuThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** VIU 2026 (Mã 100 — thi TN THPT): đủ điều kiện ⟺ TỔNG THÔ ≥ 15/30, đồng nhất 21 ngành. Điểm ưu
 * tiên chỉ hiển thị tham khảo. */
export function evaluateViuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ViuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'viu',
    year: VIU_EXACT_METHOD.year,
    methodId: VIU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'viu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VIU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển VIU.');
  }
  const subjects = context.subjectContext.subjects;

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `viu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VIU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển VIU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupViuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateViuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= VIU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm sàn VIU 2026 (Mã 100, đồng nhất 21 ngành): tổng thô 3 môn ≥ ${VIU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} sàn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'viu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: viuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'viu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: viuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'viu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so sàn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: viuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'viu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'viu',
    year: VIU_EXACT_METHOD.year,
    methodId: VIU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...viuThptExamThresholdEvidence.evidence],
  };
}
