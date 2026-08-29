import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { cmcuAdmissionMethods } from './methods';
import { CMCU_FIELD_THRESHOLD_BY_ID, type CmcuFieldId, type CmcuFieldThreshold } from './thresholds';
import { lookupCmcuStandardPriority30, calculateCmcuEffectivePriority40 } from './priority';
import { cmcuThptExactFormulaEvidence, cmcuFieldThresholdEvidence } from './evidence';

/**
 * Baseline (partial): kiểm tra thô tổng điểm "môn chính x2 + 2 môn bất kỳ" so với dải ngưỡng công
 * bố [20,00 - 22,00]/40 — KHÔNG chọn lĩnh vực/ngành cụ thể nên không kết luận chắc chắn ở giữa dải.
 */
export interface CmcuThptExamEvaluationContext {
  mainSubjectId?: SubjectId;
  otherSubjectIds?: readonly [SubjectId, SubjectId];
}

function readRaw40(profile: ApplicantProfile, mainSubjectId: SubjectId, otherSubjectIds: readonly [SubjectId, SubjectId]): { raw40?: number; missingSubjects: SubjectId[] } {
  const missingSubjects: SubjectId[] = [];
  const mainScore = profile.thpt?.scores?.[mainSubjectId];
  if (mainScore === undefined) missingSubjects.push(mainSubjectId);
  const otherScores = otherSubjectIds.map((subjectId) => {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    return score;
  });
  if (missingSubjects.length > 0) return { missingSubjects };
  const raw40 = round2(2 * (mainScore as number) + (otherScores[0] as number) + (otherScores[1] as number));
  return { raw40, missingSubjects };
}

