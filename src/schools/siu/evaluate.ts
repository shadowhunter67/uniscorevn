import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { SIU_THPT_THRESHOLD } from './eligibility';
import { siuAdmissionMethods } from './methods';
import { calculateSiuEffectivePriority30, lookupSiuStandardPriority30 } from './priority';
import { siuThptExamThresholdEvidence } from './evidence';

export function evaluateSiuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'siu',
    schoolShortName: 'SIU',
    method: siuAdmissionMethods[0],
    profile,
    context,
    threshold: SIU_THPT_THRESHOLD,
    evidenceSourceId: 'siu-threshold-notice-2026',
  });
}

const SIU_EXACT_METHOD = siuAdmissionMethods[1];
const SIU_THPT_EXAM_THRESHOLD_30 = 15;

export interface SiuThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** SIU 2026 — thi TN THPT, nhóm ngành thường (trừ Luật kinh tế). Đủ điều kiện ⟺ TỔNG THÔ ≥
 * 15/30 (nguồn im lặng về việc đã gồm ưu tiên). Điểm ưu tiên chỉ hiển thị tham khảo. */
export function evaluateSiuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: SiuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'siu',
    year: SIU_EXACT_METHOD.year,
    methodId: SIU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'siu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển SIU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét SIU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `siu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp SIU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét SIU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupSiuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateSiuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= SIU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Ngưỡng SIU 2026 (thi TN THPT, nhóm ngành thường): tổng điểm thô 3 môn ≥ ${SIU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'siu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: siuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'siu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: siuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'siu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: siuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'siu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'siu',
    year: SIU_EXACT_METHOD.year,
    methodId: SIU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...siuThptExamThresholdEvidence.evidence],
  };
}
