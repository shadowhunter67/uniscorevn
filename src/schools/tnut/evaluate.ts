import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tnutAdmissionMethods } from './methods';
import { TNUT_FIELD_THRESHOLD_BY_CODE, type TnutFieldThreshold } from './thresholds';
import { lookupTnutStandardPriority30, calculateTnutEffectivePriority30 } from './priority';
import { tnutExactFormulaEvidence, tnutFieldThresholdEvidence } from './evidence';

export interface TnutSubjectContext {
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

const TNUT_METHOD = tnutAdmissionMethods[0];

function tnutPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tnut',
    year: TNUT_METHOD.year,
    methodId: TNUT_METHOD.id,
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
 * TNUT 2025 — phương thức xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ
 * số) + điểm ưu tiên KV/ĐT (khung quốc gia, `priority.ts`). So với điểm trúng tuyển chính thức theo
 * mã xét tuyển đã chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của mã đó
 * (`thresholds.ts`).
 */
export function evaluateTnutThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: TnutSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'tnut-field', label: 'Chọn ngành/mã xét tuyển TNUT để tra điểm trúng tuyển và tính Điểm xét tuyển.' });
    return tnutPartial({ missingRequirements, reason: 'Cần chọn ngành/mã xét tuyển TNUT để áp điểm trúng tuyển và tính Điểm xét tuyển.' });
  }
  const entry: TnutFieldThreshold | undefined = TNUT_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'tnut-field', label: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm trúng tuyển TNUT 2025 (chưa mô hình hoá).` });
    return tnutPartial({ missingRequirements, reason: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm trúng tuyển TNUT 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tnut-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return tnutPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'tnut-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return tnutPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tnut-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return tnutPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TNUT.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupTnutStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTnutEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'tnut-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tnutExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnut-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: tnutExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnut-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: tnutExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tnut-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: tnutFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tnut-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tnut',
    year: TNUT_METHOD.year,
    methodId: TNUT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tnutExactFormulaEvidence.evidence, ...tnutFieldThresholdEvidence.evidence],
  };
}