export function evaluateCmcuThptExamAdmission(profile: ApplicantProfile, context: CmcuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = cmcuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  const MIN40 = 20;
  const MAX40 = 22;

  if (!context.mainSubjectId || !context.otherSubjectIds) {
    missingRequirements.push({ kind: 'school-context', code: 'cmcu-subject-combination', label: 'Chọn môn chính (nhân hệ số 2) và 2 môn bất kỳ cho tổ hợp xét tuyển CMCU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào CMCU.');
  } else {
    const { raw40, missingSubjects } = readRaw40(profile, context.mainSubjectId, context.otherSubjectIds);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `cmcu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp CMCU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng CMCU.');
    } else if (raw40 !== undefined) {
      explanation.push({
        id: 'cmcu-thpt-threshold',
        label: 'Tổng điểm thi TN THPT CMCU 2026 (môn chính x2 + 2 môn bất kỳ)',
        output: raw40,
        scale: 40,
        formula: `${SUBJECT_LABELS[context.mainSubjectId]} x 2 + ${SUBJECT_LABELS[context.otherSubjectIds[0]]} + ${SUBJECT_LABELS[context.otherSubjectIds[1]]}`,
        evidence: cmcuThptExactFormulaEvidence.evidence,
      });
      if (raw40 < MIN40) {
        status = 'ineligible';
        reasons.push(`Tổng ${raw40}/40 thấp hơn ngưỡng thấp nhất đã công bố (${MIN40}/40).`);
      } else if (raw40 < MAX40) {
        status = 'unknown';
        reasons.push(`Tổng ${raw40}/40 nằm giữa các mức ngưỡng đã công bố theo lĩnh vực/ngành (20,00-22,00/40) — cần chọn lĩnh vực/ngành cụ thể để kết luận chắc chắn.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${raw40}/40 đạt mức ngưỡng cao nhất đã công bố (${MAX40}/40).`);
      }
    }
  }

  return {
    schoolId: 'cmcu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...cmcuThptExactFormulaEvidence.evidence, ...cmcuFieldThresholdEvidence.evidence],
  };
}

const CMCU_EXACT_METHOD = cmcuAdmissionMethods[1];

export interface CmcuThptExamExactEvaluationContext {
  fieldId?: CmcuFieldId;
  mainSubjectId?: SubjectId;
  otherSubjectIds?: readonly [SubjectId, SubjectId];
}

function cmcuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'cmcu',
    year: CMCU_EXACT_METHOD.year,
    methodId: CMCU_EXACT_METHOD.id,
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
 * CMCU 2026 — nhánh exact. Điểm xét = môn chính (x2) + 2 môn bất kỳ (thang 40) + điểm ưu tiên KV/ĐT
 * (judgment call chuẩn quốc gia, quy đổi ×4/3 sang thang 40). Ngưỡng so với TỔNG THÔ (không cộng
 * ưu tiên) theo lĩnh vực/ngành đã chọn.
 */
export function evaluateCmcuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: CmcuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldId) {
    missingRequirements.push({ kind: 'school-context', code: 'cmcu-field', label: 'Chọn lĩnh vực/ngành CMCU để tra ngưỡng và tính Điểm xét.' });
    return cmcuExactPartial({ missingRequirements, reason: 'Cần chọn lĩnh vực/ngành CMCU để áp ngưỡng và tính Điểm xét.' });
  }
  const entry: CmcuFieldThreshold | undefined = CMCU_FIELD_THRESHOLD_BY_ID.get(context.fieldId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'cmcu-field', label: `Lĩnh vực/ngành "${context.fieldId}" không có trong bảng ngưỡng CMCU 2026.` });
    return cmcuExactPartial({ missingRequirements, reason: `Lĩnh vực/ngành "${context.fieldId}" không có trong bảng ngưỡng CMCU 2026.` });
  }
  if (!context.mainSubjectId || !context.otherSubjectIds) {
    missingRequirements.push({ kind: 'school-context', code: 'cmcu-subject-combination', label: `Chọn môn chính và 2 môn bất kỳ cho ${entry.fieldName}.` });
    return cmcuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
  }
  if (!entry.allowedMainSubjects.includes(context.mainSubjectId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'cmcu-main-subject-not-allowed',
      label: `Môn chính "${SUBJECT_LABELS[context.mainSubjectId]}" không hợp lệ cho ${entry.fieldName} (chỉ chấp nhận: ${entry.allowedMainSubjects.map((s) => SUBJECT_LABELS[s]).join(', ')}).`,
    });
    return cmcuExactPartial({ missingRequirements, reason: `Môn chính không hợp lệ cho ${entry.fieldName}.` });
  }

  const { raw40, missingSubjects } = readRaw40(profile, context.mainSubjectId, context.otherSubjectIds);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `cmcu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return cmcuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét CMCU.' });
  }
  const raw = raw40 as number;

  const standardPriority30 = lookupCmcuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateCmcuEffectivePriority40({ raw40: raw, standardPriority30 });
  const finalScore = round2(Math.min(40, raw + priority.effectivePriority40));

  const eligible = raw >= entry.threshold40;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm sàn nhận hồ sơ ${entry.fieldName}: môn chính x2 + 2 môn bất kỳ (không cộng ưu tiên) ≥ ${entry.threshold40}/40 — tổng của bạn = ${raw}/40.`,
    eligible ? 'Đạt điểm sàn nhận hồ sơ xét tuyển.' : 'Chưa đạt điểm sàn nhận hồ sơ xét tuyển.',
    `Điểm xét (gồm điểm ưu tiên, judgment call) = ${finalScore}/40.`,
  ];

  explanation.push({
    id: 'cmcu-exact-raw',
    label: 'Tổng điểm (thô, môn chính x2 + 2 môn bất kỳ)',
    output: raw,
    scale: 40,
    formula: `${SUBJECT_LABELS[context.mainSubjectId]} x 2 + ${SUBJECT_LABELS[context.otherSubjectIds[0]]} + ${SUBJECT_LABELS[context.otherSubjectIds[1]]}`,
    evidence: cmcuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'cmcu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm, quy đổi thang 40)' : 'Điểm ưu tiên (quy đổi thang 40)',
    output: priority.effectivePriority40,
    scale: 40,
    formula: 'Mức điểm ưu tiên KV/ĐT chuẩn quốc gia (thang 30, judgment call) × 4/3',
    evidence: cmcuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'cmcu-exact-final',
    label: 'Điểm xét',
    output: finalScore,
    scale: 40,
    formula: 'Tổng thô + Điểm ưu tiên (quy đổi thang 40)',
    evidence: cmcuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'cmcu-exact-threshold',
    label: `Điểm sàn nhận hồ sơ — ${entry.fieldName}`,
    output: entry.threshold40,
    scale: 40,
    formula: reasons[0],
    evidence: cmcuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'cmcu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'cmcu',
    year: CMCU_EXACT_METHOD.year,
    methodId: CMCU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 40 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...cmcuThptExactFormulaEvidence.evidence, ...cmcuFieldThresholdEvidence.evidence],
  };
}
