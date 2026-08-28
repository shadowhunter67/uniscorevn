import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FPTU_THPT_THRESHOLD } from './eligibility';
import { fptuAdmissionMethods } from './methods';
import { fptuThptExamExactThresholdEvidence } from './evidence';

export function evaluateFptuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fptu',
    schoolShortName: 'FPTU',
    method: fptuAdmissionMethods[0],
    profile,
    context,
    threshold: FPTU_THPT_THRESHOLD,
    evidenceSourceId: 'fptu-quality-threshold-2026',
  });
}

const FPTU_EXACT_METHOD = fptuAdmissionMethods[1];
const FPTU_EXACT_THRESHOLD_30 = 15;

export interface FptuThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** FPTU 2026 — điểm sàn (điều kiện tổ hợp thô), phương thức thi TN THPT, mọi ngành/mọi cơ sở.
 * Nguồn tự phân biệt đây KHÔNG phải điểm xét tuyển cuối cùng (ĐXT) — chỉ so tổng thô 3 môn với
 * ngưỡng 15/30, không cộng điểm ưu tiên/điểm cộng và không quy đổi sang ĐXT (công thức ĐXT thật
 * vẫn mơ hồ, xem `fptu-final-admission-score-formula-ambiguous`). */
export function evaluateFptuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: FptuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'fptu',
    year: FPTU_EXACT_METHOD.year,
    methodId: FPTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'fptu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển FPTU (Axx/Cxx).' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm sàn FPTU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `fptu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp FPTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm sàn FPTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const eligible = raw30 >= FPTU_EXACT_THRESHOLD_30;

  const reasons = [
    `Điểm sàn FPTU 2026 (điều kiện tổ hợp thô, mọi ngành/cơ sở): tổng điểm thô 3 môn thi TN THPT (tổ hợp Axx/Cxx) ≥ ${FPTU_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Đây KHÔNG phải điểm xét tuyển cuối cùng (ĐXT) dùng để xét trúng tuyển.`,
  ];

  explanation.push({
    id: 'fptu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, điều kiện tổ hợp)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: fptuThptExamExactThresholdEvidence.evidence,
  });

  return {
    schoolId: 'fptu',
    year: FPTU_EXACT_METHOD.year,
    methodId: FPTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...fptuThptExamExactThresholdEvidence.evidence],
  };
}
