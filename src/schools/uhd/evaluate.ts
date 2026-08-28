import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UHD_THPT_THRESHOLD } from './eligibility';
import { uhdAdmissionMethods } from './methods';
import { calculateUhdEffectivePriority30, lookupUhdStandardPriority30 } from './priority';
import { uhdThptExactFormulaEvidence, uhdNoBonusPointsEvidence } from './evidence';

export function evaluateUhdAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uhd',
    schoolShortName: 'UHD',
    method: uhdAdmissionMethods[0],
    profile,
    context,
    threshold: UHD_THPT_THRESHOLD,
    evidenceSourceId: 'uhd-threshold-2026-crosscheck-1',
  });
}

const UHD_EXACT_METHOD = uhdAdmissionMethods[1];
const UHD_EXACT_THRESHOLD_30 = 15;

/**
 * UHD 2026 — nhánh exact, phương thức xét kết quả thi TN THPT (nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV,
 * KHÔNG gồm Sư phạm/Giáo dục thể chất - ngưỡng riêng, ngoài phạm vi). Quyết định 289/QĐ-ĐHHD trang
 * 4 xác nhận Điểm xét tuyển = Môn1+Môn2+Môn3+Điểm UT (điểm ưu tiên CỘNG vào tổng trước khi so
 * ngưỡng); mục 5.2 xác nhận KHÔNG áp dụng điểm cộng năm 2026. Mức điểm ưu tiên KV/ĐT cụ thể là mức
 * chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateUhdThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ThresholdOnlyEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'uhd',
    year: UHD_EXACT_METHOD.year,
    methodId: UHD_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'uhd-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển UHD.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển UHD.');
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
        code: `uhd-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp UHD.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupUhdStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUhdEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= UHD_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào UHD 2026 (nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV): tổng điểm (đã gồm điểm ưu tiên, không có điểm cộng) ≥ ${UHD_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'uhd-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: uhdThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uhd-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: uhdThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uhd-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên, không có điểm cộng)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: [...uhdThptExactFormulaEvidence.evidence, ...uhdNoBonusPointsEvidence.evidence],
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uhd-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'uhd',
    year: UHD_EXACT_METHOD.year,
    methodId: UHD_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...uhdThptExactFormulaEvidence.evidence, ...uhdNoBonusPointsEvidence.evidence],
  };
}
