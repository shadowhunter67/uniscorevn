import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { actvnAdmissionMethods } from './methods';
import { ACTVN_FIELD_THRESHOLD_BY_CODE, type ActvnFieldThreshold } from './thresholds';
import { lookupActvnStandardPriority30, calculateActvnEffectivePriority30 } from './priority';
import { calculateActvnEnglishBonus } from './bonus';
import { actvnExactFormulaEvidence, actvnFieldThresholdEvidence } from './evidence';

export interface ActvnSubjectContext {
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

const ACTVN_METHOD = actvnAdmissionMethods[0];

function actvnPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'actvn',
    year: ACTVN_METHOD.year,
    methodId: ACTVN_METHOD.id,
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
 * ACTVN 2026 — xét kết quả thi TN THPT (hệ kinh tế - xã hội). Điểm xét = tổng thô 3 môn theo tổ hợp
 * (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia, trường không tự công bố bảng riêng,
 * `priority.ts`). So với điểm chuẩn chính thức theo CHƯƠNG TRÌNH đã chọn — chỉ chấp nhận tổ hợp nằm
 * trong danh sách tổ hợp CHÍNH THỨC (`thresholds.ts`).
 */
export function evaluateActvnThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: ActvnSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'actvn-field', label: 'Chọn mã xét tuyển ACTVN để tra điểm chuẩn và tính Điểm xét.' });
    return actvnPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển ACTVN để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: ActvnFieldThreshold | undefined = ACTVN_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'actvn-field', label: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn ACTVN 2026 (chưa mô hình hoá).` });
    return actvnPartial({ missingRequirements, reason: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm chuẩn ACTVN 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'actvn-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return actvnPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'actvn-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return actvnPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `actvn-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return actvnPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét ACTVN.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupActvnStandardPriority30(profile.priority?.region, profile.priority?.category);
  const englishBonus = calculateActvnEnglishBonus(profile.certificates);
  const withBonus30 = round2(Math.min(30, raw30 + englishBonus.bonus30));
  const priority = calculateActvnEffectivePriority30({ rawTotal30: withBonus30, standardPriority30 });
  const finalScore = round2(Math.min(30, withBonus30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm cộng chứng chỉ Anh + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
    englishBonus.bonus30 > 0
      ? `Đã cộng ${englishBonus.bonus30} điểm chứng chỉ tiếng Anh (${englishBonus.source}); Học viện không cộng cho TOEFL iBT Home Edition — UniscoreVN không phân biệt được hình thức thi.`
      : 'Chưa có chứng chỉ tiếng Anh đạt ngưỡng cộng điểm của Học viện (IELTS >= 5,5 / TOEIC >= 650 / TOEFL iBT >= 65) — Điểm xét không có điểm cộng.',
  ];

  explanation.push({
    id: 'actvn-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: actvnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'actvn-exact-bonus',
    label: 'Điểm cộng chứng chỉ tiếng Anh',
    output: englishBonus.bonus30,
    scale: 30,
    formula: 'IELTS 5,5-6,0 / TOEIC 650-749 / TOEFL iBT 65-79: +0,5; IELTS 6,5-7,0 / TOEIC 750-849 / TOEFL iBT 80-94: +1; IELTS >= 7,5 / TOEIC >= 850 / TOEFL iBT >= 95: +1,5',
    evidence: actvnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'actvn-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − điểm xét đã gồm điểm cộng)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, trường không tự công bố bảng riêng)',
    evidence: actvnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'actvn-exact-final',
    label: 'Điểm xét (đã cộng điểm cộng và ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm cộng chứng chỉ Anh + Điểm ưu tiên',
    evidence: actvnExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'actvn-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: actvnFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'actvn-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'actvn',
    year: ACTVN_METHOD.year,
    methodId: ACTVN_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...actvnExactFormulaEvidence.evidence, ...actvnFieldThresholdEvidence.evidence],
  };
}
