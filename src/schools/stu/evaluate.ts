import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { stuAdmissionMethods } from './methods';
import { STU_FIELD_THRESHOLD_BY_CODE, subjectsMeetStuRequirement, type StuFieldThreshold } from './thresholds';
import { lookupStuStandardPriority30, calculateStuEffectivePriority30 } from './priority';
import { stuExactFormulaEvidence, stuFieldThresholdEvidence, stuSubjectRequirementEvidence } from './evidence';

export interface StuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function readSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

const STU_METHOD = stuAdmissionMethods[0];

function stuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'stu',
    year: STU_METHOD.year,
    methodId: STU_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

function subjectRequirementLabel(entry: StuFieldThreshold): string {
  return entry.requirement === 'math' ? 'tổ hợp phải có môn Toán' : 'tổ hợp phải có môn Toán hoặc Ngữ văn';
}

export function evaluateStuThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: StuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'stu-field', label: 'Chọn ngành STU để tra điểm chuẩn PT02.' });
    return stuPartial({ missingRequirements, reason: 'Cần chọn ngành STU để áp điểm chuẩn PT02.' });
  }

  const entry = STU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'stu-field',
      label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn STU 2026 đã mô hình hóa.`,
    });
    return stuPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn STU 2026 đã mô hình hóa.` });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'stu-subject-combination', label: `Chọn tổ hợp 3 môn xét tuyển cho ${entry.name}.` });
    return stuPartial({ missingRequirements, reason: `Cần chọn tổ hợp 3 môn xét tuyển cho ${entry.name}.` });
  }

  if (!subjectsMeetStuRequirement(context.subjectContext.subjects, entry.requirement)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'stu-subject-combination',
      label: `${entry.name}: ${subjectRequirementLabel(entry)} theo điều kiện STU công bố.`,
    });
    return stuPartial({ missingRequirements, reason: `Tổ hợp đã chọn không đạt điều kiện môn của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `stu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return stuPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính điểm xét STU.' });
  }

  const raw30 = total30 as number;
  const standardPriority30 = lookupStuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateStuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const subjectFloor = round2(threshold30 / 3);
  const relevantSubjectScores = entry.requirement === 'math'
    ? [profile.thpt?.scores?.math]
    : [profile.thpt?.scores?.math, profile.thpt?.scores?.literature].filter((score) => score !== undefined);
  const passesSubjectFloor = relevantSubjectScores.some((score) => score !== undefined && score >= subjectFloor);
  if (!passesSubjectFloor) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'stu-subject-floor',
      label: `${entry.name}: điểm Toán/Văn liên quan phải >= 1/3 điểm chuẩn chưa ưu tiên (${subjectFloor}/10).`,
    });
  }

  const eligible = finalScore >= threshold30 && passesSubjectFloor;
  const reasons = [
    `Điểm chuẩn PT02 ${entry.name}: tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30; tổng của bạn = ${finalScore}/30.`,
    passesSubjectFloor
      ? `Đạt điều kiện điểm Toán/Văn liên quan >= 1/3 điểm chuẩn chưa ưu tiên (${subjectFloor}/10).`
      : `Chưa đạt điều kiện điểm Toán/Văn liên quan >= 1/3 điểm chuẩn chưa ưu tiên (${subjectFloor}/10).`,
    eligible ? 'Đạt/vượt điểm chuẩn STU PT02 năm 2026.' : 'Chưa đạt điều kiện hoặc điểm chuẩn STU PT02 năm 2026.',
  ];

  explanation.push({
    id: 'stu-exact-raw',
    label: 'Tổng điểm 3 môn thi',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giam' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 - tổng thô)/7,5] × mức điểm ưu tiên KV/ĐT'
      : 'Mức điểm ưu tiên KV/ĐT theo khung quốc gia hiện hành',
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-final',
    label: 'Điểm xét',
    output: finalScore,
    scale: 30,
    formula: 'Tổng 3 môn + điểm ưu tiên',
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-threshold',
    label: `Điểm chuẩn - ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: stuFieldThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'stu-subject-floor',
    label: 'Nguong Toan/Van',
    output: subjectFloor,
    scale: 10,
    formula: '1/3 điểm chuẩn chưa ưu tiên',
    evidence: stuSubjectRequirementEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'stu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập - điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'stu',
    year: STU_METHOD.year,
    methodId: STU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...stuExactFormulaEvidence.evidence, ...stuFieldThresholdEvidence.evidence, ...stuSubjectRequirementEvidence.evidence],
  };
}
