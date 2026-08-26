import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UAH_THPT_THRESHOLD, UAH_KTCSHT_THPT_THRESHOLD } from './eligibility';
import { calculateUahThptRawScore, calculateUahThptFinalScore } from './calculator';
import { calculateUahPriority30, lookupUahStandardPriority30 } from './priority';
import { uahAdmissionMethods } from './methods';

export function evaluateUahThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uah',
    schoolShortName: 'UAH',
    method: uahAdmissionMethods[0],
    profile,
    context,
    threshold: UAH_THPT_THRESHOLD,
    evidenceSourceId: 'uah-floor-score-press-2026',
  });
}

const KTCSHT_METHOD_ID = uahAdmissionMethods[1].id;
const KTCSHT_YEAR = uahAdmissionMethods[1].year;

const KTCSHT_THRESHOLD_EVIDENCE = [{ sourceId: 'uah-notice-975-pdf-2026', location: 'Bảng "Ngưỡng ĐBCLĐV" — mã ngành 7580210', verification: 'verified' as const, effectiveYear: 2026 }];
const KTCSHT_FORMULA_EVIDENCE = [{ sourceId: 'uah-notice-391-2026', location: 'Mục 4.2 Phương thức 2 (khối A/C/D)', verification: 'verified' as const, effectiveYear: 2026 }];
const KTCSHT_PRIORITY_EVIDENCE = [{ sourceId: 'uah-notice-391-2026', location: 'Mục 6-7 (Chính sách ưu tiên)', verification: 'verified' as const, effectiveYear: 2026 }];

export interface UahKtchsSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface UahKtchsEvaluationContext {
  subjectContext?: UahKtchsSubjectContext;
}

function ktchsPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'uah',
    year: KTCSHT_YEAR,
    methodId: KTCSHT_METHOD_ID,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.eligibilityReason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * Xét kết quả thi TN THPT 2026, ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, cơ sở TP.HCM, tổ hợp
 * C01/A01/D01/D07) — thang 30. Điểm học lực = tổng thô 3 môn (không hệ số, mục 4.2 Thông báo
 * 391/TB-HĐTS); điểm ưu tiên theo mục 6-7 (UAH tự công bố mức khu vực + công thức giảm điểm ưu tiên
 * khi tổng ≥22,5/30). Điểm xét tuyển cuối = học lực + ưu tiên, kẹp trần 30.
 */
export function evaluateUahKtchsThptExactAdmission(profile: ApplicantProfile, context: UahKtchsEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'uah-ktcsht-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển (C01/A01/D01/D07).' });
    return ktchsPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để kiểm tra ngưỡng đầu vào.' });
  }

  const { subjects } = context.subjectContext;
  const scores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `uah-ktcsht-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return ktchsPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để kiểm tra ngưỡng.' });
  }

  const raw30 = calculateUahThptRawScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  const threshold = { pass: raw30 >= UAH_KTCSHT_THPT_THRESHOLD.min30, requiredText: UAH_KTCSHT_THPT_THRESHOLD.requiredText };
  explanation.push({ id: 'uah-ktcsht-eligibility-threshold', label: 'Ngưỡng đầu vào', output: raw30, scale: 30, formula: threshold.requiredText, evidence: KTCSHT_THRESHOLD_EVIDENCE });
  explanation.push({ id: 'uah-ktcsht-academic-score', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: KTCSHT_FORMULA_EVIDENCE });

  const standardPriority30 = lookupUahStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUahPriority30({ academicScore30: raw30, standardPriority30 });
  explanation.push({
    id: 'uah-ktcsht-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Học lực)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: KTCSHT_PRIORITY_EVIDENCE,
  });

  const finalScore = calculateUahThptFinalScore({ raw30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'uah-ktcsht-final', label: 'Điểm xét tuyển cuối cùng', output: finalScore, scale: 30 });

  return {
    schoolId: 'uah',
    year: KTCSHT_YEAR,
    methodId: KTCSHT_METHOD_ID,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...KTCSHT_THRESHOLD_EVIDENCE, ...KTCSHT_FORMULA_EVIDENCE, ...KTCSHT_PRIORITY_EVIDENCE],
  };
}
