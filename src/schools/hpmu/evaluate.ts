import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hpmuAdmissionMethods } from './methods';
import { HPMU_FIELD_THRESHOLD_BY_CODE, HPMU_FIELD_THRESHOLDS_2025, type HpmuFieldThreshold } from './thresholds';
import { lookupHpmuStandardPriority30, calculateHpmuEffectivePriority30 } from './priority';
import { hpmuExactFormulaEvidence, hpmuFieldThresholdEvidence } from './evidence';

export interface HpmuSubjectContext {
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

const MIN_THRESHOLD_30 = Math.min(...HPMU_FIELD_THRESHOLDS_2025.map((entry) => entry.threshold30));
const MAX_THRESHOLD_30 = Math.max(...HPMU_FIELD_THRESHOLDS_2025.map((entry) => entry.threshold30));

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn + điểm ưu tiên so với dải điểm chuẩn công bố
 * (19,35 - 25,33/30 trên 7 ngành) — KHÔNG chọn ngành cụ thể nên không kết luận chắc chắn ở giữa dải.
 */
export interface HpmuThptExamEvaluationContext {
  subjectContext?: HpmuSubjectContext;
}

export function evaluateHpmuThptExamAdmission(profile: ApplicantProfile, context: HpmuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hpmuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hpmu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HPMU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra điểm chuẩn HPMU.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hpmu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HPMU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra điểm chuẩn HPMU.');
    } else if (total30 !== undefined) {
      const standardPriority30 = lookupHpmuStandardPriority30(profile.priority?.region, profile.priority?.category);
      const priority = calculateHpmuEffectivePriority30({ rawTotal30: total30, standardPriority30 });
      const totalWithPriority30 = round2(Math.min(30, total30 + priority.effectivePriority30));
      explanation.push({
        id: 'hpmu-thpt-threshold',
        label: 'Tổng điểm thi TN THPT + điểm ưu tiên HPMU 2025',
        output: totalWithPriority30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn + điểm ưu tiên khu vực/đối tượng (khung quốc gia).',
        evidence: hpmuExactFormulaEvidence.evidence,
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
    schoolId: 'hpmu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...hpmuExactFormulaEvidence.evidence, ...hpmuFieldThresholdEvidence.evidence],
  };
}

const HPMU_EXACT_METHOD = hpmuAdmissionMethods[1];

export interface HpmuThptExamExactEvaluationContext {
  fieldCode?: string;
  subjectContext?: HpmuSubjectContext;
}

function hpmuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hpmu',
    year: HPMU_EXACT_METHOD.year,
    methodId: HPMU_EXACT_METHOD.id,
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
 * HPMU 2025 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số) + điểm ưu tiên KV/ĐT
 * (judgment call giá trị bảng, nguồn xác nhận TRỰC TIẾP CÓ cộng). So với điểm chuẩn theo ngành đã
 * chọn (nhánh thi TN THPT).
 */
export function evaluateHpmuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HpmuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hpmu-field', label: 'Chọn ngành HPMU để tra điểm chuẩn và tính Điểm xét.' });
    return hpmuExactPartial({ missingRequirements, reason: 'Cần chọn ngành HPMU để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: HpmuFieldThreshold | undefined = HPMU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hpmu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HPMU 2025 (chưa mô hình hoá).` });
    return hpmuExactPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn HPMU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hpmu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hpmuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hpmu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hpmuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét HPMU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHpmuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHpmuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (nhánh thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${entry.threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
    'Khi bằng điểm, trường ưu tiên thí sinh có điểm Toán cao hơn, sau đó điểm Hóa (tiêu chí phụ chưa mô hình hoá).',
  ];

  explanation.push({
    id: 'hpmu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hpmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpmu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: hpmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpmu-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: hpmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hpmu-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hpmuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hpmu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hpmu',
    year: HPMU_EXACT_METHOD.year,
    methodId: HPMU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hpmuExactFormulaEvidence.evidence, ...hpmuFieldThresholdEvidence.evidence],
  };
}
