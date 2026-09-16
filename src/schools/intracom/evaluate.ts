import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { INTRACOM_THPT_THRESHOLD } from './eligibility';
import { intracomAdmissionMethods } from './methods';
import { INTRACOM_THPT_EXAM_THRESHOLD_30, INTRACOM_THRESHOLD_GROUP_LABELS, type IntracomThresholdGroup } from './thresholds';
import { calculateIntracomEffectivePriority30, lookupIntracomStandardPriority30 } from './priority';
import { intracomThptExamThresholdEvidence } from './evidence';

export function evaluateIntracomAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'intracom',
    schoolShortName: 'Intracom',
    method: intracomAdmissionMethods[0],
    profile,
    context,
    threshold: INTRACOM_THPT_THRESHOLD,
    evidenceSourceId: 'intracom-threshold-notice-2026',
  });
}

const INTRACOM_EXACT_METHOD = intracomAdmissionMethods[1];

export interface IntracomThptExamExactEvaluationContext {
  /** Nhóm ngưỡng: 'lawEconomics' (Luật Kinh tế, 20/30) | 'standard' (12 ngành còn lại, 15/30). */
  group?: IntracomThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** Intracom University 2026 — thi TN THPT: so TỔNG THÔ 3 môn với ngưỡng nhóm ngành (nguồn im lặng
 * về việc gồm ưu tiên hay chưa). Điểm ưu tiên chỉ hiển thị tham khảo trong `score`. */
export function evaluateIntracomThptExamExactAdmission(
  profile: ApplicantProfile,
  context: IntracomThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'intracom',
    year: INTRACOM_EXACT_METHOD.year,
    methodId: INTRACOM_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'intracom-program-group', label: 'Chọn nhóm ngành (Luật Kinh tế / ngành khác).' });
    return partial('Cần chọn nhóm ngành để áp ngưỡng.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'intracom-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `intracom-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp đã chọn.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupIntracomStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateIntracomEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = INTRACOM_THPT_EXAM_THRESHOLD_30[context.group];
  const eligible = raw30 >= threshold;

  const reasons = [
    `Ngưỡng Intracom University 2026 (thi TN THPT, ${INTRACOM_THRESHOLD_GROUP_LABELS[context.group]}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'intracom-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: intracomThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'intracom-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: intracomThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'intracom-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: intracomThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'intracom-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'intracom',
    year: INTRACOM_EXACT_METHOD.year,
    methodId: INTRACOM_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...intracomThptExamThresholdEvidence.evidence],
  };
}
