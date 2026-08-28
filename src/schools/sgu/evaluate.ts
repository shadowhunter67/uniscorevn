import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { SGU_THPT_THRESHOLD } from './eligibility';
import { sguAdmissionMethods } from './methods';
import { SGU_EXACT_EXCLUDED_PROGRAM_CODES, SGU_PROGRAM_THRESHOLDS_30 } from './thresholds';
import { calculateSguEffectivePriority30, lookupSguStandardPriority30 } from './priority';
import { sguThptExamExactFormulaEvidence } from './evidence';

export function evaluateSguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'sgu',
    schoolShortName: 'SGU',
    method: sguAdmissionMethods[0],
    profile,
    context,
    threshold: SGU_THPT_THRESHOLD,
    evidenceSourceId: 'sgu-quality-threshold-2026',
  });
}

const SGU_EXACT_METHOD = sguAdmissionMethods[1];

export interface SguThptExamExactEvaluationContext {
  programCode: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** SGU 2026 — phương thức thi TN THPT, phạm vi 29 mã ngoài sư phạm/Luật, tổ hợp không hệ số,
 * không điểm cộng. Đạt ngưỡng ⟺ tổng thô + ưu tiên ≥ ngưỡng ngành (mục 2.1.a). ĐXT = tổng thô +
 * ĐƯT (mục 4.5, ĐC=0). */
export function evaluateSguThptExamExactAdmission(profile: ApplicantProfile, context: SguThptExamExactEvaluationContext): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'sgu',
    year: SGU_EXACT_METHOD.year,
    methodId: SGU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = SGU_PROGRAM_THRESHOLDS_30[context.programCode];
  if (threshold === undefined || SGU_EXACT_EXCLUDED_PROGRAM_CODES.has(context.programCode)) {
    missingRequirements.push({ kind: 'school-context', code: 'sgu-program-out-of-scope', label: 'Mã xét tuyển SGU không nằm trong phạm vi nhánh exact (ngoài sư phạm/Luật, có ngưỡng đã nhập).' });
    return partial('Mã xét tuyển SGU chưa được model trong nhánh exact hoặc thuộc nhóm sư phạm/Luật (điều kiện phụ ngoài phạm vi).');
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'sgu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển SGU (không hệ số).' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển SGU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `sgu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp SGU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển SGU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupSguStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateSguEffectivePriority30({ dthgxtPlusDc30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào SGU 2026 (mã ${context.programCode}): tổng thô 3 môn + ưu tiên ≥ ${threshold}/30 (mục 2.1.a).`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({ id: 'sgu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: sguThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'sgu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × MĐƯT (Điều 7 Quy chế tuyển sinh)' : 'MĐƯT (Điều 7 Quy chế tuyển sinh)', evidence: sguThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'sgu-exact-dxt', label: 'Điểm xét tuyển (ĐXT)', output: dxt30, scale: 30, formula: 'ĐXT = ĐTHGXT + ĐƯT (ĐC = 0)', evidence: sguThptExamExactFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'sgu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'sgu',
    year: SGU_EXACT_METHOD.year,
    methodId: SGU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...sguThptExamExactFormulaEvidence.evidence],
  };
}
