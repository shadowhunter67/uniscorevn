import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HALONGU_THPT_THRESHOLD } from './eligibility';
import { halonguAdmissionMethods } from './methods';
import { calculateHalonguEffectivePriority30, lookupHalonguStandardPriority30 } from './priority';
import { halonguThptExamFormulaEvidence } from './evidence';

export function evaluateHalonguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'halongu',
    schoolShortName: 'HALONGU',
    method: halonguAdmissionMethods[0],
    profile,
    context,
    threshold: HALONGU_THPT_THRESHOLD,
    evidenceSourceId: 'halongu-quality-threshold-2026',
  });
}

const HALONGU_EXACT_METHOD = halonguAdmissionMethods[1];
const HALONGU_EXACT_THRESHOLD_30 = 15;

export interface HalonguThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HALONGU 2026 — PT1 (mã 100), nhóm ngành NGOÀI sư phạm: ĐXT = round2(tổng thô 3 môn + điểm ưu
 * tiên). Đủ điều kiện ⟺ ĐXT ≥ 15/30 (ngưỡng công bố đã gồm điểm ưu tiên). */
export function evaluateHalonguThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HalonguThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'halongu',
    year: HALONGU_EXACT_METHOD.year,
    methodId: HALONGU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'halongu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HALONGU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HALONGU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `halongu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HALONGU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HALONGU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHalonguStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHalonguEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = dxt30 >= HALONGU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng PT1 HALONGU 2026 (nhóm ngành ngoài sư phạm): ĐXT ≥ ${HALONGU_EXACT_THRESHOLD_30}/30 (đã gồm điểm ưu tiên).`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({ id: 'halongu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: halonguThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'halongu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: halonguThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'halongu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'ĐXT = [M1+M2+M3] + ĐƯT (nếu có)', evidence: halonguThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'halongu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'halongu',
    year: HALONGU_EXACT_METHOD.year,
    methodId: HALONGU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...halonguThptExamFormulaEvidence.evidence],
  };
}
