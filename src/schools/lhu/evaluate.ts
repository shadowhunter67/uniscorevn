import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { LHU_THPT_THRESHOLD, checkLhuExactThreshold } from './eligibility';
import { lhuAdmissionMethods } from './methods';
import { lhuThptExactFormulaEvidence } from './evidence';
import { lookupLhuStandardPriority30, calculateLhuEffectivePriority30 } from './priority';

export function evaluateLhuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'lhu',
    schoolShortName: 'LHU',
    method: lhuAdmissionMethods[0],
    profile,
    context,
    threshold: LHU_THPT_THRESHOLD,
    evidenceSourceId: 'lhu-threshold-2026',
  });
}

export interface LhuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface LhuThptExamEvaluationContext {
  subjectContext?: LhuSubjectContext;
}

const LHU_EXACT_METHOD = lhuAdmissionMethods[1];

/**
 * LHU 2026 — nhánh exact, phương thức xét điểm thi TN THPT, áp dụng cho mọi ngành TRỪ Dược, Luật
 * và Luật kinh tế — ngưỡng riêng theo Bộ GD&ĐT, chưa mô hình hoá. Nguồn chính thức lhu.edu.vn công
 * bố ngưỡng 15/30 nhưng im lặng về điểm ưu tiên khu vực/đối tượng => điểm xét tuyển = tổng thô 3
 * môn + điểm ưu tiên (judgment call chuẩn quốc gia, `priority.ts`); ngưỡng 15/30 so với TỔNG THÔ
 * (đúng văn bản, không cộng ưu tiên) — điểm xét tuyển (gồm ưu tiên) chỉ dùng hiển thị.
 */
export function evaluateLhuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: LhuThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'lhu',
    year: LHU_EXACT_METHOD.year,
    methodId: LHU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'lhu-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển LHU.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển LHU.');
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
        code: `lhu-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp LHU.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = checkLhuExactThreshold(raw30);

  const standardPriority30 = lookupLhuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateLhuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(raw30 + priority.effectivePriority30);

  explanation.push({
    id: 'lhu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: lhuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'lhu-exact-threshold',
    label: 'Điều kiện xét tuyển chung',
    output: raw30,
    scale: 30,
    formula: threshold.requiredText,
    evidence: lhuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'lhu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT'
      : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call)',
    evidence: lhuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'lhu-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn (thô) + Điểm ưu tiên',
    evidence: lhuThptExactFormulaEvidence.evidence,
  });

  const reasons = [
    `Điều kiện xét tuyển chung LHU 2026 (ngành ngoài Dược/Luật/Luật kinh tế): ${threshold.requiredText}`,
    `Tổng điểm thô 3 môn = ${raw30}/30 -> ${threshold.pass ? 'đạt' : 'chưa đạt'} điều kiện. Điểm xét tuyển (gồm điểm ưu tiên) = ${finalScore}/30.`,
  ];

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'lhu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'lhu',
    year: LHU_EXACT_METHOD.year,
    methodId: LHU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: lhuThptExactFormulaEvidence.evidence,
  };
}
