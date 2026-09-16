import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { QTU_THPT_THRESHOLD } from './eligibility';
import { qtuAdmissionMethods } from './methods';
import { QTU_THPT_EXAM_THRESHOLD_30, QTU_THRESHOLD_GROUP_LABELS, type QtuThresholdGroup } from './thresholds';
import { calculateQtuEffectivePriority30, lookupQtuStandardPriority30 } from './priority';
import { qtuThptExamFormulaEvidence } from './evidence';

export function evaluateQtuAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'qtu',
    schoolShortName: 'QTU',
    method: qtuAdmissionMethods[0],
    profile,
    context,
    threshold: QTU_THPT_THRESHOLD,
    evidenceSourceId: 'qtu-cutoff-notice-2026',
  });
}

const QTU_EXACT_METHOD = qtuAdmissionMethods[1];

export interface QtuThptExamExactEvaluationContext {
  /** Nhóm ngưỡng: 'nursing' (Điều dưỡng, 18/30) | 'standard' (10 ngành còn lại, 15/30). */
  group?: QtuThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** QTU 2026 — thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện xét tuyển ⟺
 * ĐXT ≥ ngưỡng nhóm ngành (Điều dưỡng 18/30, còn lại 15/30). */
export function evaluateQtuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: QtuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'qtu',
    year: QTU_EXACT_METHOD.year,
    methodId: QTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'qtu-program-group', label: 'Chọn nhóm ngành QTU (Điều dưỡng / ngành khác).' });
    return partial('Cần chọn nhóm ngành QTU để áp ngưỡng.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'qtu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển QTU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển QTU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `qtu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp QTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển QTU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupQtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateQtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = QTU_THPT_EXAM_THRESHOLD_30[context.group];
  const pass = dxt30 >= threshold;

  const reasons = [
    `Ngưỡng QTU 2026 (thi TN THPT, ${QTU_THRESHOLD_GROUP_LABELS[context.group]}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}.`,
  ];

  explanation.push({ id: 'qtu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: qtuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'qtu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: qtuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'qtu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: qtuThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'qtu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'qtu',
    year: QTU_EXACT_METHOD.year,
    methodId: QTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...qtuThptExamFormulaEvidence.evidence],
  };
}
