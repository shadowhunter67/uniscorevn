import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { USTH_THPT_THRESHOLD } from './eligibility';
import { usthAdmissionMethods } from './methods';
import { USTH_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE, USTH_PROGRAM_LABELS } from './thresholds';
import { calculateUsthEffectivePriority30, lookupUsthStandardPriority30 } from './priority';
import { usthThptExamExactEvidence } from './evidence';

export function evaluateUsthThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'usth',
    schoolShortName: 'USTH',
    method: usthAdmissionMethods[0],
    profile,
    context,
    threshold: USTH_THPT_THRESHOLD,
    evidenceSourceId: 'usth-threshold-2026',
  });
}

const USTH_EXACT_METHOD = usthAdmissionMethods[1];

export interface UsthThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** USTH 2026 (thi TN THPT, Phương thức 4): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều
 * kiện ⟺ ĐXT ≥ điểm chuẩn của mã ngành đã chọn. Nguồn: `sources.ts:usth-scheme-2026`. */
export function evaluateUsthThptExamExactAdmission(
  profile: ApplicantProfile,
  context: UsthThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'usth',
    year: USTH_EXACT_METHOD.year,
    methodId: USTH_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? USTH_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'usth-program-code', label: 'Chọn mã ngành USTH.' });
    return partial('Cần chọn mã ngành USTH để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'usth-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển USTH.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển USTH.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `usth-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp USTH.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển USTH.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupUsthStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUsthEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = USTH_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn USTH 2026 (thi TN THPT, ${programLabel} — mã ${context.programCode}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];

  explanation.push({ id: 'usth-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: usthThptExamExactEvidence.evidence });
  explanation.push({ id: 'usth-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: usthThptExamExactEvidence.evidence });
  explanation.push({ id: 'usth-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: usthThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'usth-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'usth',
    year: USTH_EXACT_METHOD.year,
    methodId: USTH_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...usthThptExamExactEvidence.evidence],
  };
}
