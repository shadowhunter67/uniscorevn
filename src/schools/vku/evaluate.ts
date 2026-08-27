import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VKU_THPT_THRESHOLD } from './eligibility';
import {
  calculateVkuTranscriptSubjectAverage,
  calculateVkuTranscriptTotal30,
  calculateVkuThptTotal30,
  calculateVkuAcademicScore30,
  calculateVkuFinalScore30,
} from './calculator';
import { calculateVkuCertificateBonus30, calculateVkuBonus30 } from './bonus';
import { calculateVkuEffectivePriority30, lookupVkuStandardPriority30 } from './priority';
import { vkuCombinedFormulaEvidence, vkuBonusEvidence, vkuPriorityEvidence } from './evidence';
import { vkuAdmissionMethods } from './methods';

export function evaluateVkuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vku',
    schoolShortName: 'VKU',
    method: vkuAdmissionMethods[0],
    profile,
    context,
    threshold: VKU_THPT_THRESHOLD,
    evidenceSourceId: 'vku-quality-threshold-2026',
  });
}

const EXACT_METHOD = vkuAdmissionMethods[1];

export interface VkuCombinedSubjectContext {
  combinationId?: string;
  /** Đúng 3 môn của tổ hợp xét tuyển (dùng chung cho học bạ và thi TN THPT). */
  subjects: readonly SubjectId[];
}

export interface VkuCombinedEvaluationContext {
  subjectContext?: VkuCombinedSubjectContext;
  /** Điểm thưởng/xét thưởng thành tích (giải HSG/KHKT/Olympic...) đã quy đổi sẵn theo Phụ lục II —
   * bỏ trống nếu thí sinh không khai. Module KHÔNG tự phân loại thành tích. Khai giá trị > 0 =>
   * ngoài phạm vi exact (giữ partial) vì UniscoreVN chưa xác minh được đúng mức của từng thành
   * tích từ hồ sơ dùng chung. */
  achievementBonus30?: number;
}

