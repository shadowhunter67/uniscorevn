import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VNUF_THPT_THRESHOLD } from './eligibility';
import { vnufAdmissionMethods } from './methods';
import { calculateVnufEffectivePriority30, lookupVnufStandardPriority30 } from './priority';
import { vnufThptExamExactEvidence } from './evidence';

export function evaluateVnufThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vnuf',
    schoolShortName: 'VNUF',
    method: vnufAdmissionMethods[0],
    profile,
    context,
    threshold: VNUF_THPT_THRESHOLD,
    evidenceSourceId: 'vnuf-admission-scheme-2026',
  });
}

const VNUF_EXACT_METHOD = vnufAdmissionMethods[1];
const VNUF_THPT_EXAM_THRESHOLD_30 = 15;

export interface VnufThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** VNUF 2026 (thi TN THPT): đủ điều kiện ⟺ TỔNG THÔ ≥ 15/30, đồng nhất mọi ngành/cơ sở (nguồn nói
 * rõ ngưỡng không tính ưu tiên). Điểm ưu tiên chỉ hiển thị tham khảo. */
export function evaluateVnufThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VnufThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'vnuf',
    year: VNUF_EXACT_METHOD.year,
    methodId: VNUF_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuf-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VNUF.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển VNUF.');
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
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `vnuf-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VNUF.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển VNUF.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupVnufStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnufEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= VNUF_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm chuẩn VNUF 2026 (thi TN THPT, đồng nhất mọi ngành/cơ sở): tổng thô 3 môn ≥ ${VNUF_THPT_EXAM_THRESHOLD_30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn. Điểm xét tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'vnuf-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: vnufThptExamExactEvidence.evidence });
  explanation.push({ id: 'vnuf-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: vnufThptExamExactEvidence.evidence });
  explanation.push({ id: 'vnuf-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so điểm chuẩn)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: vnufThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vnuf-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'vnuf',
    year: VNUF_EXACT_METHOD.year,
    methodId: VNUF_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnufThptExamExactEvidence.evidence],
  };
}
