import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tuebaAdmissionMethods } from './methods';
import { TUEBA_FIELD_THRESHOLD_BY_CODE, type TuebaFieldThreshold } from './thresholds';
import { lookupTuebaStandardPriority30, calculateTuebaEffectivePriority30 } from './priority';
import { tuebaExactFormulaEvidence, tuebaFieldThresholdEvidence } from './evidence';

export interface TuebaSubjectContext {
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

const TUEBA_METHOD = tuebaAdmissionMethods[0];

function tuebaPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tueba',
    year: TUEBA_METHOD.year,
    methodId: TUEBA_METHOD.id,
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
 * TUEBA 2026 — phương thức xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không
 * hệ số) + điểm ưu tiên KV/ĐT (judgment call giá trị bảng). So với ngưỡng đảm bảo chất lượng đầu
 * vào theo NGÀNH đã chọn — ngưỡng áp dụng chung cho mọi tổ hợp hợp lệ của ngành đó (giống PCTU).
 */
export function evaluateTuebaThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: TuebaSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'tueba-field', label: 'Chọn ngành TUEBA để tra ngưỡng đầu vào và tính Điểm xét tuyển.' });
    return tuebaPartial({ missingRequirements, reason: 'Cần chọn ngành TUEBA để áp ngưỡng và tính Điểm xét tuyển.' });
  }
  const entry: TuebaFieldThreshold | undefined = TUEBA_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'tueba-field', label: `Ngành "${context.fieldCode}" không có trong bảng ngưỡng TUEBA 2026 (chưa mô hình hoá).` });
    return tuebaPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng ngưỡng TUEBA 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tueba-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return tuebaPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tueba-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return tuebaPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TUEBA.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupTuebaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTuebaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt ngưỡng đầu vào, đủ điều kiện nộp hồ sơ xét tuyển (điểm chuẩn trúng tuyển thực tế công bố riêng, có thể cao hơn).' : 'Chưa đạt ngưỡng đầu vào đã công bố.',
  ];

  explanation.push({
    id: 'tueba-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tuebaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tueba-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: tuebaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tueba-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: tuebaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tueba-exact-threshold',
    label: `Ngưỡng đầu vào — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: tuebaFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tueba-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tueba',
    year: TUEBA_METHOD.year,
    methodId: TUEBA_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tuebaExactFormulaEvidence.evidence, ...tuebaFieldThresholdEvidence.evidence],
  };
}
