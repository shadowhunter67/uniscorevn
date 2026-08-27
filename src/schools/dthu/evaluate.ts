import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { checkDthuThptExamThreshold, calculateDthuThptExamScore30, DTHU_THPT_EXAM_THRESHOLD_30, type DthuProgramGroup, type DthuExactGroup } from './eligibility';
import { dthuAdmissionMethods } from './methods';
import { dthuKnowledgeGaps } from './knowledgeGaps';
import { calculateDthuEffectivePriority30, lookupDthuStandardPriority30 } from './priority';
import { dthuThptExamFormulaEvidence, dthuThptExamThresholdEvidence } from './evidence';

export interface DthuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface DthuThptExamEvaluationContext {
  group?: DthuProgramGroup;
  subjectContext?: DthuSubjectContext;
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

export function evaluateDthuThptExamAdmission(profile: ApplicantProfile, context: DthuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = dthuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: DthuProgramGroup = context.group ?? 'standard';
  const gapExtras = {
    missingRules: dthuKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: dthuKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'dthu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển DTHU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `dthu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp DTHU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkDthuThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'dthu-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào DTHU 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'dthu-quality-threshold-2026', location: 'Phụ lục I, Thông báo ngày 09/07/2026', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'dthu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng DTHU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'dthu-quality-threshold-2026', location: 'Phụ lục I, Thông báo ngày 09/07/2026', verification: 'verified', effectiveYear: 2026 }],
  };
}

const DTHU_EXACT_METHOD = dthuAdmissionMethods[1];

export interface DthuThptExamExactEvaluationContext {
  /** Nhóm ngành: 'standard' (ngành khác, ngưỡng 15) hoặc 'teacherTraining' (sư phạm đại học, ngưỡng 20). */
  group?: DthuExactGroup;
  subjectContext?: DthuSubjectContext;
}

/**
 * DThU 2026 — Phương thức 100, tính đủ Ngưỡng đầu vào / điểm xét:
 * NĐV = round2(tổng thô 3 môn + điểm ưu tiên). Đạt ngưỡng nhóm (15 / 20) ⇒ đủ điều kiện xét tuyển.
 */
export function evaluateDthuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DthuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'dthu-program-group', label: 'Chọn nhóm ngành DThU: sư phạm (ngưỡng 20) hoặc ngành khác (ngưỡng 15).' });
    return dthuExactPartial(missingRequirements, 'Cần chọn nhóm ngành DThU để áp ngưỡng đầu vào.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dthu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển DThU.' });
    return dthuExactPartial(missingRequirements, 'Cần chọn tổ hợp 3 môn để tính Ngưỡng đầu vào DThU.');
  }

  const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({ kind: 'profile-input' as const, code: `dthu-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp DThU.` }))
    );
    return dthuExactPartial(missingRequirements, 'Cần đủ điểm 3 môn thi TN THPT để tính Ngưỡng đầu vào DThU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total30 as number);
  const standardPriority30 = lookupDthuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDthuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const ndv30 = calculateDthuThptExamScore30(raw30, priority.effectivePriority30);

  const threshold = DTHU_THPT_EXAM_THRESHOLD_30[context.group];
  const pass = ndv30 >= threshold;
  const groupLabel = context.group === 'teacherTraining' ? 'nhóm đào tạo giáo viên (đại học)' : 'nhóm ngành không sư phạm';

  const reasons = [
    `Ngưỡng đầu vào DThU 2026 (${groupLabel}, KV3): NĐV ≥ ${threshold}/30.`,
    `NĐV = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${ndv30}/30 → ${pass ? 'đạt ngưỡng, đủ điều kiện xét tuyển' : 'chưa đạt ngưỡng'}. (Điểm chuẩn trúng tuyển từng ngành công bố riêng, cao hơn ngưỡng.)`,
  ];

  explanation.push({ id: 'dthu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: dthuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dthu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: dthuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dthu-exact-ndv', label: 'Ngưỡng đầu vào (NĐV) / điểm xét', output: ndv30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: dthuThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'dthu-exact-threshold', label: `Ngưỡng ${groupLabel}`, output: threshold, scale: 30, formula: reasons[0], evidence: dthuThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dthu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — NĐV đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'dthu',
    year: DTHU_EXACT_METHOD.year,
    methodId: DTHU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: ndv30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dthuThptExamFormulaEvidence.evidence, ...dthuThptExamThresholdEvidence.evidence],
  };
}

function dthuExactPartial(missingRequirements: MissingRequirement[], reason: string, missingInputs: string[] = []): AdmissionEvaluation {
  return {
    schoolId: 'dthu',
    year: DTHU_EXACT_METHOD.year,
    methodId: DTHU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  };
}
