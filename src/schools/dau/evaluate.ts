import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DAU_THPT_THRESHOLD } from './eligibility';
import { dauAdmissionMethods } from './methods';
import { calculateDauEffectivePriority30, lookupDauStandardPriority30 } from './priority';
import { dauThptExamThresholdEvidence } from './evidence';

export function evaluateDauAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dau',
    schoolShortName: 'DAU',
    method: dauAdmissionMethods[0],
    profile,
    context,
    threshold: DAU_THPT_THRESHOLD,
    evidenceSourceId: 'dau-threshold-notice-2026',
  });
}

const DAU_EXACT_METHOD = dauAdmissionMethods[1];
const DAU_THPT_EXAM_THRESHOLD_30 = 15;

export interface DauThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** DAU 2026 (thi TN THPT thuần): ĐXT tham khảo = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều
 * kiện ⟺ TỔNG THÔ ≥ 15/30 (nguồn ghi rõ "không bao gồm điểm ưu tiên"). */
export function evaluateDauThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DauThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dau',
    year: DAU_EXACT_METHOD.year,
    methodId: DAU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dau-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DAU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển DAU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `dau-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp DAU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DAU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDauStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDauEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= DAU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm sàn DAU 2026 (thi TN THPT thuần, không gồm ưu tiên): tổng thô 3 môn ≥ ${DAU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} sàn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30. Điểm chuẩn trúng tuyển thật theo ngành (16,5-18/30) cao hơn sàn này.`,
  ];

  explanation.push({ id: 'dau-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dauThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'dau-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dauThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'dau-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so sàn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: dauThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dau-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'dau',
    year: DAU_EXACT_METHOD.year,
    methodId: DAU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dauThptExamThresholdEvidence.evidence],
  };
}
