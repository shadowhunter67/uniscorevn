import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { THUV_THPT_THRESHOLD } from './eligibility';
import { thuvAdmissionMethods } from './methods';
import { calculateThuvEffectivePriority30, lookupThuvStandardPriority30 } from './priority';
import { thuvThptExamFormulaEvidence } from './evidence';

export function evaluateThuvAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'thuv',
    schoolShortName: 'THUV',
    method: thuvAdmissionMethods[0],
    profile,
    context,
    threshold: THUV_THPT_THRESHOLD,
    evidenceSourceId: 'thuv-cutoff-notice-2026',
  });
}

const THUV_EXACT_METHOD = thuvAdmissionMethods[1];
const THUV_THPT_EXAM_CUTOFF_30 = 18;

/** 6 tổ hợp chung cho cả 4 ngành THUV, nằm trong taxonomy môn học hiện có. Xem
 * `knowledgeGaps.ts:thuv-combination-scope-not-full` cho các tổ hợp riêng từng ngành chưa model. */
const THUV_MODELED_COMBINATION_IDS = new Set(['A00', 'A01', 'A02', 'B00', 'B08', 'D07']);

export interface ThuvThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** THUV 2026 (PT2 — thi TN THPT, không chứng chỉ JLPT): ĐXT = round2(tổng thô 3 môn + điểm ưu
 * tiên). ĐXT ≥ 18/30 (điểm chuẩn trúng tuyển đã công bố, đồng nhất 4 ngành) ⇒ đủ điều kiện trúng
 * tuyển. */
export function evaluateThuvThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ThuvThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'thuv',
    year: THUV_EXACT_METHOD.year,
    methodId: THUV_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'thuv-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển THUV.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển THUV.');
  }

  const combinationId = context.subjectContext.combinationId;
  if (!combinationId || !THUV_MODELED_COMBINATION_IDS.has(combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'thuv-combination-out-of-scope',
      label: 'Tổ hợp đã chọn chưa được UniscoreVN model cho THUV (chỉ hỗ trợ A00/A01/A02/B00/B08/D07).',
    });
    return partial('Tổ hợp đã chọn nằm ngoài phạm vi UniscoreVN đã model cho THUV.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `thuv-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp THUV.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển THUV.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupThuvStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateThuvEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const pass = dxt30 >= THUV_THPT_EXAM_CUTOFF_30;

  const reasons = [
    `Điểm chuẩn trúng tuyển THUV 2026 (PT2 — thi TN THPT, đồng nhất 4 ngành): Điểm xét tuyển ≥ ${THUV_THPT_EXAM_CUTOFF_30}/30.`,
    `Điểm xét tuyển (không chứng chỉ JLPT) = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt điểm chuẩn, đủ điều kiện trúng tuyển' : 'chưa đạt điểm chuẩn'}.`,
  ];

  explanation.push({ id: 'thuv-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: thuvThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'thuv-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: thuvThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'thuv-exact-dxt', label: 'Điểm xét tuyển (ĐXT)', output: dxt30, scale: 30, formula: 'round2(Đ1 + Đ2 + Đ3 + ƯT), KK=0 (không chứng chỉ JLPT)', evidence: thuvThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'thuv-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'thuv',
    year: THUV_EXACT_METHOD.year,
    methodId: THUV_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...thuvThptExamFormulaEvidence.evidence],
  };
}
