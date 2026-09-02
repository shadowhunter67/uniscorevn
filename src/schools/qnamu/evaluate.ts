import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { qnamuAdmissionMethods } from './methods';
import { QNAMU_FIELD_THRESHOLD_BY_CODE, QNAMU_FIELD_THRESHOLDS_2025, type QnamuFieldThreshold } from './thresholds';
import { lookupQnamuStandardPriority30, calculateQnamuEffectivePriority30 } from './priority';
import { qnamuExactFormulaEvidence, qnamuFieldThresholdEvidence } from './evidence';

export interface QnamuSubjectContext {
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

const ALL_THRESHOLDS_30 = QNAMU_FIELD_THRESHOLDS_2025.flatMap((entry) => entry.combinations.map((c) => c.threshold30));
const MIN_THRESHOLD_30 = Math.min(...ALL_THRESHOLDS_30);
const MAX_THRESHOLD_30 = Math.max(...ALL_THRESHOLDS_30);

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn + điểm ưu tiên so với dải điểm chuẩn công bố
 * (23,00 - 26,27/30 trên 8 ngành đã mô hình hoá, mọi tổ hợp) — KHÔNG chọn ngành/tổ hợp cụ thể nên
 * không kết luận chắc chắn ở giữa dải.
 */
export interface QnamuThptExamEvaluationContext {
  subjectContext?: QnamuSubjectContext;
}

export function evaluateQnamuThptExamAdmission(profile: ApplicantProfile, context: QnamuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = qnamuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'qnamu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển QNamU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra điểm chuẩn QNamU.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `qnamu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp QNamU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra điểm chuẩn QNamU.');
    } else if (total30 !== undefined) {
      const standardPriority30 = lookupQnamuStandardPriority30(profile.priority?.region, profile.priority?.category);
      const priority = calculateQnamuEffectivePriority30({ rawTotal30: total30, standardPriority30 });
      const totalWithPriority30 = round2(Math.min(30, total30 + priority.effectivePriority30));
      explanation.push({
        id: 'qnamu-thpt-threshold',
        label: 'Tổng điểm thi TN THPT + điểm ưu tiên QNamU 2025',
        output: totalWithPriority30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn + điểm ưu tiên khu vực/đối tượng (khung quốc gia).',
        evidence: qnamuExactFormulaEvidence.evidence,
      });
      if (totalWithPriority30 < MIN_THRESHOLD_30) {
        status = 'ineligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) thấp hơn điểm chuẩn thấp nhất đã công bố (${MIN_THRESHOLD_30}/30, 8 ngành đã mô hình hoá).`);
      } else if (totalWithPriority30 < MAX_THRESHOLD_30) {
        status = 'unknown';
        reasons.push(
          `Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) nằm giữa các mức điểm chuẩn theo ngành/tổ hợp đã công bố (${MIN_THRESHOLD_30}-${MAX_THRESHOLD_30}/30) — cần chọn ngành cụ thể để kết luận chắc chắn.`
        );
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${totalWithPriority30}/30 (đã cộng ưu tiên) đạt mức điểm chuẩn cao nhất đã công bố (${MAX_THRESHOLD_30}/30, 8 ngành đã mô hình hoá).`);
      }
    }
  }

  return {
    schoolId: 'qnamu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...qnamuExactFormulaEvidence.evidence, ...qnamuFieldThresholdEvidence.evidence],
  };
}

const QNAMU_EXACT_METHOD = qnamuAdmissionMethods[1];

export interface QnamuThptExamExactEvaluationContext {
  fieldCode?: string;
  subjectContext?: QnamuSubjectContext;
}

function qnamuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'qnamu',
    year: QNAMU_EXACT_METHOD.year,
    methodId: QNAMU_EXACT_METHOD.id,
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
 * QNamU 2025 — nhánh exact. Điểm xét = tổng thô 3 môn (KHÔNG nhân hệ số) + điểm ưu tiên KV/ĐT
 * (judgment call giá trị bảng, công thức giảm dần xác nhận trực tiếp từ nguồn trường). So với điểm
 * chuẩn theo NGÀNH + TỔ HỢP đã chọn (nhánh thi TN THPT). Mỗi tổ hợp trong cùng 1 ngành có điểm
 * chuẩn RIÊNG (không dùng chung 1 mức cho cả ngành, giống QBU) — phải khớp đúng cặp (fieldCode,
 * combinationId) mới tra được threshold.
 */
export function evaluateQnamuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: QnamuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'qnamu-field', label: 'Chọn ngành QNamU để tra điểm chuẩn và tính Điểm xét.' });
    return qnamuExactPartial({ missingRequirements, reason: 'Cần chọn ngành QNamU để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: QnamuFieldThreshold | undefined = QNAMU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'qnamu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn QNamU 2025 (chưa mô hình hoá — chỉ 8 ngành).` });
    return qnamuExactPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn QNamU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'qnamu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return qnamuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  const combinationEntry = entry.combinations.find((c) => c.combinationId === context.subjectContext?.combinationId);
  if (!combinationEntry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'qnamu-subject-combination-not-in-list',
      label: `Tổ hợp đã chọn không thuộc danh sách đã xác minh cho ${entry.name} (${entry.combinations.map((c) => c.combinationId).join(', ')}).`,
    });
    return qnamuExactPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách đã xác minh cho ${entry.name} (${entry.combinations.map((c) => c.combinationId).join(', ')}).` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `qnamu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return qnamuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét QNamU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupQnamuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateQnamuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = combinationEntry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} — tổ hợp ${combinationEntry.combinationId} (nhánh thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];

  explanation.push({
    id: 'qnamu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: qnamuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'qnamu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call cho giá trị — công thức giảm xác nhận trực tiếp từ nguồn trường)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call cho giá trị)',
    evidence: qnamuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'qnamu-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: qnamuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'qnamu-exact-threshold',
    label: `Điểm chuẩn — ${entry.name} (${combinationEntry.combinationId})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: qnamuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'qnamu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'qnamu',
    year: QNAMU_EXACT_METHOD.year,
    methodId: QNAMU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...qnamuExactFormulaEvidence.evidence, ...qnamuFieldThresholdEvidence.evidence],
  };
}
