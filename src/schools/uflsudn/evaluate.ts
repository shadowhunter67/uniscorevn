import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UFLSUDN_THPT_THRESHOLD } from './eligibility';
import { uflsudnAdmissionMethods } from './methods';
import { calculateUflsudnEffectivePriority30, lookupUflsudnStandardPriority30 } from './priority';
import { uflsudnTeacherTrainingThresholdEvidence } from './evidence';

export function evaluateUflsudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uflsudn',
    schoolShortName: 'UFLS',
    method: uflsudnAdmissionMethods[0],
    profile,
    context,
    threshold: UFLSUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uflsudn-quality-threshold-2026',
  });
}

const UFLSUDN_EXACT_METHOD = uflsudnAdmissionMethods[1];
const UFLSUDN_TEACHER_TRAINING_THRESHOLD_30 = 20;

/**
 * UFLS 2026 — nhánh exact, CHỈ 4 ngành đào tạo giáo viên ngoại ngữ (Sư phạm tiếng Anh/Pháp/Trung
 * Quốc/Hàn Quốc). Ngưỡng = tổng điểm 3 môn thi TN THPT (thô, KHÔNG cần học bạ) + điểm ưu tiên khu
 * vực/đối tượng ≥ 20,00/30 (ảnh "Ngưỡng đầu vào...", đọc qua vision). Mức điểm ưu tiên KV/ĐT cụ
 * thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateUflsudnTeacherTrainingExactAdmission(
  profile: ApplicantProfile,
  context: ThresholdOnlyEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'uflsudn',
    year: UFLSUDN_EXACT_METHOD.year,
    methodId: UFLSUDN_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'uflsudn-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển UFLS (Sư phạm ngoại ngữ).' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển UFLS.');
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
        code: `uflsudn-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp UFLS.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupUflsudnStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUflsudnEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= UFLSUDN_TEACHER_TRAINING_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đầu vào UFLS 2026 (4 ngành Sư phạm ngoại ngữ): tổng điểm thi TN THPT (đã gồm điểm ưu tiên) ≥ ${UFLSUDN_TEACHER_TRAINING_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'uflsudn-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: uflsudnTeacherTrainingThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'uflsudn-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: uflsudnTeacherTrainingThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'uflsudn-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: uflsudnTeacherTrainingThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uflsudn-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'uflsudn',
    year: UFLSUDN_EXACT_METHOD.year,
    methodId: UFLSUDN_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: uflsudnTeacherTrainingThresholdEvidence.evidence,
  };
}
