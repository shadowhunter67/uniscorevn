import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { dsuAdmissionMethods } from './methods';
import { DSU_FIELD_THRESHOLD_BY_CODE, type DsuFieldThreshold } from './thresholds';
import { lookupDsuStandardPriority30, calculateDsuEffectivePriority30 } from './priority';
import { dsuExactFormulaEvidence, dsuFieldThresholdEvidence } from './evidence';

export interface DsuSubjectContext {
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

const DSU_METHOD = dsuAdmissionMethods[0];

function dsuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'dsu',
    year: DSU_METHOD.year,
    methodId: DSU_METHOD.id,
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
 * DSU 2025 — Phương thức mã 100 (xét kết quả điểm thi tốt nghiệp THPT, chỉ ngành Quản lý TDTT —
 * 7810301). Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) + điểm ưu tiên KV/ĐT (Điều 7 Quy chế
 * tuyển sinh, `priority.ts`). So với điểm trúng tuyển chính thức 21,50/30 (Quyết định
 * 1088/QĐ-TDTTĐN-HĐTS) — chỉ chấp nhận tổ hợp B03/C14 (`thresholds.ts`).
 */
export function evaluateDsuThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: DsuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'dsu-field', label: 'Chọn ngành DSU để tra điểm trúng tuyển và tính Điểm xét tuyển.' });
    return dsuPartial({ missingRequirements, reason: 'Cần chọn ngành DSU để áp điểm trúng tuyển và tính Điểm xét tuyển.' });
  }
  const entry: DsuFieldThreshold | undefined = DSU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'dsu-field',
      label: `Ngành "${context.fieldCode}" chưa mô hình hoá cho Phương thức 100 của DSU (chỉ có Quản lý TDTT — 7810301; Huấn luyện thể thao/Giáo dục thể chất cần điểm thi năng khiếu, chưa mô hình hoá).`,
    });
    return dsuPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" chưa mô hình hoá cho Phương thức 100 của DSU.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dsu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return dsuPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'dsu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return dsuPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `dsu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return dsuPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển DSU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupDsuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDsuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (Phương thức 100 — điểm thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'dsu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: dsuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dsu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (Điều 7 Quy chế tuyển sinh)'
      : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Quy chế tuyển sinh)',
    evidence: dsuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dsu-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: dsuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'dsu-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: dsuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'dsu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'dsu',
    year: DSU_METHOD.year,
    methodId: DSU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...dsuExactFormulaEvidence.evidence, ...dsuFieldThresholdEvidence.evidence],
  };
}
