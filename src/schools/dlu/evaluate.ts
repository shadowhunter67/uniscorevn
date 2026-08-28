import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DLU_THPT_THRESHOLD } from './eligibility';
import { dluAdmissionMethods } from './methods';
import { DLU_THRESHOLD_BY_CODE, type DluProgramThreshold } from './thresholds';
import { calculateDluEffectivePriority30, lookupDluStandardPriority30 } from './priority';
import { dluThptExamFormulaEvidence } from './evidence';

export function evaluateDluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dlu',
    schoolShortName: 'DLU',
    method: dluAdmissionMethods[0],
    profile,
    context,
    threshold: DLU_THPT_THRESHOLD,
    evidenceSourceId: 'dlu-threshold-notice-2026',
  });
}

const DLU_EXACT_METHOD = dluAdmissionMethods[1];

export interface DluThptExamExactEvaluationContext {
  /** Mã ngành DLU (vd '7480201' Công nghệ thông tin). */
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

function checkDluSpecialCondition(entry: DluProgramThreshold, profile: ApplicantProfile): { pass: boolean | undefined; label: string } | undefined {
  if (entry.specialCondition === 'english-min-6') {
    const english = profile.thpt?.scores?.english;
    return { pass: english === undefined ? undefined : english >= 6, label: 'Điểm thi TN THPT môn Tiếng Anh ≥ 6,0.' };
  }
  if (entry.specialCondition === 'nuclear-math-physics-min-6.5') {
    const math = profile.thpt?.scores?.math;
    const physics = profile.thpt?.scores?.physics;
    if (math === undefined || physics === undefined) return { pass: undefined, label: 'Điểm thi TN THPT môn Toán và Vật lý mỗi môn ≥ 6,5.' };
    return { pass: math >= 6.5 && physics >= 6.5, label: 'Điểm thi TN THPT môn Toán và Vật lý mỗi môn ≥ 6,5.' };
  }
  return undefined;
}

/** DLU 2026 — phương thức thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện
 * xét tuyển ⟺ ĐXT ≥ điểm sàn theo mã ngành VÀ (nếu có) điều kiện phụ theo môn. */
export function evaluateDluThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DluThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dlu',
    year: DLU_EXACT_METHOD.year,
    methodId: DLU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'dlu-program-code', label: 'Chọn mã ngành DLU để áp điểm sàn.' });
    return partial('Cần chọn mã ngành DLU để tính Điểm xét tuyển.');
  }
  const entry = DLU_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'dlu-program-code', label: `Mã ngành "${context.programCode}" không có trong bảng điểm sàn DLU 2026.` });
    return partial(`Mã ngành "${context.programCode}" không có trong bảng điểm sàn DLU 2026.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dlu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DLU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển DLU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `dlu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp DLU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DLU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDluStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDluEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const thresholdPass = dxt30 >= entry.threshold30;

  const special = checkDluSpecialCondition(entry, profile);
  if (special?.pass === undefined && special !== undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dlu-special-condition', label: special.label });
  }

  const reasons = [
    `Điểm sàn ĐKXT ngành ${entry.name} (${entry.code}): Điểm xét tuyển ≥ ${entry.threshold30}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${thresholdPass ? 'đạt ngưỡng' : 'chưa đạt ngưỡng'}.`,
  ];
  if (special) reasons.push(special.label + (special.pass === true ? ' — đạt.' : special.pass === false ? ' — chưa đạt.' : ' — chưa xác định.'));

  explanation.push({ id: 'dlu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dlu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dlu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: dluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dlu-exact-threshold', label: `Điểm sàn — ${entry.name}`, output: entry.threshold30, scale: 30, formula: reasons[0], evidence: dluThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dlu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  const eligible = thresholdPass && (special ? special.pass === true : true);
  const status: 'eligible' | 'ineligible' | 'unknown' = special?.pass === undefined && special !== undefined ? 'unknown' : eligible ? 'eligible' : 'ineligible';

  return {
    schoolId: 'dlu',
    year: DLU_EXACT_METHOD.year,
    methodId: DLU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dluThptExamFormulaEvidence.evidence],
  };
}
