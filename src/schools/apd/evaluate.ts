import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { APD_THPT_THRESHOLD } from './eligibility';
import { apdAdmissionMethods } from './methods';
import { APD_CAMPUS_LABELS, APD_CAMPUS_THRESHOLD_30, type ApdCampusId } from './thresholds';
import { calculateApdEffectivePriority30, lookupApdStandardPriority30 } from './priority';
import { apdThptExactFormulaEvidence } from './evidence';

export function evaluateApdThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'apd',
    schoolShortName: 'APD',
    method: apdAdmissionMethods[0],
    profile,
    context,
    threshold: APD_THPT_THRESHOLD,
    evidenceSourceId: 'apd-admission-2026',
  });
}

const APD_EXACT_METHOD = apdAdmissionMethods[1];

export interface ApdThptExamExactEvaluationContext extends ThresholdOnlyEvaluationContext {
  campusId?: ApdCampusId;
}

/**
 * APD 2026 — nhánh exact, phương thức xét kết quả thi TN THPT, theo cơ sở đào tạo. Thông báo
 * 180/TB-HVCSPT xác nhận ngưỡng đã bao gồm điểm cộng + điểm ưu tiên (điểm ưu tiên CỘNG vào tổng
 * trước khi so ngưỡng). Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem
 * `priority.ts`). Trường không công bố điểm cộng cụ thể 2026 — model = 0.
 */
export function evaluateApdThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ApdThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'apd',
    year: APD_EXACT_METHOD.year,
    methodId: APD_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.campusId) {
    missingRequirements.push({ kind: 'school-context', code: 'apd-exact-campus', label: 'Chọn cơ sở đào tạo APD (Hà Nội / Bắc Ninh / Đà Nẵng).' });
    return partial('Cần chọn cơ sở đào tạo APD để tính ngưỡng đầu vào.');
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'apd-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển APD.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển APD.');
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
        code: `apd-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp APD.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupApdStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateApdEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const threshold = APD_CAMPUS_THRESHOLD_30[context.campusId];
  const eligible = total30 >= threshold;
  const campusLabel = APD_CAMPUS_LABELS[context.campusId];

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào APD 2026 - ${campusLabel}: tổng điểm (đã gồm điểm ưu tiên, điểm cộng nếu có) ≥ ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'apd-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: apdThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'apd-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: apdThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'apd-exact-total',
    label: `Tổng điểm dùng để so ngưỡng (${campusLabel})`,
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực + điểm cộng [chưa có số liệu, model = 0])',
    evidence: apdThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'apd-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'apd',
    year: APD_EXACT_METHOD.year,
    methodId: APD_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: apdThptExactFormulaEvidence.evidence,
  };
}
