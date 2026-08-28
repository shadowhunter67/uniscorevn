import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TBDU_THPT_THRESHOLD } from './eligibility';
import { tbduAdmissionMethods } from './methods';
import { calculateTbduEffectivePriority30, lookupTbduStandardPriority30 } from './priority';
import { tbduThptExamExactThresholdEvidence } from './evidence';

export function evaluateTbduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tbdu',
    schoolShortName: 'TBDU',
    method: tbduAdmissionMethods[0],
    profile,
    context,
    threshold: TBDU_THPT_THRESHOLD,
    evidenceSourceId: 'tbdu-admission-info-2026',
  });
}

const TBDU_EXACT_METHOD = tbduAdmissionMethods[1];
const TBDU_EXACT_THRESHOLD_30 = 15;

export interface TbduThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TBDU 2026 — phương thức thi TN THPT, nhóm ngành thường. Điểm xét = round2(tổng thô 3 môn +
 * điểm ưu tiên). Đủ điều kiện ⟺ TỔNG THÔ ≥ 15/30 (nguồn im lặng về việc đã gồm ưu tiên). */
export function evaluateTbduThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TbduThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tbdu',
    year: TBDU_EXACT_METHOD.year,
    methodId: TBDU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tbdu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TBDU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét TBDU.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tbdu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TBDU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét TBDU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTbduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTbduEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= TBDU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng TBDU 2026 (thi TN THPT, nhóm ngành thường): tổng điểm thô 3 môn ≥ ${TBDU_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'tbdu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tbduThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'tbdu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: tbduThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'tbdu-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: tbduThptExamExactThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tbdu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'tbdu',
    year: TBDU_EXACT_METHOD.year,
    methodId: TBDU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tbduThptExamExactThresholdEvidence.evidence],
  };
}
