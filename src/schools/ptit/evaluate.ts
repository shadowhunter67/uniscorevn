import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { checkPtitDomesticExamThreshold, type PtitDomesticExam } from './eligibility';
import { ptitDomesticExamThresholdEvidence, ptitRawFormulaEvidence } from './evidence';
import { ptitKnowledgeGaps } from './knowledgeGaps';
import { ptitAdmissionMethods } from './methods';

export interface PtitDomesticExamEvaluationContext {
  exam?: PtitDomesticExam;
  rawScore?: number;
}

export function evaluatePtitDomesticExamAdmission(profile: ApplicantProfile, context: PtitDomesticExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ptitAdmissionMethods[0];
  const exam = context.exam ?? 'vact';
  const rawScore = context.rawScore ?? (exam === 'vact' ? profile.exams?.vact?.total : undefined);
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const officialGaps = ptitKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));

  if (rawScore === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: `ptit-${exam}`, label: `PTIT ${exam.toUpperCase()} 2026 score.` });
    return {
      schoolId: 'ptit',
      year: method.year,
      methodId: method.id,
      confidence: 'unavailable',
      eligibility: { status: 'unknown', reasons: ['Domestic aptitude/thinking exam score is required to check PTIT eligibility.'] },
      missingInputs: ['Missing domestic aptitude/thinking exam score.'],
      missingRules: ptitKnowledgeGaps.map((gap) => gap.label),
      missingRequirements: [...missingRequirements, ...officialGaps],
      explanation,
      evidence: [],
    };
  }

  const threshold = checkPtitDomesticExamThreshold(exam, rawScore);
  explanation.push(
    {
      id: 'ptit-domestic-exam-threshold',
      label: 'PTIT domestic exam eligibility threshold',
      output: rawScore,
      formula: threshold.requiredText,
      evidence: ptitDomesticExamThresholdEvidence.evidence,
    },
    {
      id: 'ptit-raw-score-formula',
      label: 'PTIT raw formula shape',
      output: rawScore,
      formula: 'DXT = DGNL/DGTD score + bonus + priority, before equivalent conversion',
      evidence: ptitRawFormulaEvidence.evidence,
    }
  );

  return {
    schoolId: 'ptit',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    missingInputs: [],
    missingRules: ptitKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: officialGaps,
    explanation,
    evidence: [...ptitDomesticExamThresholdEvidence.evidence, ...ptitRawFormulaEvidence.evidence],
  };
}


import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { getPtitCampusThreshold } from './thresholds';
import { calculatePtitThptRawScore30, calculatePtitThptFinalScore30 } from './calculator';
import { calculatePtitEffectivePriority30, lookupPtitStandardPriority30 } from './priority';
import { calculatePtitCertificateBonus30, calculatePtitBonus30 } from './bonus';
import { ptitThptFormulaEvidence, ptitThptCampusThresholdEvidence, ptitThptBonusEvidence, ptitThptPriorityEvidence } from './evidence';

const PTIT_THPT_EXACT_METHOD = ptitAdmissionMethods[1];

export interface PtitThptExactSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface PtitThptExactEvaluationContext {
  subjectContext?: PtitThptExactSubjectContext;
  /** 'bvh' (phía Bắc, ngưỡng 20,00) hoặc 'bvs' (phía Nam, ngưỡng 16,50). Bắt buộc. */
  campusId?: string;
  /** Điểm thành tích (giải HSG) đã quy về thang 30 — không có field trong hồ sơ dùng chung. */
  achievementBonus30?: number;
}

function ptitThptExactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'ptit',
    year: PTIT_THPT_EXACT_METHOD.year,
    methodId: PTIT_THPT_EXACT_METHOD.id,
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
 * PTIT 2026 — Phương thức 5 (xét thi TN THPT), tính đủ Điểm xét tuyển (thang 30):
 *   ĐXT = round2((M1 + M2 + M3) + Điểm cộng + Điểm ưu tiên)
 * Ngưỡng ĐBCL (BVH 20,00 / BVS 16,50) "đã bao gồm điểm ưu tiên" ⇒ so với (tổng thô + điểm ưu tiên),
 * không gồm điểm cộng.
 */
export function evaluatePtitThptExamExactAdmission(profile: ApplicantProfile, context: PtitThptExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const threshold = getPtitCampusThreshold(context.campusId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'ptit-campus', label: 'Chọn cơ sở đào tạo PTIT: phía Bắc (BVH, ngưỡng 20,00) hoặc phía Nam (BVS, ngưỡng 16,50).' });
    return ptitThptExactPartial({ missingInputs: ['Chọn cơ sở đào tạo PTIT.'], missingRequirements, explanation, reason: 'Cần chọn cơ sở đào tạo (BVH/BVS) để xác định ngưỡng đảm bảo chất lượng đầu vào.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ptit-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển PTIT (A00/A01/D01/X06/X26).' });
    return ptitThptExactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp để tính điểm.' });
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
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `ptit-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp PTIT.` })));
    return ptitThptExactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp PTIT.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }

  const raw30 = calculatePtitThptRawScore30(scores);
  const certificateBonus30 = calculatePtitCertificateBonus30(profile.certificates);
  const bonus30 = calculatePtitBonus30({ certificateBonus30, achievementBonus30: context.achievementBonus30 });
  const standardPriority30 = lookupPtitStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePtitEffectivePriority30({ academicPlusBonus30: raw30 + bonus30, standardPriority30 });
  const finalScore = calculatePtitThptFinalScore30({ raw30, bonus30, effectivePriority30: priority.effectivePriority30 });

  const scoreForThreshold = raw30 + priority.effectivePriority30;
  const eligibilityStatus: 'eligible' | 'ineligible' = scoreForThreshold >= threshold.thptMin30 ? 'eligible' : 'ineligible';
  const eligibilityReason = `Điểm xét tuyển (chưa cộng điểm cộng) ${Math.round(scoreForThreshold * 100) / 100}/30 ${eligibilityStatus === 'eligible' ? 'đạt' : 'dưới'} ngưỡng đảm bảo chất lượng đầu vào ${threshold.thptMin30}/30 của ${threshold.campusName}. Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  explanation.push({ id: 'ptit-thpt-threshold', label: `Ngưỡng đảm bảo chất lượng - ${threshold.campusName}`, output: Math.round(scoreForThreshold * 100) / 100, scale: 30, formula: eligibilityReason, evidence: ptitThptCampusThresholdEvidence.evidence });
  explanation.push({ id: 'ptit-thpt-academic', label: 'Điểm học lực (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: ptitThptFormulaEvidence.evidence });
  if (bonus30 > 0) {
    explanation.push({ id: 'ptit-thpt-bonus', label: 'Điểm cộng', output: bonus30, scale: 30, formula: 'Bảng IELTS + điểm thành tích, tối đa 3,0', evidence: ptitThptBonusEvidence.evidence });
  }
  explanation.push({
    id: 'ptit-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026)',
    evidence: ptitThptPriorityEvidence.evidence,
  });
  explanation.push({ id: 'ptit-thpt-final', label: 'Điểm xét tuyển (ĐXT)', output: finalScore, scale: 30, formula: 'M1 + M2 + M3 + Điểm cộng + Điểm ưu tiên', evidence: ptitThptFormulaEvidence.evidence });

  return {
    schoolId: 'ptit',
    year: PTIT_THPT_EXACT_METHOD.year,
    methodId: PTIT_THPT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ptitThptCampusThresholdEvidence.evidence, ...ptitThptFormulaEvidence.evidence, ...ptitThptPriorityEvidence.evidence],
  };
}
