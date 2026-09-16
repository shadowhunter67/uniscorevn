import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vnulawAdmissionMethods } from './methods';
import { VNULAW_FIELD_THRESHOLD_BY_CODE, VNULAW_ACCEPTED_COMBINATION_IDS, type VnulawFieldThreshold } from './thresholds';
import { lookupVnulawStandardPriority30, calculateVnulawEffectivePriority30 } from './priority';
import { vnulawExactFormulaEvidence, vnulawFieldThresholdEvidence } from './evidence';

/** Điều kiện phụ: điểm Toán hoặc Ngữ văn trong tổ hợp xét tuyển phải đạt tối thiểu 6/10. */
export const VNULAW_MATH_OR_LITERATURE_MIN10 = 6;

export interface VnulawSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface VnulawThptExamEvaluationContext {
  fieldCode?: string;
  subjectContext?: VnulawSubjectContext;
}

function readSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

const VNULAW_METHOD = vnulawAdmissionMethods[0];

function vnulawPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vnulaw',
    year: VNULAW_METHOD.year,
    methodId: VNULAW_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

/**
 * VNU-Luật 2026 — phương thức 100 (thi TN THPT), 3/3 ngành. Điểm xét = tổng thô 3 môn theo tổ hợp
 * (không hệ số) + điểm ưu tiên KV/ĐT (công thức chính trường công bố, `priority.ts`). So với điểm
 * chuẩn chính thức theo NGÀNH đã chọn (`thresholds.ts`, đã bao gồm điểm ưu tiên theo công bố gốc).
 * Chỉ chấp nhận 9/10 tổ hợp trường công bố khớp hệ thống. Vẫn giữ điều kiện phụ Toán/Ngữ văn >= 6/10.
 */
export function evaluateVnulawThptExamAdmission(profile: ApplicantProfile, context: VnulawThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vnulaw-field', label: 'Chọn ngành VNU-Luật để tra điểm chuẩn và tính Điểm xét.' });
    return vnulawPartial({ missingRequirements, reason: 'Cần chọn ngành VNU-Luật để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: VnulawFieldThreshold | undefined = VNULAW_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnulaw-field',
      label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-Luật 2026 đã mô hình hoá.`,
    });
    return vnulawPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-Luật 2026 đã mô hình hoá.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vnulaw-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vnulawPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !VNULAW_ACCEPTED_COMBINATION_IDS.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnulaw-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của VNU-Luật (${VNULAW_ACCEPTED_COMBINATION_IDS.join(', ')}).`,
    });
    return vnulawPartial({ missingRequirements, reason: 'Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của VNU-Luật.' });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnulaw-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vnulawPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét VNU-Luật.' });
  }
  const raw30 = total30 as number;

  const pivotSubjects = context.subjectContext.subjects.filter((s): s is 'math' | 'literature' => s === 'math' || s === 'literature');
  const belowPivotFloor = pivotSubjects
    .map((subjectId) => ({ subjectId, score: profile.thpt?.scores?.[subjectId] as number }))
    .filter((entry2) => entry2.score < VNULAW_MATH_OR_LITERATURE_MIN10);

  const standardPriority30 = lookupVnulawStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnulawEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const meetsPivot = belowPivotFloor.length === 0;
  const eligible = finalScore >= threshold30 && meetsPivot;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [`Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`];
  if (!meetsPivot) {
    reasons.push(
      `Điểm môn ${belowPivotFloor.map((e) => `${SUBJECT_LABELS[e.subjectId]} (${e.score})`).join(', ')} thấp hơn ngưỡng tối thiểu ${VNULAW_MATH_OR_LITERATURE_MIN10}/10 mà VNU-Luật yêu cầu cho môn Toán/Ngữ văn trong tổ hợp.`
    );
  } else {
    reasons.push(eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.');
  }

  explanation.push({
    id: 'vnulaw-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnulawExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnulaw-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (công thức chính trường công bố)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: vnulawExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnulaw-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: vnulawExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnulaw-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vnulawFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vnulaw-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vnulaw',
    year: VNULAW_METHOD.year,
    methodId: VNULAW_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnulawExactFormulaEvidence.evidence, ...vnulawFieldThresholdEvidence.evidence],
  };
}
