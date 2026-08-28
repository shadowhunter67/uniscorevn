import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkHauThptExamThreshold, type HauProgramGroup } from './eligibility';
import { hauAdmissionMethods } from './methods';
import { hauKnowledgeGaps } from './knowledgeGaps';

export interface HauSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HauThptExamEvaluationContext {
  group?: HauProgramGroup;
  subjectContext?: HauSubjectContext;
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

export function evaluateHauThptExamAdmission(profile: ApplicantProfile, context: HauThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hauAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HauProgramGroup = context.group ?? 'infrastructureEngineering';
  const gapExtras = {
    missingRules: hauKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: hauKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hau-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HAU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hau-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HAU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkHauThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'hau-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào HAU 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'hau-quality-threshold-2026', location: 'Quyết định 406/QĐ-ĐHKT-ĐT, Phụ lục', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'hau',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HAU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'hau-quality-threshold-2026', location: 'Quyết định 406/QĐ-ĐHKT-ĐT, Phụ lục', verification: 'verified', effectiveYear: 2026 }],
  };
}

import { round2 } from '../../core/round2';
import { HAU_THPT_EXAM_THRESHOLD_30, HAU_PROGRAM_GROUP_LABELS } from './eligibility';
import { calculateHauEffectivePriority30, lookupHauStandardPriority30 } from './priority';
import { hauThptExamFormulaEvidence } from './evidence';

const HAU_EXACT_METHOD = hauAdmissionMethods[1];

export interface HauThptExamExactEvaluationContext {
  group?: HauProgramGroup;
  subjectContext?: HauSubjectContext;
}

/** HAU 2026 — ĐXT (thí sinh không điểm cộng) = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều
 * kiện xét tuyển ⟺ ĐXT ≥ mức điểm nhận hồ sơ nhóm ngành. */
export function evaluateHauThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HauThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hau',
    year: HAU_EXACT_METHOD.year,
    methodId: HAU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hau-program-group', label: 'Chọn nhóm ngành HAU (hạ tầng/giao thông/cấp thoát nước hoặc xây dựng/kinh tế/CNTT).' });
    return partial('Cần chọn nhóm ngành HAU để áp mức điểm nhận hồ sơ.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hau-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HAU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HAU.');
  }

  const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hau-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HAU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HAU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total30 as number);
  const standardPriority30 = lookupHauStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHauEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const threshold = HAU_THPT_EXAM_THRESHOLD_30[context.group];
  const pass = dxt30 >= threshold;

  const reasons = [
    `Mức điểm nhận hồ sơ HAU 2026 (${HAU_PROGRAM_GROUP_LABELS[context.group]}): ${threshold}/30 (đã gồm điểm ưu tiên, điểm cộng nếu có).`,
    `Điểm xét tuyển (không điểm cộng) = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${pass ? 'đạt mức, đủ điều kiện nộp hồ sơ' : 'chưa đạt mức'}.`,
  ];

  explanation.push({ id: 'hau-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hauThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'hau-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hauThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'hau-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: hauThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hau-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hau',
    year: HAU_EXACT_METHOD.year,
    methodId: HAU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: pass ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hauThptExamFormulaEvidence.evidence],
  };
}
