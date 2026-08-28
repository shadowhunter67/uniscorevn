import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { checkLtvuniThptExamThreshold, LTVUNI_THPT_EXAM_THRESHOLD_30, LTVUNI_PROGRAM_GROUP_LABELS, type LtvuniProgramGroup } from './eligibility';
import { ltvuniAdmissionMethods } from './methods';
import { ltvuniKnowledgeGaps } from './knowledgeGaps';
import { calculateLtvuniEffectivePriority30, lookupLtvuniStandardPriority30 } from './priority';
import { ltvuniThptExactFormulaEvidence, ltvuniNoBonusPointsEvidence } from './evidence';

export interface LtvuniSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface LtvuniThptExamEvaluationContext {
  group?: LtvuniProgramGroup;
  subjectContext?: LtvuniSubjectContext;
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

export function evaluateLtvuniThptExamAdmission(profile: ApplicantProfile, context: LtvuniThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ltvuniAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: LtvuniProgramGroup = context.group ?? 'standard';
  const gapExtras = {
    missingRules: ltvuniKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: ltvuniKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ltvuni-subject-combination', label: 'Chọn tổ hợp môn xét tuyển LTVUni.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ltvuni-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp LTVUni.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkLtvuniThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'ltvuni-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào LTVUni 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'ltvuni-quality-threshold-2026', location: 'Thông báo 269/TB-ĐHLTV', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'ltvuni',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng LTVUni.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'ltvuni-quality-threshold-2026', location: 'Thông báo 269/TB-ĐHLTV', verification: 'verified', effectiveYear: 2026 }],
  };
}

const LTVUNI_EXACT_METHOD = ltvuniAdmissionMethods[1];

/**
 * LTVUni 2026 — nhánh exact, phương thức 100 (xét điểm thi TN THPT). Thông báo 269/TB-ĐHLTV
 * (đọc trực tiếp qua vision) mục B.1.a xác nhận: "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 +
 * Điểm môn 3 + điểm ƯT (nếu có)" (điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng); mục A.1.b
 * xác nhận ngưỡng theo 11/11 ngành, KHÔNG tính điểm cộng. Mức điểm ưu tiên KV/ĐT cụ thể là mức
 * chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateLtvuniThptExamExactAdmission(
  profile: ApplicantProfile,
  context: LtvuniThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: LtvuniProgramGroup = context.group ?? 'standard';

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'ltvuni',
    year: LTVUNI_EXACT_METHOD.year,
    methodId: LTVUNI_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ltvuni-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển LTVUni.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển LTVUni.');
  }

  const subjects = context.subjectContext.subjects;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ltvuni-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp LTVUni.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = LTVUNI_THPT_EXAM_THRESHOLD_30[group];
  const standardPriority30 = lookupLtvuniStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateLtvuniEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào LTVUni 2026 (ngành: ${LTVUNI_PROGRAM_GROUP_LABELS[group]}): tổng điểm (đã gồm điểm ưu tiên, không có điểm cộng) ≥ ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'ltvuni-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: ltvuniThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ltvuni-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: ltvuniThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ltvuni-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên, không có điểm cộng)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: [...ltvuniThptExactFormulaEvidence.evidence, ...ltvuniNoBonusPointsEvidence.evidence],
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ltvuni-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ltvuni',
    year: LTVUNI_EXACT_METHOD.year,
    methodId: LTVUNI_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ltvuniThptExactFormulaEvidence.evidence, ...ltvuniNoBonusPointsEvidence.evidence],
  };
}
