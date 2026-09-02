import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hdiuAdmissionMethods } from './methods';
import { HDIU_FIELD_THRESHOLD_BY_ID, type HdiuFieldId, type HdiuFieldThreshold } from './thresholds';
import { lookupHdiuStandardPriority30, calculateHdiuEffectivePriority30 } from './priority';
import { hdiuExactFormulaEvidence, hdiuFieldThresholdEvidence } from './evidence';

export interface HdiuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

/** Làm tròn đến 0,25 — đúng nguyên văn Quyết định 129/QĐ-ĐHĐD ("được làm tròn đến 0,25"). */
function roundToQuarter(value: number): number {
  return Math.round(value * 4) / 4;
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
  return { total30: roundToQuarter(total), missingSubjects };
}

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn + điểm ưu tiên so với dải ngưỡng công bố
 * [14,00 - 19,00] (15 ngành đã mô hình hoá) — KHÔNG chọn ngành cụ thể nên không kết luận chắc chắn
 * ở giữa dải.
 */
export interface HdiuThptExamEvaluationContext {
  subjectContext?: HdiuSubjectContext;
}

export function evaluateHdiuThptExamAdmission(profile: ApplicantProfile, context: HdiuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hdiuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  const MIN30 = 14;
  const MAX30 = 19;

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hdiu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HDIU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HDIU.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hdiu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HDIU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HDIU.');
    } else if (total30 !== undefined) {
      const standardPriority30 = lookupHdiuStandardPriority30(profile.priority?.region, profile.priority?.category);
      const priority = calculateHdiuEffectivePriority30({ rawTotal30: total30, standardPriority30 });
      const totalWithPriority30 = round2(Math.min(30, total30 + priority.effectivePriority30));
      explanation.push({
        id: 'hdiu-thpt-threshold',
        label: 'Tổng điểm thi TN THPT + điểm ưu tiên HDIU 2025',
        output: totalWithPriority30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn (làm tròn 0,25) + điểm ưu tiên khu vực/đối tượng (khung quốc gia).',
        evidence: hdiuExactFormulaEvidence.evidence,
      });
      if (totalWithPriority30 < MIN30) {
        status = 'ineligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) thấp hơn ngưỡng thấp nhất đã công bố (${MIN30}/30).`);
      } else if (totalWithPriority30 < MAX30) {
        status = 'unknown';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) nằm giữa các mức ngưỡng đã công bố theo ngành (14,00-19,00/30) — cần chọn ngành cụ thể để kết luận chắc chắn.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) đạt mức ngưỡng cao nhất đã công bố (${MAX30}/30).`);
      }
    }
  }

  return {
    schoolId: 'hdiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...hdiuExactFormulaEvidence.evidence, ...hdiuFieldThresholdEvidence.evidence],
  };
}

const HDIU_EXACT_METHOD = hdiuAdmissionMethods[1];

export interface HdiuThptExamExactEvaluationContext {
  fieldId?: HdiuFieldId;
  subjectContext?: HdiuSubjectContext;
}

function hdiuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hdiu',
    year: HDIU_EXACT_METHOD.year,
    methodId: HDIU_EXACT_METHOD.id,
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
 * HDIU 2025 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số, làm tròn 0,25) + điểm ưu
 * tiên KV/ĐT (judgment call giá trị bảng, nguồn xác nhận CÓ cộng ưu tiên). Ngưỡng so với TỔNG ĐÃ
 * CỘNG ưu tiên theo ngành đã chọn.
 */
export function evaluateHdiuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HdiuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldId) {
    missingRequirements.push({ kind: 'school-context', code: 'hdiu-field', label: 'Chọn ngành HDIU để tra ngưỡng và tính Điểm xét.' });
    return hdiuExactPartial({ missingRequirements, reason: 'Cần chọn ngành HDIU để áp ngưỡng và tính Điểm xét.' });
  }
  const entry: HdiuFieldThreshold | undefined = HDIU_FIELD_THRESHOLD_BY_ID.get(context.fieldId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hdiu-field', label: `Ngành "${context.fieldId}" không có trong bảng ngưỡng HDIU 2025 (chưa mô hình hoá).` });
    return hdiuExactPartial({ missingRequirements, reason: `Ngành "${context.fieldId}" không có trong bảng ngưỡng HDIU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hdiu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
    return hdiuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hdiu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hdiuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HDIU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHdiuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHdiuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ${entry.fieldName}: tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${entry.threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt ngưỡng, đủ điều kiện nộp hồ sơ xét tuyển.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.',
    'Đây là NGƯỠNG NHẬN HỒ SƠ / ĐIỂM SÀN (điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng.',
  ];

  explanation.push({
    id: 'hdiu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, làm tròn 0,25)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hdiuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hdiu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: hdiuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hdiu-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: hdiuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hdiu-exact-threshold',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${entry.fieldName}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hdiuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hdiu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hdiu',
    year: HDIU_EXACT_METHOD.year,
    methodId: HDIU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hdiuExactFormulaEvidence.evidence, ...hdiuFieldThresholdEvidence.evidence],
  };
}
