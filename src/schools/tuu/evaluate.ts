import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TUU_THPT_THRESHOLD } from './eligibility';
import { tuuAdmissionMethods } from './methods';
import {
  TUU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE,
  TUU_PROGRAM_LABELS,
  TUU_MODELED_COMBINATIONS_BY_PROGRAM_CODE,
} from './thresholds';
import { calculateTuuEffectivePriority30, lookupTuuStandardPriority30 } from './priority';
import { tuuThptExamExactEvidence } from './evidence';

export function evaluateTuuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tuu',
    schoolShortName: 'TUU',
    method: tuuAdmissionMethods[0],
    profile,
    context,
    threshold: TUU_THPT_THRESHOLD,
    evidenceSourceId: 'tuu-cutoff-2026',
  });
}

const TUU_EXACT_METHOD = tuuAdmissionMethods[1];

export interface TuuThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TUU 2026 (thi TN THPT, mã 100): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện
 * ⟺ ĐXT ≥ điểm chuẩn của ngành đã chọn. Chỉ 21/25 ngành (loại Luật/Luật kinh tế/Ngôn ngữ Anh/
 * QTKD-IPOP — điều kiện phụ chưa mô hình hoá) và chỉ tổ hợp dùng môn đã có trong `SubjectId` — xem
 * `thresholds.ts`. Nguồn: `sources.ts:tuu-cutoff-2026` + `tuu-admission-info-2026`. */
export function evaluateTuuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TuuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'tuu',
    year: TUU_EXACT_METHOD.year,
    methodId: TUU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? TUU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'tuu-program-code', label: 'Chọn ngành đào tạo TUU (trong 21/25 ngành hỗ trợ exact).' });
    return partial('Cần chọn ngành đào tạo TUU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tuu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TUU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TUU.');
  }

  const modeledCombos = TUU_MODELED_COMBINATIONS_BY_PROGRAM_CODE[context.programCode] ?? [];
  if (context.subjectContext.combinationId === undefined || !modeledCombos.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tuu-combination-not-modeled',
      label: `Tổ hợp chưa được hỗ trợ cho ngành này (chỉ hỗ trợ: ${modeledCombos.join(', ') || 'không có'}).`,
    });
    return partial('Tổ hợp đã chọn chưa được hỗ trợ cho ngành TUU này.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tuu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TUU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TUU.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTuuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTuuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = TUU_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn TUU 2026 (thi TN THPT, ${programLabel}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn (chưa gồm điểm cộng thành tích nếu có).`,
  ];

  explanation.push({ id: 'tuu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tuuThptExamExactEvidence.evidence });
  explanation.push({ id: 'tuu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026, judgment call)', evidence: tuuThptExamExactEvidence.evidence });
  explanation.push({ id: 'tuu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: tuuThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tuu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }
  missingRequirements.push({ kind: 'official-rule', code: 'tuu-bonus-points-not-modeled', label: 'Điểm cộng thành tích (giải HSG cấp tỉnh/TP) chưa được tính vào Điểm xét tuyển (app chưa thu thập input này) — nếu thí sinh có thành tích, điểm thật có thể cao hơn.' });

  return {
    schoolId: 'tuu',
    year: TUU_EXACT_METHOD.year,
    methodId: TUU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tuuThptExamExactEvidence.evidence],
  };
}
