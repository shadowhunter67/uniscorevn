import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { checkTbuThptExamThreshold, TBU_THPT_EXAM_THRESHOLD_30, type TbuProgramGroup } from './eligibility';
import { tbuAdmissionMethods } from './methods';
import { tbuKnowledgeGaps } from './knowledgeGaps';
import { calculateTbuEffectivePriority30, lookupTbuStandardPriority30 } from './priority';
import { calculateTbuBonus30 } from './bonus';
import { tbuThptExactFormulaEvidence } from './evidence';

export interface TbuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface TbuThptExamEvaluationContext {
  group?: TbuProgramGroup;
  subjectContext?: TbuSubjectContext;
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

export function evaluateTbuThptExamAdmission(profile: ApplicantProfile, context: TbuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = tbuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: TbuProgramGroup = context.group ?? 'standard';
  const gapExtras = {
    missingRules: tbuKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: tbuKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'tbu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển TBU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `tbu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp TBU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkTbuThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'tbu-thpt-exam-threshold',
        label: 'Ngưỡng nhận hồ sơ TBU 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'tbu-thongbao-565-2026', location: 'Thông báo 565/TB-ĐHTB mục 3.2 / Ghi chú (b) mục 5', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass === undefined ? 'unknown' : result.pass ? 'eligible' : 'ineligible';
      if (result.pass === undefined) {
        missingRequirements.push({ kind: 'official-rule', code: 'tbu-law-pt1-threshold-not-fixed', label: 'Ngưỡng Luật (PT1) do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm — không phải số cố định.' });
      }
    }
  }

  return {
    schoolId: 'tbu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng TBU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'tbu-thongbao-565-2026', location: 'Thông báo 565/TB-ĐHTB mục 3.2 / Ghi chú (b) mục 5', verification: 'verified', effectiveYear: 2026 }],
  };
}

const TBU_EXACT_METHOD = tbuAdmissionMethods[1];
const TBU_EXACT_THRESHOLD_30 = TBU_THPT_EXAM_THRESHOLD_30.standard as number;

/**
 * TBU 2026 — nhánh exact, phương thức PT1 (xét kết quả thi TN THPT), CHỈ nhóm "các ngành khác"
 * (trừ Luật — PT1-Luật không có ngưỡng cố định, xem `eligibility.ts`). Thông báo 565/TB-ĐHTB xác
 * nhận ĐXT = tổng 3 môn + điểm ưu tiên (theo Bộ GD&ĐT, mục 4.1) + điểm cộng (bảng mục 4.2, model
 * nhánh IELTS). Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateTbuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TbuThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tbu',
    year: TBU_EXACT_METHOD.year,
    methodId: TBU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === 'law') {
    missingRequirements.push({ kind: 'official-rule', code: 'tbu-law-pt1-threshold-not-fixed', label: 'Ngành Luật (PT1) không có ngưỡng cố định — do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm.' });
    return partial('Ngành Luật (PT1) không có ngưỡng cố định do TBU tự công bố — chưa xác định được ở đây.');
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'tbu-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển TBU.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển TBU.');
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
        code: `tbu-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp TBU.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTbuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTbuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const bonus30 = calculateTbuBonus30({ ielts: profile.certificates?.ielts });
  const total30 = round2(Math.min(30, raw30 + priority.effectivePriority30 + bonus30));
  const eligible = total30 >= TBU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào TBU 2026 (PT1, các ngành trừ Luật): tổng điểm (gồm điểm ưu tiên + điểm cộng, tối đa 30) ≥ ${TBU_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30, điểm cộng (IELTS) = ${bonus30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'tbu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tbu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: tbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tbu-exact-bonus',
    label: 'Điểm cộng (IELTS)',
    output: bonus30,
    scale: 30,
    formula: 'Bảng điểm cộng IELTS mục 4.2 (giải HSG cấp tỉnh/thành chưa model, thiếu input field)',
    evidence: tbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tbu-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên + điểm cộng, tối đa 30)',
    output: total30,
    scale: 30,
    formula: 'min(30, round2(tổng thô 3 môn + điểm ưu tiên hiệu lực + điểm cộng))',
    evidence: tbuThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tbu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'tbu',
    year: TBU_EXACT_METHOD.year,
    methodId: TBU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: tbuThptExactFormulaEvidence.evidence,
  };
}
