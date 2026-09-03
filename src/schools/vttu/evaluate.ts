import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vttuAdmissionMethods } from './methods';
import { VTTU_FIELD_THRESHOLD_BY_CODE, type VttuFieldThreshold } from './thresholds';
import { lookupVttuStandardPriority30, calculateVttuEffectivePriority30 } from './priority';
import { vttuExactFormulaEvidence, vttuFieldThresholdEvidence } from './evidence';

export interface VttuSubjectContext {
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

const VTTU_METHOD = vttuAdmissionMethods[0];

function vttuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vttu',
    year: VTTU_METHOD.year,
    methodId: VTTU_METHOD.id,
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
 * VTTU 2025 — nhánh xét kết quả thi TN THPT (hoặc THPT quốc gia), mã xét tuyển 100/101. Điểm xét =
 * tổng thô 3 môn theo tổ hợp (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment
 * call, `priority.ts`). So với mức điểm nhận hồ sơ đã công bố theo NGÀNH đã chọn — chỉ chấp nhận tổ
 * hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`).
 */
export function evaluateVttuThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: VttuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vttu-field', label: 'Chọn ngành VTTU để tra mức điểm nhận hồ sơ và tính Điểm xét.' });
    return vttuPartial({ missingRequirements, reason: 'Cần chọn ngành VTTU để áp mức điểm nhận hồ sơ và tính Điểm xét.' });
  }
  const entry: VttuFieldThreshold | undefined = VTTU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vttu-field', label: `Ngành "${context.fieldCode}" không có trong bảng mức điểm nhận hồ sơ VTTU 2025 (chưa mô hình hoá).` });
    return vttuPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng mức điểm nhận hồ sơ VTTU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vttu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vttuPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vttu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vttuPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vttu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vttuPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét VTTU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupVttuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVttuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Mức điểm nhận hồ sơ ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt mức điểm nhận hồ sơ đã công bố chính thức năm 2025.' : 'Chưa đạt mức điểm nhận hồ sơ đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'vttu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vttuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vttu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành, judgment call)',
    evidence: vttuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vttu-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: vttuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vttu-exact-threshold',
    label: `Mức điểm nhận hồ sơ — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vttuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vttu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vttu',
    year: VTTU_METHOD.year,
    methodId: VTTU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vttuExactFormulaEvidence.evidence, ...vttuFieldThresholdEvidence.evidence],
  };
}
