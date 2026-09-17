import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TKS_THPT_THRESHOLD } from './eligibility';
import { tksAdmissionMethods } from './methods';
import { TKS_THPT_EXAM_THRESHOLD_30, TKS_PROGRAM_GROUP_LABELS, TKS_COMBINATION_DEVIATION_30, type TksProgramGroup } from './thresholds';
import { calculateTksEffectivePriority30, lookupTksStandardPriority30 } from './priority';
import { tksThptExamFormulaEvidence } from './evidence';

export function evaluateTksAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tks',
    schoolShortName: 'TKS',
    method: tksAdmissionMethods[0],
    profile,
    context,
    threshold: TKS_THPT_THRESHOLD,
    evidenceSourceId: 'tks-cutoff-notice-2026',
  });
}

const TKS_EXACT_METHOD = tksAdmissionMethods[1];

export interface TksThptExamExactEvaluationContext {
  group?: TksProgramGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TKS 2026 — thi TN THPT, nhóm Luật/Luật kinh tế/Ngôn ngữ Anh: ĐXT (quy về D01) = round2(tổng
 * thô tổ hợp đã chọn + độ lệch tổ hợp + điểm ưu tiên). Đủ điều kiện trúng tuyển ⟺ ĐXT ≥ điểm
 * chuẩn nhóm ngành/cơ sở (điểm chuẩn đã công bố "đã bao gồm điểm ưu tiên"). */
export function evaluateTksThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TksThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tks',
    year: TKS_EXACT_METHOD.year,
    methodId: TKS_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'tks-program-group', label: 'Chọn ngành/cơ sở TKS (Luật Trụ sở chính / Luật kinh tế / Ngôn ngữ Anh / Luật Phân hiệu TP.HCM).' });
    return partial('Cần chọn ngành/cơ sở TKS để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tks-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TKS.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TKS.');
  }

  const combinationId = context.subjectContext.combinationId;
  const deviation = combinationId !== undefined ? TKS_COMBINATION_DEVIATION_30[combinationId] : undefined;
  if (combinationId === undefined || deviation === undefined) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tks-combination-out-of-scope',
      label: 'Tổ hợp đã chọn chưa có độ lệch công bố (chỉ hỗ trợ D01/A00/A01/C01/C02/C03/C04/D07/D09/D14/D15).',
    });
    return partial('Tổ hợp đã chọn nằm ngoài phạm vi bảng quy đổi độ lệch của TKS.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tks-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TKS.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TKS.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const converted30 = round2(raw30 + deviation);
  const standardPriority30 = lookupTksStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTksEffectivePriority30({ rawTotal30: converted30, standardPriority30 });
  const dxt30 = round2(converted30 + priority.effectivePriority30);
  const threshold = TKS_THPT_EXAM_THRESHOLD_30[context.group];
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn TKS 2026 (thi TN THPT, ${TKS_PROGRAM_GROUP_LABELS[context.group]}): Điểm xét tuyển (đã gồm ưu tiên) ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô tổ hợp (${raw30}) + độ lệch tổ hợp (${deviation}) + điểm ưu tiên (${priority.effectivePriority30}) = ${dxt30}/30 → ${eligible ? 'đạt điểm chuẩn, đủ điều kiện trúng tuyển' : 'chưa đạt điểm chuẩn'}.`,
  ];

  explanation.push({ id: 'tks-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tksThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tks-exact-converted', label: 'Điểm quy đổi về tổ hợp D01', output: converted30, scale: 30, formula: `tổng thô + độ lệch tổ hợp (${deviation >= 0 ? '+' : ''}${deviation})`, evidence: tksThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tks-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − điểm quy đổi)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: tksThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tks-exact-dxt', label: 'Điểm xét tuyển (ĐXT)', output: dxt30, scale: 30, formula: 'round2(điểm quy đổi D01 + điểm ưu tiên)', evidence: tksThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tks-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }
  missingRequirements.push({ kind: 'official-rule', code: 'tks-pre-screening-not-modeled', label: 'Cần "Đạt sơ tuyển" (nếu đăng ký ngành Kiểm sát) — UniscoreVN không kiểm tra được điều kiện này.' });

  return {
    schoolId: 'tks',
    year: TKS_EXACT_METHOD.year,
    methodId: TKS_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tksThptExamFormulaEvidence.evidence],
  };
}
