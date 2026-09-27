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
  return entry.requirement === 'math' ? 'to hop phai co mon Toan' : 'to hop phai co mon Toan hoac Ngu van';
}

export function evaluateStuThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: StuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'stu-field', label: 'Chon nganh STU de tra diem chuan PT02.' });
    return stuPartial({ missingRequirements, reason: 'Can chon nganh STU de ap diem chuan PT02.' });
  }

  const entry = STU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'stu-field',
      label: `Nganh "${context.fieldCode}" khong co trong bang diem chuan STU 2026 da mo hinh hoa.`,
    });
    return stuPartial({ missingRequirements, reason: `Nganh "${context.fieldCode}" khong co trong bang diem chuan STU 2026 da mo hinh hoa.` });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'stu-subject-combination', label: `Chon to hop 3 mon xet tuyen cho ${entry.name}.` });
    return stuPartial({ missingRequirements, reason: `Can chon to hop 3 mon xet tuyen cho ${entry.name}.` });
  }

  if (!subjectsMeetStuRequirement(context.subjectContext.subjects, entry.requirement)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'stu-subject-combination',
      label: `${entry.name}: ${subjectRequirementLabel(entry)} theo dieu kien STU cong bo.`,
    });
    return stuPartial({ missingRequirements, reason: `To hop da chon khong dat dieu kien mon cua ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `stu-thpt-${subjectId}`,
        label: `Diem thi TN THPT mon ${SUBJECT_LABELS[subjectId]} cho to hop da chon.`,
      }))
    );
    return stuPartial({ missingRequirements, reason: 'Can du diem 3 mon thi TN THPT de tinh diem xet STU.' });
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
      label: `${entry.name}: diem Toan/Van lien quan phai >= 1/3 diem chuan chua uu tien (${subjectFloor}/10).`,
    });
  }

  const eligible = finalScore >= threshold30 && passesSubjectFloor;
  const reasons = [
    `Diem chuan PT02 ${entry.name}: tong 3 mon + diem uu tien KV/DT >= ${threshold30}/30; tong cua ban = ${finalScore}/30.`,
    passesSubjectFloor
      ? `Dat dieu kien diem Toan/Van lien quan >= 1/3 diem chuan chua uu tien (${subjectFloor}/10).`
      : `Chua dat dieu kien diem Toan/Van lien quan >= 1/3 diem chuan chua uu tien (${subjectFloor}/10).`,
    eligible ? 'Dat/vuot diem chuan STU PT02 nam 2026.' : 'Chua dat dieu kien hoac diem chuan STU PT02 nam 2026.',
  ];

  explanation.push({
    id: 'stu-exact-raw',
    label: 'Tong diem 3 mon thi',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-priority',
    label: priority.reduced ? 'Diem uu tien da giam' : 'Diem uu tien',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 - tong tho)/7,5] x muc diem uu tien KV/DT'
      : 'Muc diem uu tien KV/DT theo khung quoc gia hien hanh',
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-final',
    label: 'Diem xet',
    output: finalScore,
    scale: 30,
    formula: 'Tong 3 mon + diem uu tien',
    evidence: stuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'stu-exact-threshold',
    label: `Diem chuan - ${entry.name}`,
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
    formula: '1/3 diem chuan chua uu tien',
    evidence: stuSubjectRequirementEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'stu-priority-region-category',
      label: 'Khu vuc / doi tuong uu tien (chua nhap - diem xet dang tinh voi diem uu tien = 0).',
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
