import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { MDU_THPT_THRESHOLD } from './eligibility';
import { mduAdmissionMethods } from './methods';
import { MDU_PROGRAM_BY_CODE, MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026 } from './thresholds';
import { calculateMduEffectivePriority30, lookupMduStandardPriority30 } from './priority';
import { mduThptExamExactEvidence } from './evidence';

export function evaluateMduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'mdu',
    schoolShortName: 'MDU/MIT',
    method: mduAdmissionMethods[0],
    profile,
    context,
    threshold: MDU_THPT_THRESHOLD,
    evidenceSourceId: 'mdu-admission-methods-2026',
  });
}

const MDU_EXACT_METHOD = mduAdmissionMethods[1];

export interface MduThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

export function evaluateMduThptExamExactAdmission(
  profile: ApplicantProfile,
  context: MduThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'mdu',
    year: MDU_EXACT_METHOD.year,
    methodId: MDU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = context.programCode ? MDU_PROGRAM_BY_CODE[context.programCode] : undefined;
  if (!program) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'mdu-program-code',
      label: `Chon nganh MDU/MIT (${MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026.length} nganh trong pham vi exact).`,
    });
    return partial('Can chon nganh MDU/MIT de ap nguong diem chuan.');
  }
  if (program.outOfScopeReason) {
    missingRequirements.push({ kind: 'official-rule', code: 'mdu-program-out-of-exact-scope', label: program.outOfScopeReason });
    return partial(`Nganh ${program.name} cua MDU/MIT chua nam trong pham vi exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'mdu-subject-combination', label: 'Chon to hop 3 mon xet tuyen MDU/MIT.' });
    return partial('Can chon to hop 3 mon de tinh diem xet tuyen MDU/MIT.');
  }
  if (!context.subjectContext.combinationId || !program.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'mdu-combination-not-modeled',
      label: `To hop chua duoc ho tro cho nganh ${program.name} (ho tro: ${program.combinationIds.join(', ')}).`,
    });
    return partial('To hop da chon khong nam trong danh sach to hop cua nganh MDU/MIT nay.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const subjectId of context.subjectContext.subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  if (missing.length > 0) {
    missingRequirements.push(
      ...missing.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `mdu-thpt-${subjectId}`,
        label: `Diem thi TN THPT mon ${SUBJECT_LABELS[subjectId]} cho to hop MDU/MIT.`,
      }))
    );
    return partial('Can du diem 3 mon thi TN THPT de tinh diem xet tuyen MDU/MIT.', ['Chua du diem 3 mon thi TN THPT trong to hop da chon.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupMduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateMduEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= program.threshold30;

  const reasons = [
    `Diem chuan MDU/MIT 2026 (thi TN THPT, ${program.name}): tong tho 3 mon >= ${program.threshold30}/30.`,
    `Tong tho 3 mon = ${raw30}/30 -> ${eligible ? 'dat' : 'chua dat'} nguong. Diem xet tham khao (tho + uu tien) = ${dxt30}/30.`,
  ];

  explanation.push({
    id: 'mdu-exact-raw',
    label: 'Tong diem 3 mon thi (tho)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: mduThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'mdu-exact-priority',
    label: priority.reduced ? 'Diem uu tien (da giam, tham khao)' : 'Diem uu tien (tham khao)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 - tong tho)/7,5] x Muc uu tien KV/DT (TT 06/2026)' : 'Muc uu tien KV/DT (TT 06/2026)',
    evidence: mduThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'mdu-exact-dxt',
    label: 'Diem xet tham khao (khong dung de so nguong)',
    output: dxt30,
    scale: 30,
    formula: 'round2(tong tho 3 mon + diem uu tien)',
    evidence: mduThptExamExactEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'mdu-priority-region-category',
      label: 'Khu vuc / doi tuong uu tien (chua nhap - diem xet tham khao dang tinh voi diem uu tien = 0).',
    });
  }

  return {
    schoolId: 'mdu',
    year: MDU_EXACT_METHOD.year,
    methodId: MDU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...mduThptExamExactEvidence.evidence],
  };
}