function exactPartial(input: {
  missingInputs: string[];
  missingRequirements: MissingRequirement[];
  explanation: CalculationStep[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'vku',
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
 * VKU 2026 — Phương thức 2 (xét tuyển kết hợp), tính đủ Điểm xét tuyển:
 *   ĐXT = round2(min(30, [học bạ30×0,6 + thi30×0,4] + điểm cộng + điểm ưu tiên))
 * Học bạ30 = tổng TB-3-năm của 3 môn tổ hợp; thi30 = tổng điểm thi 3 môn; không hệ số môn.
 *
 * `confidence: 'exact-verified'` + `score` vì công thức/điểm cộng/điểm ưu tiên đều trích nguyên
 * văn từ PDF chính thức. `eligibility.status` = `'unknown'`: VKU CHƯA công bố ngưỡng đảm bảo chất
 * lượng đầu vào PT2 2026 ("Trường sẽ công bố theo kế hoạch của Bộ GDĐT" — Mục 3.1), nên không kết
 * luận đạt/không đạt; điểm chuẩn theo ngành công bố sau.
 */
export function evaluateVkuCombinedAdmission(profile: ApplicantProfile, context: VkuCombinedEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vku-combined-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VKU (dùng chung cho học bạ và thi TN THPT).' });
    return exactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp 3 môn để tính điểm xét tuyển kết hợp VKU.' });
  }

  if ((context.achievementBonus30 ?? 0) > 0) {
    missingRequirements.push({
      kind: 'official-rule',
      code: 'vku-achievement-bonus-out-of-scope',
      label: 'Thí sinh có điểm thưởng/xét thưởng thành tích — ngoài phạm vi tính exact của UniscoreVN (chỉ mô hình hoá điểm cộng chứng chỉ IELTS/SAT/ACT).',
    });
    return exactPartial({
      missingInputs: [],
      missingRequirements,
      explanation,
      reason: 'Thí sinh khai thành tích cộng điểm ngoài chứng chỉ — UniscoreVN chưa xác minh mức điểm cộng từng thành tích từ hồ sơ dùng chung.',
    });
  }

  const { subjects } = context.subjectContext;

  const thptScores: number[] = [];
  const missingThpt: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingThpt.push(subjectId);
    else thptScores.push(score);
  }

  const transcriptAverages: number[] = [];
  const missingTranscript: SubjectId[] = [];
  for (const subjectId of subjects) {
    const g10 = profile.transcript?.grade10?.[subjectId];
    const g11 = profile.transcript?.grade11?.[subjectId];
    const g12 = profile.transcript?.grade12?.[subjectId];
    if (g10 === undefined || g11 === undefined || g12 === undefined) missingTranscript.push(subjectId);
    else transcriptAverages.push(calculateVkuTranscriptSubjectAverage({ grade10: g10, grade11: g11, grade12: g12 }));
  }

  if (missingThpt.length > 0 || missingTranscript.length > 0) {
    missingRequirements.push(
      ...missingThpt.map((s) => ({ kind: 'profile-input' as const, code: `vku-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VKU.` })),
      ...missingTranscript.map((s) => ({ kind: 'profile-input' as const, code: `vku-transcript-${s}`, label: `Điểm học bạ (cả năm lớp 10/11/12) môn ${SUBJECT_LABELS[s]} cho tổ hợp VKU.` }))
    );
    return exactPartial({
      missingInputs: [
        ...(missingThpt.length > 0 ? ['Chưa đủ điểm thi TN THPT 3 môn trong tổ hợp VKU.'] : []),
        ...(missingTranscript.length > 0 ? ['Chưa đủ điểm học bạ 3 năm cho 3 môn trong tổ hợp VKU.'] : []),
      ],
      missingRequirements,
      explanation,
      reason: 'Cần đủ điểm học bạ 3 năm và điểm thi TN THPT của 3 môn tổ hợp để tính điểm xét tuyển kết hợp.',
    });
  }

  const transcriptTotal30 = calculateVkuTranscriptTotal30(transcriptAverages);
  const thptTotal30 = calculateVkuThptTotal30(thptScores);
  const academicScore30 = calculateVkuAcademicScore30({ transcriptTotal30, thptTotal30 });

  explanation.push({ id: 'vku-transcript-total', label: 'Điểm học bạ (tổng TB 3 năm, 3 môn)', output: transcriptTotal30, scale: 30, formula: 'Σ TB(lớp10,11,12) của 3 môn tổ hợp', evidence: vkuCombinedFormulaEvidence.evidence });
  explanation.push({ id: 'vku-thpt-total', label: 'Điểm thi TN THPT (tổng 3 môn)', output: thptTotal30, scale: 30, formula: 'MT1 + MT2 + MT3', evidence: vkuCombinedFormulaEvidence.evidence });
  explanation.push({ id: 'vku-academic-score', label: 'Điểm học lực VKU', output: academicScore30, scale: 30, formula: 'Học bạ × 60% + Thi TN THPT × 40%', evidence: vkuCombinedFormulaEvidence.evidence });

  const certificateBonus30 = calculateVkuCertificateBonus30(profile.certificates);
  const bonus30 = calculateVkuBonus30({ certificateBonus30 });
  if (bonus30 > 0) {
    explanation.push({ id: 'vku-bonus', label: 'Điểm cộng (chứng chỉ IELTS/SAT/ACT)', output: bonus30, scale: 30, formula: 'Phụ lục II — mức cao nhất trong nhóm chứng chỉ, trần 3,0', evidence: vkuBonusEvidence.evidence });
  }

  const standardPriority30 = lookupVkuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVkuEffectivePriority30({ academicPlusBonus30: academicScore30 + bonus30, standardPriority30 });
  explanation.push({
    id: 'vku-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − (Điểm quy đổi + Điểm cộng))/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên KV/ĐT theo TT 06/2026',
    evidence: vkuPriorityEvidence.evidence,
  });

  const finalScore = calculateVkuFinalScore30({ academicScore30, bonus30, effectivePriority30: priority.effectivePriority30 });
  explanation.push({ id: 'vku-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'min(30, Điểm học lực + Điểm cộng + Điểm ưu tiên)', evidence: vkuCombinedFormulaEvidence.evidence });

  return {
    schoolId: 'vku',
    year: EXACT_METHOD.year,
    methodId: EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: 'unknown',
      reasons: ['VKU chưa công bố ngưỡng đảm bảo chất lượng đầu vào cho phương thức xét tuyển kết hợp 2026 ("Trường sẽ công bố theo kế hoạch của Bộ GDĐT"); điểm chuẩn theo ngành công bố sau. Điểm xét tuyển ở đây được tính chính xác theo công thức chính thức.'],
    },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vkuCombinedFormulaEvidence.evidence, ...vkuBonusEvidence.evidence, ...vkuPriorityEvidence.evidence],
  };
}
