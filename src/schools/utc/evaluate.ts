import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTC_THPT_THRESHOLD } from './eligibility';
import { calculateUtcAcademicScore30, calculateUtcFinalScore30 } from './calculator';
import { calculateUtcCertificateBonus30, calculateUtcBonus30 } from './bonus';
import { calculateUtcEffectivePriority30, lookupUtcStandardPriority30 } from './priority';
import { getUtcProgramThreshold } from './thresholds';
import { utcFormulaEvidence, utcBonusEvidence, utcPriorityEvidence, utcProgramThresholdEvidence } from './evidence';
import { utcAdmissionMethods } from './methods';

export function evaluateUtcThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'utc',
    schoolShortName: 'UTC',
    method: utcAdmissionMethods[0],
    profile,
    context,
    threshold: UTC_THPT_THRESHOLD,
    evidenceSourceId: 'utc-quality-threshold-2026',
  });
}

const EXACT_METHOD = utcAdmissionMethods[1];

export interface UtcExactSubjectContext {
  combinationId?: string;
  /** Đúng 3 môn của tổ hợp, phải chứa 'math'. */
  subjects: readonly SubjectId[];
}

export interface UtcExactEvaluationContext {
  subjectContext?: UtcExactSubjectContext;
  /** programId khớp `thresholds.ts` (vd 'gha-cntt', 'gsa-logistics'). */
  programId?: string;
  /** Giải HSG cấp tỉnh (nhất/nhì/ba) — không có field trong hồ sơ dùng chung; khai giá trị này =>
   * ngoài phạm vi exact (giữ partial). */
  hsgProvincialRank?: 'nhat' | 'nhi' | 'ba';
}

function exactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'utc',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * UTC 2026 — phương thức xét kết quả thi TN THPT, tính đủ Tổng điểm xét tuyển:
 *   ĐXT = round2(min(30, ĐHL + Điểm cộng + Điểm ưu tiên))
 * ĐHL = `(Toán×2 + 2 môn còn lại)×3/4` (các ngành) hoặc tổng thô 3 môn (ngành Ngôn ngữ Anh).
 * Ngưỡng đảm bảo chất lượng đầu vào so với ĐHL theo bảng ngành đã công bố.
 */
export function evaluateUtcThptExamExactAdmission(profile: ApplicantProfile, context: UtcExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const program = getUtcProgramThreshold(context.programId);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'utc-program', label: 'Chọn ngành UTC (đã công bố ngưỡng) để xác định công thức và điểm sàn.' });
    return exactPartial({ missingInputs: ['Chọn ngành UTC.'], missingRequirements, explanation, reason: 'Cần chọn ngành để xác định nhóm công thức (Toán×2 hay Ngôn ngữ Anh) và ngưỡng đầu vào.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'utc-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển UTC (có môn Toán).' });
    return exactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp 3 môn để tính điểm.' });
  }

  const { subjects } = context.subjectContext;
  if (!subjects.includes('math')) {
    missingRequirements.push({ kind: 'unsupported', code: 'utc-combination-without-math', label: 'Công thức UTC dùng điểm môn Toán; UniscoreVN chưa mô hình hoá tổ hợp không có môn Toán.' });
    return exactPartial({ missingInputs: [], missingRequirements, explanation, reason: 'Tổ hợp không có môn Toán — chưa mô hình hoá.' });
  }

  if (context.hsgProvincialRank) {
    missingRequirements.push({ kind: 'official-rule', code: 'utc-hsg-provincial-out-of-scope', label: 'Thí sinh có giải HSG cấp tỉnh — ngoài phạm vi tính exact (chỉ mô hình hoá điểm cộng IELTS).' });
    return exactPartial({ missingInputs: [], missingRequirements, explanation, reason: 'Thí sinh khai giải HSG cấp tỉnh — UniscoreVN chỉ mô hình hoá điểm cộng IELTS.' });
  }

  const scores: Partial<Record<SubjectId, number>> = {};
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores[subjectId] = score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `utc-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp UTC.` })));
    return exactPartial({ missingInputs: ['Chưa đủ điểm thi TN THPT 3 môn trong tổ hợp UTC.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn thi TN THPT theo tổ hợp.' });
  }

  const others = subjects.filter((s) => s !== 'math');
  const academicScore30 = calculateUtcAcademicScore30(
    { mathScore: scores.math ?? 0, otherScore1: scores[others[0]] ?? 0, otherScore2: scores[others[1]] ?? 0 },
    program.formulaGroup
  );

  const eligibilityStatus: 'eligible' | 'ineligible' = academicScore30 >= program.threshold30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Điểm học lực ${academicScore30}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng đảm bảo chất lượng đầu vào ${program.threshold30}/30 của ngành ${program.name} (${program.campus === 'hanoi' ? 'Hà Nội' : 'Phân hiệu TP.HCM'}). Điểm chuẩn trúng tuyển theo ngành có thể cao hơn.`;

  explanation.push({
    id: 'utc-academic-score',
    label: 'Điểm học lực',
    output: academicScore30,
    scale: 30,
    formula: program.formulaGroup === 'english' ? 'Toán + 2 môn còn lại (không hệ số)' : '(Toán×2 + 2 môn còn lại) × 3/4',
    evidence: utcFormulaEvidence.evidence,
  });
  explanation.push({ id: 'utc-eligibility-threshold', label: 'Ngưỡng đảm bảo chất lượng đầu vào', output: academicScore30, scale: 30, formula: eligibilityReason, evidence: utcProgramThresholdEvidence.evidence });

  const certificateBonus30 = calculateUtcCertificateBonus30(profile.certificates);
  const bonus30 = calculateUtcBonus30({ certificateBonus30 });
  if (bonus30 > 0) {
    explanation.push({ id: 'utc-bonus', label: 'Điểm cộng (IELTS)', output: bonus30, scale: 30, formula: 'Bảng điểm cộng đề án UTC (IELTS 5.0-7.0+)', evidence: utcBonusEvidence.evidence });
  }

  const standardPriority30 = lookupUtcStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUtcEffectivePriority30({ academicPlusBonus30: academicScore30 + bonus30, standardPriority30 });
  explanation.push({
    id: 'utc-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − (ĐHL + Điểm cộng))/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo quy chế hiện hành',
    evidence: utcPriorityEvidence.evidence,
  });

  const finalScore = calculateUtcFinalScore30({ academicScore30, bonus30, effectivePriority30: priority.effectivePriority30 });
  explanation.push({ id: 'utc-final', label: 'Tổng điểm xét tuyển', output: finalScore, scale: 30, formula: 'min(30, ĐHL + Điểm cộng + Điểm ưu tiên)', evidence: utcFormulaEvidence.evidence });

  return {
    schoolId: 'utc',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...utcFormulaEvidence.evidence, ...utcBonusEvidence.evidence, ...utcPriorityEvidence.evidence, ...utcProgramThresholdEvidence.evidence],
  };
}
