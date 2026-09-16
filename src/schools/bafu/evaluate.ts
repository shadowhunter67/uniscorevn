import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { BAFU_THPT_THRESHOLD } from './eligibility';
import { bafuAdmissionMethods } from './methods';
import { calculateBafuEffectivePriority30, lookupBafuStandardPriority30 } from './priority';
import { bafuThptExamFormulaEvidence } from './evidence';

export function evaluateBafuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'bafu',
    schoolShortName: 'BAFU',
    method: bafuAdmissionMethods[0],
    profile,
    context,
    threshold: BAFU_THPT_THRESHOLD,
    evidenceSourceId: 'bafu-admission-info-2026',
  });
}

const BAFU_EXACT_METHOD = bafuAdmissionMethods[1];
const BAFU_THPT_EXAM_THRESHOLD_30 = 15;

export interface BafuThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** BAFU 2026 (PT2 — thi TN THPT): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện ⟺
 * TỔNG THÔ ≥ 15/30 (ngưỡng ghi rõ chưa gồm ưu tiên), đồng nhất 20 ngành. */
export function evaluateBafuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: BafuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'bafu',
    year: BAFU_EXACT_METHOD.year,
    methodId: BAFU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'bafu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển BAFU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển BAFU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `bafu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp BAFU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển BAFU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupBafuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateBafuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= BAFU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đầu vào BAFU 2026 (PT2, chưa gồm ưu tiên): tổng thô 3 môn ≥ ${BAFU_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tuyển (đã gồm ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'bafu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: bafuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'bafu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: bafuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'bafu-exact-dxt', label: 'Điểm xét tuyển (ĐXT)', output: dxt30, scale: 30, formula: 'round2(ĐM1 + ĐM2 + ĐM3 + ĐƯT)', evidence: bafuThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'bafu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'bafu',
    year: BAFU_EXACT_METHOD.year,
    methodId: BAFU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...bafuThptExamFormulaEvidence.evidence],
  };
}
