import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { tmuAdmissionMethods } from './methods';
import { lookupTmuStandardPriority30, calculateTmuEffectivePriority30 } from './priority';
import { tmuExactFormulaEvidence, tmuThresholdEvidence } from './evidence';

const METHOD = tmuAdmissionMethods[0];
const METHOD_ID = METHOD.id;
const YEAR = METHOD.year;

/** Ngưỡng đảm bảo chất lượng đầu vào TMU 2025 — DUY NHẤT, áp dụng cho toàn bộ ngành/tổ hợp, đã
 * gồm điểm ưu tiên (xem `sources.ts:tmu-threshold-2025`). */
export const TMU_THRESHOLD_30 = 20;

export interface TmuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface TmuThptExamEvaluationContext {
  subjectContext?: TmuSubjectContext;
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

function tmuPartial(input: { missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'tmu',
    year: YEAR,
    methodId: METHOD_ID,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * TMU 2025 — Điểm xét = tổng thô 3 môn theo tổ hợp đã chọn (KHÔNG nhân hệ số) + điểm ưu tiên KV/ĐT
 * (judgment call giá trị bảng, nguồn xác nhận CÓ cộng). Ngưỡng DUY NHẤT 20/30 so với TỔNG ĐÃ CỘNG
 * ưu tiên, áp dụng cho MỌI ngành/tổ hợp — không cần chọn ngành cụ thể.
 */
export function evaluateTmuThptExamAdmission(profile: ApplicantProfile, context: TmuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'tmu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển TMU.' });
    return tmuPartial({ missingRequirements, explanation, reason: 'Cần chọn tổ hợp môn để tính Điểm xét TMU.' });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `tmu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return tmuPartial({ missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét TMU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupTmuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTmuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= TMU_THRESHOLD_30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào TMU (mọi ngành/tổ hợp): tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${TMU_THRESHOLD_30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt ngưỡng, đủ điều kiện nộp hồ sơ xét tuyển.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.',
    'Đây là NGƯỠNG NHẬN HỒ SƠ / ĐIỂM SÀN (điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng.',
  ];

  explanation.push({
    id: 'tmu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: tmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tmu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: tmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tmu-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: tmuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'tmu-exact-threshold',
    label: 'Ngưỡng đảm bảo chất lượng đầu vào (mọi ngành)',
    output: TMU_THRESHOLD_30,
    scale: 30,
    formula: reasons[0],
    evidence: tmuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'tmu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'tmu',
    year: YEAR,
    methodId: METHOD_ID,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tmuExactFormulaEvidence.evidence, ...tmuThresholdEvidence.evidence],
  };
}
