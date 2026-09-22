import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { pduAdmissionMethods } from './methods';
import { PDU_FIELD_THRESHOLD_BY_CODE, type PduFieldThreshold } from './thresholds';
import { lookupPduStandardPriority30, calculatePduEffectivePriority30 } from './priority';
import { pduExactFormulaEvidence, pduFieldThresholdEvidence } from './evidence';

export interface PduSubjectContext {
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

const PDU_METHOD = pduAdmissionMethods[0];

function pduPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'pdu',
    year: PDU_METHOD.year,
    methodId: PDU_METHOD.id,
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
 * PDU 2026 — Phương thức 1 (xét kết quả thi TN THPT). Tổng điểm xét tuyển = tổng thô 3 môn theo tổ
 * hợp (không hệ số) + điểm ưu tiên KV/ĐT (khung quốc gia, `priority.ts`). So với điểm trúng tuyển
 * chính thức đợt 1 theo NGÀNH đã chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC
 * của ngành đó (`thresholds.ts`). Ngành Giáo dục Mầm non (trình độ cao đẳng, tổ hợp năng khiếu)
 * KHÔNG có trong bảng — xem `knowledgeGaps.ts`.
 */
export function evaluatePduThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: PduSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'pdu-field', label: 'Chọn ngành PDU để tra điểm chuẩn và tính Tổng điểm xét tuyển.' });
    return pduPartial({ missingRequirements, reason: 'Cần chọn ngành PDU để áp điểm chuẩn và tính Tổng điểm xét tuyển.' });
  }
  const entry: PduFieldThreshold | undefined = PDU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'pdu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn PDU 2026 (chưa mô hình hoá).` });
    return pduPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn PDU 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'pdu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return pduPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'pdu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return pduPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `pdu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return pduPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Tổng điểm xét tuyển PDU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupPduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePduEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026, đợt 1): Tổng điểm xét tuyển >= ${threshold30}/30 — của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức đợt 1 năm 2026.',
  ];

  explanation.push({
    id: 'pdu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: pduExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pdu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên KV/ĐT (PDU công bố chính thức, dẫn chiếu TT 06/2026/TT-BGDĐT)'
      : 'Mức điểm ưu tiên KV/ĐT (PDU công bố chính thức, dẫn chiếu TT 06/2026/TT-BGDĐT)',
    evidence: pduExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pdu-exact-final',
    label: 'Tổng điểm xét tuyển (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'M1 + M2 + M3 + Tổng điểm ưu tiên',
    evidence: pduExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pdu-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: pduFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'pdu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Tổng điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'pdu',
    year: PDU_METHOD.year,
    methodId: PDU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pduExactFormulaEvidence.evidence, ...pduFieldThresholdEvidence.evidence],
  };
}
