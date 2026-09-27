import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vnuisAdmissionMethods } from './methods';
import { VNUIS_FIELD_THRESHOLD_BY_CODE, type VnuisFieldThreshold } from './thresholds';
import { lookupVnuisStandardPriority30, calculateVnuisEffectivePriority30 } from './priority';
import { vnuisExactFormulaEvidence, vnuisFieldThresholdEvidence } from './evidence';

export interface VnuisSubjectContext {
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

const VNUIS_METHOD = vnuisAdmissionMethods[0];

function vnuisPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vnuis',
    year: VNUIS_METHOD.year,
    methodId: VNUIS_METHOD.id,
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
 * VNU-IS 2026 — xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) + điểm
 * ưu tiên KV/ĐT (bảng đầy đủ do trường tự công bố, `priority.ts`). So với điểm chuẩn chính thức theo
 * CHƯƠNG TRÌNH đã chọn — chỉ chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của chương trình
 * đó (`thresholds.ts`). 4 chương trình (QHQ04/08/10/12) yêu cầu điểm Toán >= 6,0/10 nếu dùng D01.
 * Điểm cộng thành tích (tối đa 5% thang điểm) KHÔNG mô hình hoá — xem knowledgeGaps.ts.
 */
export function evaluateVnuisThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: VnuisSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuis-field', label: 'Chọn chương trình VNU-IS để tra điểm chuẩn và tính Điểm xét.' });
    return vnuisPartial({ missingRequirements, reason: 'Cần chọn chương trình VNU-IS để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: VnuisFieldThreshold | undefined = VNUIS_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuis-field', label: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-IS 2026 (chưa mô hình hoá).` });
    return vnuisPartial({ missingRequirements, reason: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn VNU-IS 2026 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuis-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vnuisPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnuis-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vnuisPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuis-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vnuisPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét VNU-IS.' });
  }

  if (entry.d01MathFloor10 !== undefined && context.subjectContext.combinationId === 'D01') {
    const mathScore10 = profile.thpt?.scores?.math;
    if (mathScore10 === undefined) {
      missingRequirements.push({
        kind: 'profile-input',
        code: 'vnuis-d01-math-floor',
        label: `${entry.name} yêu cầu điểm Toán >= ${entry.d01MathFloor10}/10 khi dùng tổ hợp D01 — cần nhập điểm Toán.`,
      });
      return vnuisPartial({ missingRequirements, reason: `Cần điểm Toán để kiểm tra điều kiện phụ D01 của ${entry.name}.` });
    }
    if (mathScore10 < entry.d01MathFloor10) {
      return {
        schoolId: 'vnuis',
        year: VNUIS_METHOD.year,
        methodId: VNUIS_METHOD.id,
        confidence: 'exact-verified',
        eligibility: {
          status: 'ineligible',
          reasons: [`${entry.name} yêu cầu điểm Toán >= ${entry.d01MathFloor10}/10 khi dùng tổ hợp D01 — điểm Toán của bạn (${mathScore10}/10) chưa đạt điều kiện phụ này.`],
        },
        missingInputs: [],
        missingRules: [],
        missingRequirements: [],
        explanation: [],
        evidence: vnuisFieldThresholdEvidence.evidence,
      };
    }
  }

  const raw30 = total30 as number;

  const standardPriority30 = lookupVnuisStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnuisEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2026): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
  ];

  explanation.push({
    id: 'vnuis-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnuisExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuis-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (trường tự công bố nguyên văn, khớp khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (trường tự công bố nguyên văn, khớp khung quốc gia hiện hành)',
    evidence: vnuisExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuis-exact-final',
    label: 'Điểm xét (đã cộng ưu tiên, chưa gồm điểm cộng thành tích)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: vnuisExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuis-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vnuisFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vnuis-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vnuis',
    year: VNUIS_METHOD.year,
    methodId: VNUIS_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnuisExactFormulaEvidence.evidence, ...vnuisFieldThresholdEvidence.evidence],
  };
}
