import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DTU_THPT_THRESHOLD } from './eligibility';
import { dtuAdmissionMethods } from './methods';
import { calculateDtuEffectivePriority30, lookupDtuStandardPriority30 } from './priority';
import { dtuThptExamFormulaEvidence } from './evidence';

export function evaluateDtuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dtu',
    schoolShortName: 'DTU',
    method: dtuAdmissionMethods[0],
    profile,
    context,
    threshold: DTU_THPT_THRESHOLD,
    evidenceSourceId: 'dtu-admission-info-2026',
  });
}

const DTU_EXACT_METHOD = dtuAdmissionMethods[1];
const DTU_THPT_EXAM_THRESHOLD_30 = 15;

export interface DtuThptExamExactEvaluationContext {
  /** Thí sinh tự xác nhận ngành đã chọn thuộc "ngành chung" (ngoài pháp luật/sức khỏe/Kiến trúc/Thanh nhạc). */
  isGeneralProgram?: boolean;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** DTU 2026 — ngành chung, thí sinh không điểm cộng: ĐXT = round2(tổng thô 3 môn + điểm ưu
 * tiên). ĐXT ≥ 15/30 ⇒ đủ điều kiện xét tuyển. */
export function evaluateDtuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DtuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dtu',
    year: DTU_EXACT_METHOD.year,
    methodId: DTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.isGeneralProgram !== true) {
    missingRequirements.push({ kind: 'school-context', code: 'dtu-general-program-confirm', label: 'Xác nhận ngành đã chọn thuộc "ngành chung" DTU (ngoài pháp luật/sức khỏe/Kiến trúc/Thanh nhạc) để áp nhánh exact.' });
    return partial('Nhánh exact chỉ áp dụng "ngành chung" DTU — cần xác nhận ngành đã chọn không thuộc pháp luật/sức khỏe/Kiến trúc/Thanh nhạc.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dtu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DTU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển DTU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `dtu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp DTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const pass = dxt30 >= DTU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đầu vào DTU 2026 (ngành chung): Điểm xét tuyển ≥ ${DTU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Điểm xét tuyển (không điểm cộng) = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}.`,
  ];

  explanation.push({ id: 'dtu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dtuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dtu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dtuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dtu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: dtuThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dtu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'dtu',
    year: DTU_EXACT_METHOD.year,
    methodId: DTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dtuThptExamFormulaEvidence.evidence],
  };
}
