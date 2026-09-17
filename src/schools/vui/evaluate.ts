import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VUI_THPT_THRESHOLD } from './eligibility';
import { vuiAdmissionMethods } from './methods';
import { calculateVuiEffectivePriority30, lookupVuiStandardPriority30 } from './priority';
import { vuiThptExamThresholdEvidence } from './evidence';

export function evaluateVuiAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vui',
    schoolShortName: 'VUI',
    method: vuiAdmissionMethods[0],
    profile,
    context,
    threshold: VUI_THPT_THRESHOLD,
    evidenceSourceId: 'vui-cutoff-notice-2026',
  });
}

const VUI_EXACT_METHOD = vuiAdmissionMethods[1];
const VUI_THPT_EXAM_THRESHOLD_30 = 15;

export interface VuiThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** VUI 2026 (thi TN THPT): đủ điều kiện ⟺ TỔNG THÔ ≥ 15/30, đồng nhất 18 ngành. Điểm ưu tiên chỉ
 * hiển thị tham khảo. */
export function evaluateVuiThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VuiThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'vui',
    year: VUI_EXACT_METHOD.year,
    methodId: VUI_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vui-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VUI.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét VUI.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `vui-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VUI.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét VUI.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupVuiStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVuiEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= VUI_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm chuẩn VUI 2026 (thi TN THPT, đồng nhất 18 ngành): tổng thô 3 môn ≥ ${VUI_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'vui-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: vuiThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'vui-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: vuiThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'vui-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so điểm chuẩn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: vuiThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vui-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'vui',
    year: VUI_EXACT_METHOD.year,
    methodId: VUI_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vuiThptExamThresholdEvidence.evidence],
  };
}
