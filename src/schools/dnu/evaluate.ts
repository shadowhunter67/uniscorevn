import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { dnuAdmissionMethods } from './methods';
import { DNU_FIELD_THRESHOLD_BY_CODE, type DnuFieldThreshold } from './thresholds';
import { lookupDnuStandardPriority30, calculateDnuEffectivePriority30 } from './priority';
import { dnuExactFormulaEvidence, dnuFieldThresholdEvidence } from './evidence';

export interface DnuSubjectContext {
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

const DNU_METHOD = dnuAdmissionMethods[0];

function dnuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'dnu',
    year: DNU_METHOD.year,
    methodId: DNU_METHOD.id,
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
 * DNU 2025 — phương thức xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ
 * số) + điểm ưu tiên KV/ĐT (khung quốc gia, `priority.ts`) + điểm cộng (mặc định 0 — trường không
 * công bố bảng cụ thể). So với điểm trúng tuyển chính thức theo NGÀNH đã chọn — chỉ chấp nhận tổ
 * hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`). Một số ngành còn điều
 * kiện phụ về điểm môn cụ thể (Sư phạm Toán: Toán >= 5.0; Sư phạm Tiếng Anh/Ngôn ngữ Anh: Tiếng Anh
 * >= 7.0) — module kiểm tra điều kiện này. Điều kiện hộ khẩu/thường trú Đồng Nai cho ngành Sư phạm
 * KHÔNG được kiểm tra (không có input hồ sơ tương ứng, xem `knowledgeGaps.ts`).
 */
export function evaluateDnuThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: DnuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'dnu-field', label: 'Chọn ngành DNU để tra điểm trúng tuyển và tính Điểm xét tuyển.' });
    return dnuPartial({ missingRequirements, reason: 'Cần chọn ngành DNU để áp điểm trúng tuyển và tính Điểm xét tuyển.' });
  }
  const entry: DnuFieldThreshold | undefined = DNU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'dnu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển DNU 2025 (chưa mô hình hoá).` });
    return dnuPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển DNU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dnu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return dnuPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'dnu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return dnuPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `dnu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return dnuPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DNU.' });
  }
  const raw30 = total30 as number;

  if (entry.minSubjectScore) {
    const { subject, min } = entry.minSubjectScore;
    const subjectScore = profile.thpt?.scores?.[subject];
    if (subjectScore === undefined || subjectScore < min) {
      const reason = `${entry.name} yêu cầu điểm thi TN THPT môn ${SUBJECT_LABELS[subject]} >= ${min} trong tổ hợp xét tuyển.`;
      missingRequirements.push({ kind: 'profile-input', code: `dnu-min-${subject}`, label: reason });
      return dnuPartial({ missingRequirements, reason });
    }
  }

  const standardPriority30 = lookupDnuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDnuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025.',
  ];
  if (entry.requiresDongNaiResidency) {
    reasons.push('Lưu ý: ngành này chỉ tuyển thí sinh có hộ khẩu/thường trú tại tỉnh Đồng Nai trước ngày tổ chức kỳ thi THPT (trừ thí sinh khuyết tật xét tuyển thẳng) — điều kiện này KHÔNG được kiểm tra ở đây.');
  }

  explanation.push({
    id: 'dnu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: dnuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dnu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: dnuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dnu-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên + điểm cộng (mặc định 0)',
    evidence: dnuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dnu-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: dnuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'dnu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'dnu',
    year: DNU_METHOD.year,
    methodId: DNU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dnuExactFormulaEvidence.evidence, ...dnuFieldThresholdEvidence.evidence],
  };
}
