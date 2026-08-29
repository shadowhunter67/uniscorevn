import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { houAdmissionMethods } from './methods';
import { HOU_FIELD_THRESHOLD_BY_ID, type HouFieldId, type HouFieldThreshold } from './thresholds';
import { lookupHouStandardPriority30, calculateHouEffectivePriority30 } from './priority';
import { houExactFormulaEvidence, houFieldThresholdEvidence } from './evidence';

export interface HouSubjectContext {
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

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn + điểm ưu tiên so với dải ngưỡng công bố
 * [17,00 - 20,00] (16 ngành đã mô hình hoá) — KHÔNG chọn ngành cụ thể nên không kết luận chắc chắn
 * ở giữa dải.
 */
export interface HouThptExamEvaluationContext {
  subjectContext?: HouSubjectContext;
}

export function evaluateHouThptExamAdmission(profile: ApplicantProfile, context: HouThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = houAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  const MIN30 = 17;
  const MAX30 = 20;

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hou-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HOU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HOU.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hou-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HOU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HOU.');
    } else if (total30 !== undefined) {
      const standardPriority30 = lookupHouStandardPriority30(profile.priority?.region, profile.priority?.category);
      const priority = calculateHouEffectivePriority30({ rawTotal30: total30, standardPriority30 });
      const totalWithPriority30 = round2(Math.min(30, total30 + priority.effectivePriority30));
      explanation.push({
        id: 'hou-thpt-threshold',
        label: 'Tổng điểm thi TN THPT + điểm ưu tiên HOU 2026',
        output: totalWithPriority30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn + điểm ưu tiên khu vực/đối tượng (khung quốc gia).',
        evidence: houExactFormulaEvidence.evidence,
      });
      if (totalWithPriority30 < MIN30) {
        status = 'ineligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) thấp hơn ngưỡng thấp nhất đã công bố (${MIN30}/30).`);
      } else if (totalWithPriority30 < MAX30) {
        status = 'unknown';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) nằm giữa các mức ngưỡng đã công bố theo ngành (17,00-20,00/30) — cần chọn ngành cụ thể để kết luận chắc chắn.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) đạt mức ngưỡng cao nhất đã công bố (${MAX30}/30).`);
      }
    }
  }

  return {
    schoolId: 'hou',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...houExactFormulaEvidence.evidence, ...houFieldThresholdEvidence.evidence],
  };
}

const HOU_EXACT_METHOD = houAdmissionMethods[1];

export interface HouThptExamExactEvaluationContext {
  fieldId?: HouFieldId;
  subjectContext?: HouSubjectContext;
}

function houExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hou',
    year: HOU_EXACT_METHOD.year,
    methodId: HOU_EXACT_METHOD.id,
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
 * HOU 2026 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số — 16 ngành mô hình hoá đều
 * dùng tổ hợp chuẩn) + điểm ưu tiên KV/ĐT (judgment call giá trị bảng, nguồn xác nhận CÓ cộng ưu
 * tiên). Ngưỡng so với TỔNG ĐÃ CỘNG ưu tiên (khác Phenikaa/AOF so với tổng thô) theo ngành đã chọn.
 */
export function evaluateHouThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HouThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldId) {
    missingRequirements.push({ kind: 'school-context', code: 'hou-field', label: 'Chọn ngành HOU để tra ngưỡng và tính Điểm xét.' });
    return houExactPartial({ missingRequirements, reason: 'Cần chọn ngành HOU để áp ngưỡng và tính Điểm xét.' });
  }
  const entry: HouFieldThreshold | undefined = HOU_FIELD_THRESHOLD_BY_ID.get(context.fieldId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hou-field', label: `Ngành "${context.fieldId}" không có trong bảng ngưỡng HOU 2026 (chưa mô hình hoá).` });
    return houExactPartial({ missingRequirements, reason: `Ngành "${context.fieldId}" không có trong bảng ngưỡng HOU 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hou-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
    return houExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hou-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return houExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HOU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHouStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHouEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng bảo đảm chất lượng đầu vào ${entry.fieldName}: tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${entry.threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt ngưỡng, đủ điều kiện đăng ký xét tuyển.' : 'Chưa đạt ngưỡng bảo đảm chất lượng đầu vào.',
    'Đây là NGƯỠNG NHẬN HỒ SƠ (điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng.',
  ];

  explanation.push({
    id: 'hou-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: houExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hou-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: houExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hou-exact-final',
    label: 'Tổng điểm (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: houExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hou-exact-threshold',
    label: `Ngưỡng bảo đảm chất lượng đầu vào — ${entry.fieldName}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: houFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hou-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — tổng đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hou',
    year: HOU_EXACT_METHOD.year,
    methodId: HOU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...houExactFormulaEvidence.evidence, ...houFieldThresholdEvidence.evidence],
  };
}
