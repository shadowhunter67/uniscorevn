import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FPFU_THPT_THRESHOLD } from './eligibility';
import { fpfuAdmissionMethods } from './methods';
import { calculateFpfuEffectivePriority30, lookupFpfuStandardPriority30 } from './priority';
import { fpfuThptExactFormulaEvidence } from './evidence';

export function evaluateFpfuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fpfu',
    schoolShortName: 'FPFU',
    method: fpfuAdmissionMethods[0],
    profile,
    context,
    threshold: FPFU_THPT_THRESHOLD,
    evidenceSourceId: 'fpfu-quality-threshold-2026',
  });
}

const FPFU_EXACT_METHOD = fpfuAdmissionMethods[1];
const FPFU_EXACT_THRESHOLD_30 = 15;

/**
 * FPFU 2026 (hệ dân sự) — nhánh exact, 4 tổ hợp A00/A01/D07/D01. Trang tuyển sinh chính thức
 * (?p=210262, xác nhận qua 2 lượt tra cứu độc lập) công bố công thức Điểm xét tuyển =
 * Môn1+Môn2+Môn3+điểm ưu tiên (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng) và ngưỡng 15,00/30.
 * Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateFpfuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ThresholdOnlyEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'fpfu',
    year: FPFU_EXACT_METHOD.year,
    methodId: FPFU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'fpfu-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển FPFU (A00/A01/D07/D01).' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển FPFU.');
  }

  const subjects = context.subjectContext.subjects;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `fpfu-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp FPFU.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupFpfuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateFpfuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= FPFU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào FPFU 2026 (hệ dân sự): tổng điểm (đã gồm điểm ưu tiên) ≥ ${FPFU_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'fpfu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: fpfuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'fpfu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: fpfuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'fpfu-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: fpfuThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'fpfu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'fpfu',
    year: FPFU_EXACT_METHOD.year,
    methodId: FPFU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: fpfuThptExactFormulaEvidence.evidence,
  };
}
