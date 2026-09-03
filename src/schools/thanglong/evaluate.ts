import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { thanglongAdmissionMethods } from './methods';
import { THANGLONG_FIELD_THRESHOLD_BY_CODE, type ThanglongFieldThreshold } from './thresholds';
import { THANGLONG_GROUP_COMBOS } from './combos';
import { lookupThanglongStandardPriority30, calculateThanglongEffectivePriority30 } from './priority';
import { thanglongExactFormulaEvidence, thanglongFieldThresholdEvidence } from './evidence';

export interface ThanglongSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
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

const THANGLONG_METHOD = thanglongAdmissionMethods[0];

function thanglongPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'thanglong',
    year: THANGLONG_METHOD.year,
    methodId: THANGLONG_METHOD.id,
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
 * TLU-HN 2025 — phương thức 1 (xét kết quả thi TN THPT). Điểm xét = tổng thô 3 môn theo tổ hợp
 * (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia, `priority.ts`). Điểm trúng tuyển công bố theo
 * NGÀNH áp dụng cho tổ hợp gốc của nhóm; nếu tổ hợp đã chọn không phải tổ hợp gốc, điểm trúng tuyển
 * hiệu lực = điểm trúng tuyển tổ hợp gốc + mức chênh lệch tổ hợp trong nhóm (`combos.ts`).
 */
export function evaluateThanglongThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: ThanglongSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'thanglong-field', label: 'Chọn ngành TLU-HN để tra điểm chuẩn và tính Điểm xét.' });
    return thanglongPartial({ missingRequirements, reason: 'Cần chọn ngành TLU-HN để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: ThanglongFieldThreshold | undefined = THANGLONG_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'thanglong-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TLU-HN 2025 (chưa mô hình hoá).` });
    return thanglongPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn TLU-HN 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'thanglong-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return thanglongPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const groupCombos = THANGLONG_GROUP_COMBOS[entry.group];
  const combinationId = context.subjectContext.combinationId;
  const delta = combinationId ? groupCombos.deltaByCombinationId[combinationId] : undefined;
  if (!combinationId || delta === undefined) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'thanglong-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong bảng quy đổi tổ hợp của nhóm ngành ${entry.name} (tổ hợp gốc ${groupCombos.baseCombinationId}: ${Object.keys(groupCombos.deltaByCombinationId).join(', ')}).`,
    });
    return thanglongPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc bảng quy đổi tổ hợp của nhóm ngành ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `thanglong-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return thanglongPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét TLU-HN.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupThanglongStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateThanglongEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const effectiveThreshold30 = round2(entry.threshold30 + delta);
  const eligible = finalScore >= effectiveThreshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const thresholdLabel =
    delta === 0
      ? `Điểm trúng tuyển ${entry.name} (tổ hợp gốc ${groupCombos.baseCombinationId})`
      : `Điểm trúng tuyển ${entry.name} — quy đổi cho tổ hợp ${combinationId} (gốc ${groupCombos.baseCombinationId} ${entry.threshold30} ${delta > 0 ? '+' : ''}${delta})`;

  const reasons: string[] = [
    `${thresholdLabel}: tổng 3 môn + điểm ưu tiên KV/ĐT >= ${effectiveThreshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025 (đã quy đổi tổ hợp nếu cần).' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025 (đã quy đổi tổ hợp nếu cần).',
  ];

  explanation.push({
    id: 'thanglong-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: thanglongExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'thanglong-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: thanglongExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'thanglong-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: thanglongExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'thanglong-exact-threshold',
    label: thresholdLabel,
    output: effectiveThreshold30,
    scale: 30,
    formula: reasons[0],
    evidence: thanglongFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'thanglong-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'thanglong',
    year: THANGLONG_METHOD.year,
    methodId: THANGLONG_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...thanglongExactFormulaEvidence.evidence, ...thanglongFieldThresholdEvidence.evidence],
  };
}
