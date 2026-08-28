import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { checkCtumpThptExamThreshold, CTUMP_THPT_EXAM_THRESHOLD_30, CTUMP_PROGRAM_GROUP_LABELS, type CtumpProgramGroup } from './eligibility';
import { ctumpAdmissionMethods } from './methods';
import { ctumpKnowledgeGaps } from './knowledgeGaps';
import { calculateCtumpEffectivePriority30, lookupCtumpStandardPriority30 } from './priority';
import { ctumpThptExamThresholdEvidence, ctumpPriorityReductionFormulaEvidence } from './evidence';

export interface CtumpSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface CtumpThptExamEvaluationContext {
  group?: CtumpProgramGroup;
  subjectContext?: CtumpSubjectContext;
}

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

export function evaluateCtumpThptExamAdmission(profile: ApplicantProfile, context: CtumpThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ctumpAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: CtumpProgramGroup = context.group ?? 'tier15';
  const gapExtras = {
    missingRules: ctumpKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: ctumpKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ctump-subject-combination', label: 'Chọn tổ hợp môn xét tuyển CTUMP.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ctump-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp CTUMP.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkCtumpThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'ctump-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào CTUMP 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'ctump-quality-threshold-2026', location: 'Thông báo 197/TB-ĐHYDCT, mục II.1', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'ctump',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng CTUMP.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'ctump-quality-threshold-2026', location: 'Thông báo 197/TB-ĐHYDCT, mục II.1', verification: 'verified', effectiveYear: 2026 }],
  };
}

const CTUMP_EXACT_METHOD = ctumpAdmissionMethods[1];

export interface CtumpThptExamExactEvaluationContext {
  group?: CtumpProgramGroup;
  subjectContext?: CtumpSubjectContext;
}

/**
 * CTUMP 2026 — nhánh HẸP tính đủ ngưỡng đầu vào (exact), phương thức thi TN THPT, 4 nhóm ngành
 * (`CtumpProgramGroup`) đã công bố mức điểm nhận hồ sơ đợt 1. KHÁC HCMUE (nguồn im lặng, judgment
 * call so tổng thô): Thông báo 197/TB-ĐHYDCT nói RÕ mức điểm này đã BAO GỒM điểm ưu tiên khu
 * vực/đối tượng — nên nhánh này CỘNG điểm ưu tiên hiệu lực (công thức giảm dần trích nguyên văn
 * từ chính thông báo, `priority.ts`) vào tổng thô trước khi so ngưỡng, không chỉ hiển thị tham
 * khảo. Mức điểm ưu tiên khu vực/đối tượng cụ thể (KV1/KV2-NT/KV2/KV3, ĐT nhóm 1/nhóm 2) không
 * được CTUMP in lại — dùng mức chuẩn toàn quốc (judgment call, cùng tiền lệ HCMUE/TBDU/CTU/HUCE).
 * Nhóm ngành vẫn do người dùng tự chọn (`ctump-program-mapping-not-imported` — non-blocking).
 */
export function evaluateCtumpThptExamExactAdmission(
  profile: ApplicantProfile,
  context: CtumpThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'ctump',
    year: CTUMP_EXACT_METHOD.year,
    methodId: CTUMP_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.group) {
    missingRequirements.push({ kind: 'school-context', code: 'ctump-program-group', label: 'Chọn nhóm ngành CTUMP (theo mã ngành xét tuyển).' });
    return partial('Cần chọn nhóm ngành CTUMP để tính ngưỡng đầu vào.');
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ctump-subject-combination', label: 'Chọn tổ hợp môn xét tuyển CTUMP.' });
    return partial('Cần chọn tổ hợp môn để tính ngưỡng đầu vào CTUMP.');
  }

  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of context.subjectContext.subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ctump-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp CTUMP.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp CTUMP đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = CTUMP_THPT_EXAM_THRESHOLD_30[context.group];
  const standardPriority30 = lookupCtumpStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateCtumpEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold;

  const reasons = [
    `Mức điểm nhận hồ sơ đợt 1 CTUMP 2026 (${CTUMP_PROGRAM_GROUP_LABELS[context.group]}): tổng điểm (đã gồm ưu tiên) ≥ ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} mức điểm nhận hồ sơ.`,
  ];

  explanation.push({
    id: 'ctump-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: ctumpThptExamThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'ctump-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: ctumpPriorityReductionFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctump-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: ctumpThptExamThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ctump-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ctump',
    year: CTUMP_EXACT_METHOD.year,
    methodId: CTUMP_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ctumpThptExamThresholdEvidence.evidence, ...ctumpPriorityReductionFormulaEvidence.evidence],
  };
}
