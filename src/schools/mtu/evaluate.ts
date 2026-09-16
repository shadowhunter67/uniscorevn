import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { MTU_THPT_THRESHOLD } from './eligibility';
import { mtuAdmissionMethods } from './methods';
import { calculateMtuEffectivePriority30, lookupMtuStandardPriority30 } from './priority';
import { mtuThptExamThresholdEvidence } from './evidence';

export function evaluateMtuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'mtu',
    schoolShortName: 'MTU',
    method: mtuAdmissionMethods[0],
    profile,
    context,
    threshold: MTU_THPT_THRESHOLD,
    evidenceSourceId: 'mtu-admission-info-2026',
  });
}

const MTU_EXACT_METHOD = mtuAdmissionMethods[1];
const MTU_THPT_EXAM_THRESHOLD_30 = 15;

export interface MtuThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** MTU 2026 (PT1 — thi TN THPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện ⟺
 * TỔNG THÔ ≥ 15/30 (điều kiện tách biệt công thức ĐXT), đồng nhất 28 ngành. */
export function evaluateMtuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: MtuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'mtu',
    year: MTU_EXACT_METHOD.year,
    methodId: MTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'mtu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển MTU (bắt buộc có môn Toán).' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển MTU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `mtu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp MTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển MTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupMtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateMtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= MTU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điều kiện điểm MTU 2026 (PT1, thi TN THPT): tổng thô 3 môn ≥ ${MTU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điều kiện. Điểm xét tuyển (gồm ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'mtu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: mtuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'mtu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: mtuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'mtu-exact-dxt', label: 'Điểm xét tuyển (ĐXT)', output: dxt30, scale: 30, formula: 'round2(Điểm thi môn 1 + môn 2 + môn 3 + Điểm ưu tiên)', evidence: mtuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'mtu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'mtu',
    year: MTU_EXACT_METHOD.year,
    methodId: MTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...mtuThptExamThresholdEvidence.evidence],
  };
}
