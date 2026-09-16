import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HPU_THPT_THRESHOLD } from './eligibility';
import { hpuAdmissionMethods } from './methods';
import { HPU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE, HPU_PROGRAM_LABELS } from './thresholds';
import { calculateHpuEffectivePriority30, lookupHpuStandardPriority30 } from './priority';
import { hpuThptExamThresholdEvidence } from './evidence';

export function evaluateHpuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hpu',
    schoolShortName: 'HPU',
    method: hpuAdmissionMethods[0],
    profile,
    context,
    threshold: HPU_THPT_THRESHOLD,
    evidenceSourceId: 'hpu-cutoff-notice-2026',
  });
}

const HPU_EXACT_METHOD = hpuAdmissionMethods[1];

export interface HpuThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HPU 2026 — thi TN THPT: so TỔNG THÔ 3 môn với điểm chuẩn của mã ngành đã chọn (nguồn im lặng
 * về việc gồm ưu tiên hay chưa). Điểm ưu tiên chỉ hiển thị tham khảo trong `score`. */
export function evaluateHpuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HpuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hpu',
    year: HPU_EXACT_METHOD.year,
    methodId: HPU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? HPU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hpu-program-code', label: 'Chọn mã ngành HPU.' });
    return partial('Cần chọn mã ngành HPU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hpu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HPU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét HPU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `hpu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HPU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét HPU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHpuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHpuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= threshold;
  const programLabel = HPU_PROGRAM_LABELS[context.programCode] ?? context.programCode;

  const reasons = [
    `Điểm chuẩn HPU 2026 (thi TN THPT, ${programLabel} — mã ${context.programCode}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'hpu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hpuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'hpu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hpuThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'hpu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so điểm chuẩn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: hpuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hpu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hpu',
    year: HPU_EXACT_METHOD.year,
    methodId: HPU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hpuThptExamThresholdEvidence.evidence],
  };
}
