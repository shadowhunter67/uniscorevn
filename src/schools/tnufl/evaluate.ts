import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tnuflAdmissionMethods } from './methods';
import { TNUFL_FIELD_THRESHOLD_BY_CODE, TNUFL_ACCEPTED_COMBINATION_IDS, type TnuflFieldThreshold } from './thresholds';
import { lookupTnuflStandardPriority30, calculateTnuflEffectivePriority30 } from './priority';
import { tnuflExactFormulaEvidence, tnuflFieldThresholdEvidence } from './evidence';

export interface TnuflSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface TnuflThptExamEvaluationContext {
  fieldCode?: string;
  subjectContext?: TnuflSubjectContext;
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

const TNUFL_METHOD = tnuflAdmissionMethods[0];

function tnuflPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tnufl',
    year: TNUFL_METHOD.year,
    methodId: TNUFL_METHOD.id,
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
 * TNUFL 2026 — nhánh xét kết quả thi TN THPT (2/5 ngành liên quan Tiếng Anh). Điểm xét = tổng thô 3
 * môn theo tổ hợp (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call,
 * `priority.ts`). So với điểm chuẩn chính thức theo NGÀNH đã chọn (`thresholds.ts`). Chỉ chấp nhận 1
 * trong 4 tổ hợp trường đã công bố có thành phần Tiếng Anh (D01/D14/D15/X78) — xem `knowledgeGaps.ts`.
 */
export function evaluateTnuflThptExamAdmission(profile: ApplicantProfile, context: TnuflThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'tnufl-field', label: 'Chọn ngành TNUFL để tra điểm chuẩn và tính Điểm xét.' });
    return tnuflPartial({ missingRequirements, reason: 'Cần chọn ngành TNUFL để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: TnuflFieldThreshold | undefined = TNUFL_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tnufl-field',
      label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TNUFL 2026 đã mô hình hoá (chỉ 2/5 ngành liên quan Tiếng Anh).`,
    });
    return tnuflPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TNUFL 2026 đã mô hình hoá.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tnufl-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return tnuflPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !TNUFL_ACCEPTED_COMBINATION_IDS.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tnufl-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức có Tiếng Anh của TNUFL (${TNUFL_ACCEPTED_COMBINATION_IDS.join(', ')}).`,
    });
    return tnuflPartial({ missingRequirements, reason: 'Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của TNUFL.' });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tnufl-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return tnuflPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét TNUFL.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupTnuflStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTnuflEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố chính thức năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'tnufl-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tnuflExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnufl-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: tnuflExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnufl-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: tnuflExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnufl-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: tnuflFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tnufl-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tnufl',
    year: TNUFL_METHOD.year,
    methodId: TNUFL_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tnuflExactFormulaEvidence.evidence, ...tnuflFieldThresholdEvidence.evidence],
  };
}
