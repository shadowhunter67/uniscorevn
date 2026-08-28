import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UDA_THPT_THRESHOLD } from './eligibility';
import { udaAdmissionMethods } from './methods';
import { udaThptExamExactThresholdEvidence } from './evidence';

export function evaluateUdaAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uda',
    schoolShortName: 'UDA',
    method: udaAdmissionMethods[0],
    profile,
    context,
    threshold: UDA_THPT_THRESHOLD,
    evidenceSourceId: 'uda-threshold-2026',
  });
}

const UDA_EXACT_METHOD = udaAdmissionMethods[1];
const UDA_EXACT_THRESHOLD_30 = 15;

export interface UdaThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** UDA 2026 — phương thức thi TN THPT, nhóm ngành thường. Điểm sàn = tổng thô 3 môn, KHÔNG cộng
 * ưu tiên/điểm cộng (trích nguyên văn). Đủ điều kiện ⟺ tổng thô ≥ 15/30. */
export function evaluateUdaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: UdaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'uda',
    year: UDA_EXACT_METHOD.year,
    methodId: UDA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'uda-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển UDA.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm sàn UDA.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `uda-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp UDA.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm sàn UDA.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const eligible = raw30 >= UDA_EXACT_THRESHOLD_30;

  const reasons = [
    `Điểm sàn UDA 2026 (nhóm ngành thường): tổng điểm thô 3 môn ≥ ${UDA_EXACT_THRESHOLD_30}/30 (không cộng điểm ưu tiên/điểm cộng).`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'uda-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không cộng ưu tiên/điểm cộng)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: udaThptExamExactThresholdEvidence.evidence,
  });

  return {
    schoolId: 'uda',
    year: UDA_EXACT_METHOD.year,
    methodId: UDA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...udaThptExamExactThresholdEvidence.evidence],
  };
}
