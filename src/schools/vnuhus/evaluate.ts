import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vnuhusAdmissionMethods } from './methods';
import { VNUHUS_FIELD_THRESHOLD_BY_CODE, VNUHUS_FIELD_THRESHOLDS_2025, type VnuhusFieldThreshold } from './thresholds';
import { lookupVnuhusStandardPriority30, calculateVnuhusEffectivePriority30 } from './priority';
import { vnuhusExactFormulaEvidence, vnuhusFieldThresholdEvidence } from './evidence';

export interface VnuhusSubjectContext {
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

const MIN_THRESHOLD_30 = Math.min(...VNUHUS_FIELD_THRESHOLDS_2025.map((entry) => entry.threshold30));
const MAX_THRESHOLD_30 = Math.max(...VNUHUS_FIELD_THRESHOLDS_2025.map((entry) => entry.threshold30));

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn + điểm ưu tiên so với dải điểm chuẩn công bố
 * (22 - 28,19/30 trên 20 ngành đã mô hình hoá) — KHÔNG chọn ngành cụ thể nên không kết luận chắc
 * chắn ở giữa dải.
 */
export interface VnuhusThptExamEvaluationContext {
  subjectContext?: VnuhusSubjectContext;
}

export function evaluateVnuhusThptExamAdmission(profile: ApplicantProfile, context: VnuhusThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vnuhusAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhus-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VNU-HUS.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra điểm chuẩn VNU-HUS.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vnuhus-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VNU-HUS.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra điểm chuẩn VNU-HUS.');
    } else if (total30 !== undefined) {
      const standardPriority30 = lookupVnuhusStandardPriority30(profile.priority?.region, profile.priority?.category);
      const priority = calculateVnuhusEffectivePriority30({ rawTotal30: total30, standardPriority30 });
      const totalWithPriority30 = round2(Math.min(30, total30 + priority.effectivePriority30));
      explanation.push({
        id: 'vnuhus-thpt-threshold',
        label: 'Tổng điểm thi TN THPT + điểm ưu tiên VNU-HUS 2025',
        output: totalWithPriority30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn + điểm ưu tiên khu vực/đối tượng (khung quốc gia).',
        evidence: vnuhusExactFormulaEvidence.evidence,
      });
      if (totalWithPriority30 < MIN_THRESHOLD_30) {
        status = 'ineligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) thấp hơn điểm chuẩn thấp nhất đã công bố (${MIN_THRESHOLD_30}/30).`);
      } else if (totalWithPriority30 < MAX_THRESHOLD_30) {
        status = 'unknown';
        reasons.push(
          `Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) nằm giữa các mức điểm chuẩn theo ngành đã công bố (${MIN_THRESHOLD_30}-${MAX_THRESHOLD_30}/30) — cần chọn ngành cụ thể để kết luận chắc chắn.`
        );
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) đạt mức điểm chuẩn cao nhất đã công bố (${MAX_THRESHOLD_30}/30).`);
      }
    }
  }

  return {
    schoolId: 'vnuhus',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...vnuhusExactFormulaEvidence.evidence, ...vnuhusFieldThresholdEvidence.evidence],
  };
}

const VNUHUS_EXACT_METHOD = vnuhusAdmissionMethods[1];

export interface VnuhusThptExamExactEvaluationContext {
  fieldCode?: string;
  subjectContext?: VnuhusSubjectContext;
}

function vnuhusExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vnuhus',
    year: VNUHUS_EXACT_METHOD.year,
    methodId: VNUHUS_EXACT_METHOD.id,
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
 * VNU-HUS 2025 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số) + điểm ưu tiên KV/ĐT
 * (judgment call giá trị bảng, nguồn xác nhận TRỰC TIẾP CÓ cộng). So với điểm chuẩn theo ngành đã
 * chọn (nhánh thi TN THPT) — điểm chuẩn GIỐNG NHAU giữa mọi tổ hợp trong 1 ngành (khác VNU-UED).
 */
export function evaluateVnuhusThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VnuhusThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhus-field', label: 'Chọn ngành VNU-HUS để tra điểm chuẩn và tính Điểm xét.' });
    return vnuhusExactPartial({ missingRequirements, reason: 'Cần chọn ngành VNU-HUS để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: VnuhusFieldThreshold | undefined = VNUHUS_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhus-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-HUS 2025 (chưa mô hình hoá).` });
    return vnuhusExactPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-HUS 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuhus-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vnuhusExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!entry.combinationIds.includes(context.subjectContext.combinationId ?? '')) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnuhus-subject-combination-not-in-list',
      label: `Tổ hợp đã chọn không thuộc danh sách hỗ trợ cho ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vnuhusExactPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách hỗ trợ cho ${entry.name} (${entry.combinationIds.join(', ')}).` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuhus-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vnuhusExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét VNU-HUS.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupVnuhusStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnuhusEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (nhánh thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${entry.threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];

  explanation.push({
    id: 'vnuhus-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnuhusExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhus-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: vnuhusExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhus-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: vnuhusExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuhus-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vnuhusFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vnuhus-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vnuhus',
    year: VNUHUS_EXACT_METHOD.year,
    methodId: VNUHUS_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnuhusExactFormulaEvidence.evidence, ...vnuhusFieldThresholdEvidence.evidence],
  };
}
