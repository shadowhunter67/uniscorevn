import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TGU_THPT_THRESHOLD } from './eligibility';
import { tguAdmissionMethods } from './methods';
import { calculateTguEffectivePriority30, lookupTguStandardPriority30 } from './priority';
import { tguThptExamFormulaEvidence } from './evidence';

export function evaluateTguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tgu',
    schoolShortName: 'TGU',
    method: tguAdmissionMethods[0],
    profile,
    context,
    threshold: TGU_THPT_THRESHOLD,
    evidenceSourceId: 'tgu-admission-scheme-2026',
  });
}

const TGU_EXACT_METHOD = tguAdmissionMethods[1];
const TGU_THPT_EXAM_THRESHOLD_30 = 15;

export interface TguThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TGU 2026 — Phương thức 1, "các ngành khác": ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ
 * điều kiện xét tuyển ⟺ ĐXT ≥ 15/30 VÀ điểm môn Toán hoặc Ngữ văn (cao hơn trong 2 môn có trong
 * tổ hợp) ≥ ĐXT/3. */
export function evaluateTguThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TguThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tgu',
    year: TGU_EXACT_METHOD.year,
    methodId: TGU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tgu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TGU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TGU.');
  }
  const subjects = context.subjectContext.subjects;
  if (!subjects.includes('math') && !subjects.includes('literature')) {
    missingRequirements.push({ kind: 'school-context', code: 'tgu-subject-combination', label: 'Tổ hợp TGU phải có môn Toán hoặc Ngữ văn để kiểm tra điều kiện môn chính.' });
    return partial('Tổ hợp đã chọn không có môn Toán hoặc Ngữ văn — không kiểm tra được điều kiện môn chính TGU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tgu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TGU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TGU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTguStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTguEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const thresholdPass = dxt30 >= TGU_THPT_EXAM_THRESHOLD_30;

  const mathScore = profile.thpt?.scores?.math;
  const literatureScore = profile.thpt?.scores?.literature;
  const mainSubjectScore = Math.max(mathScore ?? -Infinity, literatureScore ?? -Infinity);
  const mainSubjectPass = mainSubjectScore >= dxt30 / 3;

  const reasons = [
    `Ngưỡng Phương thức 1 TGU 2026 ("các ngành khác"): ĐXT ≥ ${TGU_THPT_EXAM_THRESHOLD_30}/30 VÀ điểm Toán hoặc Ngữ văn ≥ 1/3 ĐXT.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${thresholdPass ? 'đạt' : 'chưa đạt'} ngưỡng 15/30.`,
    `Điểm Toán/Ngữ văn cao hơn = ${mainSubjectScore} — cần ≥ ${round2(dxt30 / 3)} (1/3 ĐXT) → ${mainSubjectPass ? 'đạt' : 'chưa đạt'}.`,
  ];

  explanation.push({ id: 'tgu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tguThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tgu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: tguThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tgu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: tguThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'tgu-exact-main-subject', label: 'Điều kiện môn chính (Toán/Ngữ văn ≥ 1/3 ĐXT)', output: mainSubjectScore, scale: 10, formula: reasons[2], evidence: tguThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tgu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  const eligible = thresholdPass && mainSubjectPass;

  return {
    schoolId: 'tgu',
    year: TGU_EXACT_METHOD.year,
    methodId: TGU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tguThptExamFormulaEvidence.evidence],
  };
}
