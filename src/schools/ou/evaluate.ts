import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { ouAdmissionMethods } from './methods';
import { OU_THPT_THRESHOLD } from './eligibility';
import { OU_PROGRAM_THRESHOLDS_30 } from './thresholds';
import { ouThptExamExactThresholdEvidence } from './evidence';

export function evaluateOuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ou',
    schoolShortName: 'OU',
    method: ouAdmissionMethods[0],
    profile,
    context,
    threshold: OU_THPT_THRESHOLD,
    evidenceSourceId: 'ou-quality-threshold-2026',
  });
}

const OU_EXACT_METHOD = ouAdmissionMethods[1];

export interface OuThptExamExactEvaluationContext {
  programCode: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** OU 2026 — phương thức thi TN THPT, phạm vi 37 mã chương trình chuẩn. Đạt ngưỡng ⟺ tổng thô 3
 * môn (không nhân hệ số, không cộng ưu tiên/điểm cộng) ≥ ngưỡng mã ngành. */
export function evaluateOuThptExamExactAdmission(profile: ApplicantProfile, context: OuThptExamExactEvaluationContext): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'ou',
    year: OU_EXACT_METHOD.year,
    methodId: OU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = OU_PROGRAM_THRESHOLDS_30[context.programCode];
  if (threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ou-program-out-of-scope', label: 'Mã xét tuyển OU không nằm trong phạm vi nhánh exact (chương trình chuẩn, có ngưỡng đã nhập).' });
    return partial('Mã xét tuyển OU chưa được model trong nhánh exact (thuộc Luật/Ngôn ngữ Anh/Tiên tiến/Phân hiệu/CTLK, hoặc chưa nhập).');
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ou-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển OU (không nhân hệ số).' });
    return partial('Cần chọn tổ hợp 3 môn để tính ngưỡng đầu vào OU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `ou-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp OU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính ngưỡng đầu vào OU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const eligible = raw30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào OU 2026 (mã ${context.programCode}): tổng điểm thô 3 môn ≥ ${threshold}/30 (không nhân hệ số, không cộng điểm cộng/ưu tiên).`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'ou-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số, không cộng ưu tiên/điểm cộng)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: ouThptExamExactThresholdEvidence.evidence,
  });

  return {
    schoolId: 'ou',
    year: OU_EXACT_METHOD.year,
    methodId: OU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ouThptExamExactThresholdEvidence.evidence],
  };
}
