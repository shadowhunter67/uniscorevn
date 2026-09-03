import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tumpAdmissionMethods } from './methods';
import { TUMP_FIELD_THRESHOLD_BY_CODE, type TumpFieldThreshold } from './thresholds';
import { lookupTumpStandardPriority30, calculateTumpEffectivePriority30 } from './priority';
import { calculateTumpStandardBonus30, calculateTumpEffectiveBonus30 } from './bonus';
import { tumpExactFormulaEvidence, tumpFieldThresholdEvidence } from './evidence';

export interface TumpSubjectContext {
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

const TUMP_METHOD = tumpAdmissionMethods[0];

function tumpPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tump',
    year: TUMP_METHOD.year,
    methodId: TUMP_METHOD.id,
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
 * TUMP 2025 — phương thức xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ
 * số, KHÔNG áp dụng thay thế điểm Tiếng Anh bằng IELTS — xem `knowledgeGaps.ts`) + điểm cộng (bậc
 * IELTS theo bảng riêng của trường, `bonus.ts`, các thành tích khác không mô hình hoá) + điểm ưu
 * tiên KV/ĐT (khung quốc gia, `priority.ts`). So với điểm trúng tuyển chính thức theo NGÀNH đã chọn
 * — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`).
 */
export function evaluateTumpThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: TumpSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'tump-field', label: 'Chọn ngành TUMP để tra điểm trúng tuyển và tính Điểm xét tuyển.' });
    return tumpPartial({ missingRequirements, reason: 'Cần chọn ngành TUMP để áp điểm trúng tuyển và tính Điểm xét tuyển.' });
  }
  const entry: TumpFieldThreshold | undefined = TUMP_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'tump-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển TUMP 2025 (chưa mô hình hoá).` });
    return tumpPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển TUMP 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tump-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return tumpPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tump-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return tumpPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tump-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return tumpPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TUMP.' });
  }
  const raw30 = total30 as number;

  const standardBonus30 = calculateTumpStandardBonus30(profile.certificates);
  const bonus = calculateTumpEffectiveBonus30({ rawTotal30: raw30, standardBonus30 });
  const standardPriority30 = lookupTumpStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTumpEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + bonus.effectiveBonus30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm cộng + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'tump-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tumpExactFormulaEvidence.evidence,
  });
  if (bonus.effectiveBonus30 > 0) {
    explanation.push({
      id: 'tump-exact-bonus',
      label: bonus.reduced ? 'Điểm cộng (đã giảm)' : 'Điểm cộng (IELTS)',
      output: bonus.effectiveBonus30,
      scale: 30,
      formula: bonus.reduced ? '[(30 − tổng thô)/5] × Mức điểm cộng (bảng IELTS)' : 'Bảng điểm cộng IELTS — mục 4.2',
      evidence: tumpExactFormulaEvidence.evidence,
    });
  }
  explanation.push({
    id: 'tump-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: tumpExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tump-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm cộng + Điểm ưu tiên',
    evidence: tumpExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tump-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: tumpFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tump-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tump',
    year: TUMP_METHOD.year,
    methodId: TUMP_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tumpExactFormulaEvidence.evidence, ...tumpFieldThresholdEvidence.evidence],
  };
}
