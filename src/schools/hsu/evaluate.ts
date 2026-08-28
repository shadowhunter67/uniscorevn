import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hsuAdmissionMethods } from './methods';
import { hsuKnowledgeGaps } from './knowledgeGaps';
import { checkHsuThptExamThreshold, checkHsuTranscriptThreshold, type HsuThresholdGroup } from './eligibility';
import { calculateHsuEffectivePriority30, lookupHsuStandardPriority30 } from './priority';
import { hsuThptExamExactFormulaEvidence } from './evidence';

export interface HsuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function sumSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

export interface HsuThptExamEvaluationContext {
  thresholdGroup?: HsuThresholdGroup;
  subjectContext?: HsuSubjectContext;
}

/** Phương thức thi TN THPT 2026. */
export function evaluateHsuThptExamAdmission(profile: ApplicantProfile, context: HsuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hsuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HsuThresholdGroup = context.thresholdGroup ?? 'standard';

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hsu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HSU.`,
        }))
      );
    }
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'hsu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HSU.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (total30 !== undefined) {
    const result = checkHsuThptExamThreshold(total30, group);
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({ id: 'hsu-thpt-exam-threshold', label: 'Điểm sàn HSU 2026 (thi TN THPT)', output: total30, scale: 30, formula: result.requiredText });
  }

  return {
    schoolId: 'hsu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HSU.'] },
    missingInputs,
    missingRules: (method.knowledgeGaps ?? hsuKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? hsuKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

const HSU_EXACT_METHOD = hsuAdmissionMethods[2];
const HSU_EXACT_THRESHOLD_30: Record<HsuThresholdGroup, number> = { standard: 15, law: 20 };

export interface HsuThptExamExactEvaluationContext {
  thresholdGroup: HsuThresholdGroup;
  subjectContext?: HsuSubjectContext;
}

/** HSU 2026 — phương thức thi TN THPT. Nhóm `law`: so ĐXT (thô + ưu tiên) với ngưỡng 20 (nguồn nói
 * rõ "đã bao gồm điểm ưu tiên"). Nhóm `standard`: so TỔNG THÔ với ngưỡng 15 (nguồn im lặng về ưu
 * tiên). ĐXT (thô + ưu tiên judgment call) luôn hiển thị tham khảo. */
export function evaluateHsuThptExamExactAdmission(profile: ApplicantProfile, context: HsuThptExamExactEvaluationContext): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hsu',
    year: HSU_EXACT_METHOD.year,
    methodId: HSU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hsu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HSU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HSU.');
  }
  const subjects = context.subjectContext.subjects;

  const { total30: raw30Unrounded, missingSubjects } = sumSubjectTotal(profile, subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hsu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HSU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HSU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }
  const raw30 = raw30Unrounded as number;

  const threshold = HSU_EXACT_THRESHOLD_30[context.thresholdGroup];
  const standardPriority30 = lookupHsuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHsuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const comparisonValue = context.thresholdGroup === 'law' ? dxt30 : raw30;
  const eligible = comparisonValue >= threshold;

  const groupLabel = context.thresholdGroup === 'law' ? 'khối Pháp luật' : 'nhóm ngành ngoài Pháp luật';
  const comparisonLabel = context.thresholdGroup === 'law' ? 'Điểm xét tuyển (đã gồm ưu tiên)' : 'Tổng điểm thô (chưa gồm ưu tiên)';
  const reasons = [
    `Điểm sàn HSU 2026 (thi TN THPT, ${groupLabel}): ${comparisonLabel} ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng (so với ${comparisonLabel.toLowerCase()} = ${comparisonValue}).`,
  ];

  explanation.push({ id: 'hsu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hsuThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'hsu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hsuThptExamExactFormulaEvidence.evidence });
  explanation.push({ id: 'hsu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'ĐXT = tổng thô 3 môn + điểm ưu tiên', evidence: hsuThptExamExactFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hsu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hsu',
    year: HSU_EXACT_METHOD.year,
    methodId: HSU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hsuThptExamExactFormulaEvidence.evidence],
  };
}

export interface HsuTranscriptEvaluationContext {
  thresholdGroup?: HsuThresholdGroup;
  /** Tổng điểm học bạ theo tổ hợp 3 môn, trung bình 6 học kỳ (thang 30) — người dùng tự cung cấp
   * (xem `hsu-transcript-methodology-unpublished`). */
  totalScore30?: number;
}

/** Phương thức học bạ (tổ hợp 3 môn, 6 học kỳ). Nhóm `law` chưa có ngưỡng công bố cho phương thức
 * này -> luôn trả `unknown` kèm gap, không phải `ineligible`. */
export function evaluateHsuTranscriptAdmission(profile: ApplicantProfile, context: HsuTranscriptEvaluationContext = {}): AdmissionEvaluation {
  void profile;
  const method = hsuAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HsuThresholdGroup = context.thresholdGroup ?? 'standard';

  const result = context.totalScore30 !== undefined ? checkHsuTranscriptThreshold(context.totalScore30, group) : undefined;

  if (context.totalScore30 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hsu-transcript-total-score', label: 'Tổng điểm học bạ theo tổ hợp 3 môn (trung bình 6 học kỳ, thang 30).' });
  }
  if (group === 'law') {
    missingRequirements.push({ kind: 'official-rule', code: 'hsu-law-non-thpt-threshold-unpublished', label: 'HSU chưa công bố ngưỡng phương thức học bạ cho khối ngành Pháp luật.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (result) {
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({ id: 'hsu-transcript-threshold', label: 'Điểm sàn HSU 2026 (học bạ)', output: context.totalScore30 ?? 0, scale: 30, formula: result.requiredText });
  } else if (group === 'law') {
    reasons.push('HSU chưa công bố ngưỡng phương thức học bạ cho khối ngành Pháp luật.');
  } else {
    reasons.push('Cần nhập tổng điểm học bạ theo tổ hợp 3 môn (trung bình 6 học kỳ) để kiểm tra ngưỡng HSU.');
  }

  return {
    schoolId: 'hsu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules: (method.knowledgeGaps ?? hsuKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? hsuKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}
