import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUFL_THPT_THRESHOLD } from './eligibility';
import { huflAdmissionMethods } from './methods';
import {
  HUFL_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE,
  HUFL_PROGRAM_LABELS,
  HUFL_MODELED_COMBINATIONS_BY_PROGRAM_CODE,
} from './thresholds';
import { calculateHuflEffectivePriority30, lookupHuflStandardPriority30 } from './priority';
import { huflThptExamExactEvidence } from './evidence';

export function evaluateHuflThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hufl',
    schoolShortName: 'HUFL',
    method: huflAdmissionMethods[0],
    profile,
    context,
    threshold: HUFL_THPT_THRESHOLD,
    evidenceSourceId: 'hufl-cutoff-2026',
  });
}

const HUFL_EXACT_METHOD = huflAdmissionMethods[1];

export interface HuflThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HUFL 2026 (thi TN THPT, Phương thức 1): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều
 * kiện ⟺ ĐXT ≥ điểm chuẩn của ngành đã chọn. Chỉ tổ hợp dùng môn đã có trong `SubjectId`
 * (D01/D14/D15/C00/X78) — xem `thresholds.ts`. Nguồn: `sources.ts:hufl-admission-info-2026` +
 * `hufl-cutoff-2026`. */
export function evaluateHuflThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HuflThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'hufl',
    year: HUFL_EXACT_METHOD.year,
    methodId: HUFL_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? HUFL_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hufl-program-code', label: 'Chọn ngành đào tạo HUFL.' });
    return partial('Cần chọn ngành đào tạo HUFL để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hufl-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUFL.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HUFL.');
  }

  const modeledCombos = HUFL_MODELED_COMBINATIONS_BY_PROGRAM_CODE[context.programCode] ?? [];
  if (context.subjectContext.combinationId === undefined || !modeledCombos.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hufl-combination-not-modeled',
      label: `Tổ hợp chưa được hỗ trợ cho ngành này (chỉ hỗ trợ: ${modeledCombos.join(', ') || 'không có'}) — một số tổ hợp HUFL dùng môn ngoại ngữ Pháp/Trung/Nhật/Nga/Hàn chưa có trong hệ thống.`,
    });
    return partial('Tổ hợp đã chọn chưa được hỗ trợ cho ngành HUFL này.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `hufl-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUFL.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HUFL.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHuflStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHuflEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = HUFL_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn HUFL 2026 (thi TN THPT, ${programLabel}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn (chưa gồm điểm cộng thành tích nếu có).`,
  ];

  explanation.push({ id: 'hufl-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: huflThptExamExactEvidence.evidence });
  explanation.push({ id: 'hufl-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: huflThptExamExactEvidence.evidence });
  explanation.push({ id: 'hufl-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: huflThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hufl-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }
  missingRequirements.push({ kind: 'official-rule', code: 'hufl-bonus-points-not-modeled', label: 'Điểm cộng thành tích (giải HSG, chứng chỉ ngoại ngữ...) chưa được tính vào Điểm xét tuyển (app chưa thu thập input này) — nếu thí sinh có thành tích, điểm thật có thể cao hơn.' });

  return {
    schoolId: 'hufl',
    year: HUFL_EXACT_METHOD.year,
    methodId: HUFL_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...huflThptExamExactEvidence.evidence],
  };
}
