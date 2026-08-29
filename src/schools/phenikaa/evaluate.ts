import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { phenikaaAdmissionMethods } from './methods';
import { PHENIKAA_FIELD_THRESHOLD_BY_ID, type PhenikaaFieldId, type PhenikaaFieldThreshold } from './thresholds';
import { lookupPhenikaaStandardPriority30, calculatePhenikaaEffectivePriority30 } from './priority';
import { phenikaaThptExactFormulaEvidence, phenikaaFieldThresholdEvidence } from './evidence';

export interface PhenikaaSubjectContext {
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
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn (không nhân hệ số) so với dải ngưỡng công bố
 * [15,00 - 24,00] — KHÔNG chọn lĩnh vực/ngành cụ thể nên không kết luận chắc chắn ở giữa dải.
 */
export interface PhenikaaThptExamEvaluationContext {
  subjectContext?: PhenikaaSubjectContext;
}

export function evaluatePhenikaaThptExamAdmission(profile: ApplicantProfile, context: PhenikaaThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = phenikaaAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  const MIN30 = 15;
  const MAX30 = 24;

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'phenikaa-subject-combination', label: 'Chọn tổ hợp môn xét tuyển Phenikaa.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào Phenikaa.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `phenikaa-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp Phenikaa.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng Phenikaa.');
    } else if (total30 !== undefined) {
      explanation.push({
        id: 'phenikaa-thpt-threshold',
        label: 'Tổng điểm thi TN THPT Phenikaa 2026 (không nhân hệ số)',
        output: total30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn, không nhân hệ số, không điểm cộng.',
        evidence: phenikaaThptExactFormulaEvidence.evidence,
      });
      if (total30 < MIN30) {
        status = 'ineligible';
        reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng thấp nhất đã công bố (${MIN30}/30).`);
      } else if (total30 < MAX30) {
        status = 'unknown';
        reasons.push(`Tổng ${total30}/30 nằm giữa các mức ngưỡng đã công bố theo lĩnh vực/ngành (15,00-24,00/30) — cần chọn lĩnh vực/ngành cụ thể để kết luận chắc chắn.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${total30}/30 đạt mức ngưỡng cao nhất đã công bố (${MAX30}/30).`);
      }
    }
  }

  return {
    schoolId: 'phenikaa',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...phenikaaThptExactFormulaEvidence.evidence, ...phenikaaFieldThresholdEvidence.evidence],
  };
}

const PHENIKAA_EXACT_METHOD = phenikaaAdmissionMethods[1];

export interface PhenikaaThptExamExactEvaluationContext {
  fieldId?: PhenikaaFieldId;
  subjectContext?: PhenikaaSubjectContext;
}

function phenikaaExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'phenikaa',
    year: PHENIKAA_EXACT_METHOD.year,
    methodId: PHENIKAA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

const TALENT_FIELDS: readonly PhenikaaFieldId[] = ['talent-cs', 'talent-semiconductor'];

/**
 * Phenikaa 2026 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số, KHÔNG điểm cộng) +
 * điểm ưu tiên KV/ĐT — trừ 2 CTĐT tài năng LOẠI TRỪ TUYỆT ĐỐI điểm ưu tiên (dữ liệu tự công bố,
 * không phải judgment call). Ngưỡng so với TỔNG THÔ (không cộng ưu tiên) theo lĩnh vực/ngành đã
 * chọn.
 */
export function evaluatePhenikaaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: PhenikaaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldId) {
    missingRequirements.push({ kind: 'school-context', code: 'phenikaa-field', label: 'Chọn lĩnh vực/ngành Phenikaa để tra ngưỡng và tính Điểm xét.' });
    return phenikaaExactPartial({ missingRequirements, reason: 'Cần chọn lĩnh vực/ngành Phenikaa để áp ngưỡng và tính Điểm xét.' });
  }
  const entry: PhenikaaFieldThreshold | undefined = PHENIKAA_FIELD_THRESHOLD_BY_ID.get(context.fieldId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'phenikaa-field', label: `Lĩnh vực/ngành "${context.fieldId}" không có trong bảng ngưỡng Phenikaa 2026.` });
    return phenikaaExactPartial({ missingRequirements, reason: `Lĩnh vực/ngành "${context.fieldId}" không có trong bảng ngưỡng Phenikaa 2026.` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'phenikaa-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
    return phenikaaExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.fieldName}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `phenikaa-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return phenikaaExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét Phenikaa.' });
  }
  const raw30 = total30 as number;
  const isTalent = TALENT_FIELDS.includes(entry.fieldId);

  const standardPriority30 = isTalent ? 0 : lookupPhenikaaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = isTalent
    ? { effectivePriority30: 0, reduced: false }
    : calculatePhenikaaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = raw30 >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng điểm nhận hồ sơ ${entry.fieldName}: tổng thô 3 môn (không nhân hệ số) ≥ ${entry.threshold30}/30 — tổng thô của bạn = ${raw30}/30.`,
    eligible ? 'Đạt ngưỡng điểm nhận hồ sơ xét tuyển.' : 'Chưa đạt ngưỡng điểm nhận hồ sơ xét tuyển.',
    isTalent
      ? 'CTĐT tài năng: không tính điểm cộng, điểm ưu tiên khu vực/đối tượng (dữ liệu tự công bố).'
      : `Điểm xét (gồm điểm ưu tiên, judgment call) = ${finalScore}/30.`,
  ];

  explanation.push({
    id: 'phenikaa-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: phenikaaThptExactFormulaEvidence.evidence,
  });
  if (!isTalent) {
    explanation.push({
      id: 'phenikaa-exact-priority',
      label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
      output: priority.effectivePriority30,
      scale: 30,
      formula: priority.reduced
        ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
        : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
      evidence: phenikaaThptExactFormulaEvidence.evidence,
    });
  }
  explanation.push({
    id: 'phenikaa-exact-final',
    label: 'Điểm xét',
    output: finalScore,
    scale: 30,
    formula: isTalent ? 'Tổng thô (không điểm ưu tiên/điểm cộng)' : 'Tổng thô + Điểm ưu tiên',
    evidence: phenikaaThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'phenikaa-exact-threshold',
    label: `Ngưỡng điểm nhận hồ sơ — ${entry.fieldName}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: phenikaaFieldThresholdEvidence.evidence,
  });

  if (!isTalent && profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'phenikaa-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'phenikaa',
    year: PHENIKAA_EXACT_METHOD.year,
    methodId: PHENIKAA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...phenikaaThptExactFormulaEvidence.evidence, ...phenikaaFieldThresholdEvidence.evidence],
  };
}
