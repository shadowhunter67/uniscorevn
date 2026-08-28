import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUBT_THPT_THRESHOLD } from './eligibility';
import { hubtAdmissionMethods } from './methods';
import { calculateHubtEffectivePriority30, lookupHubtStandardPriority30 } from './priority';
import { hubtThptExamExactFormulaEvidence } from './evidence';

export function evaluateHubtThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hubt',
    schoolShortName: 'HUBT',
    method: hubtAdmissionMethods[0],
    profile,
    context,
    threshold: HUBT_THPT_THRESHOLD,
    evidenceSourceId: 'hubt-admission-portal-2026',
  });
}

const HUBT_EXACT_METHOD = hubtAdmissionMethods[1];
const HUBT_EXACT_THRESHOLD_30 = 15;

export interface HubtThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HUBT 2026 — phương thức thi TN THPT, ngành đại trà (trừ nhóm sức khoẻ). ĐXT = round2(tổng thô
 * 3 môn + điểm ưu tiên). Đủ điều kiện ⟺ ĐXT ≥ 15/30. */
export function evaluateHubtThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HubtThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hubt',
    year: HUBT_EXACT_METHOD.year,
    methodId: HUBT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hubt-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HUBT.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HUBT.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `hubt-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUBT.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HUBT.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHubtStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHubtEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = dxt30 >= HUBT_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đầu vào HUBT 2026 (ngành đại trà): ĐXT ≥ ${HUBT_EXACT_THRESHOLD_30}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({ id: 'hubt-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hubtThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'hubt-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hubtThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'hubt-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'ĐXT = tổng 3 môn tổ hợp + Điểm ưu tiên (+ Điểm cộng = 0)', evidence: hubtThptExamExactFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hubt-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hubt',
    year: HUBT_EXACT_METHOD.year,
    methodId: HUBT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hubtThptExamExactFormulaEvidence.evidence],
  };
}
