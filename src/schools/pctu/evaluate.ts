import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { pctuAdmissionMethods } from './methods';
import { PCTU_FIELD_THRESHOLD_BY_CODE, type PctuFieldThreshold } from './thresholds';
import { lookupPctuStandardPriority30, calculatePctuEffectivePriority30 } from './priority';
import { pctuExactFormulaEvidence, pctuFieldThresholdEvidence } from './evidence';

export interface PctuSubjectContext {
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

const PCTU_EXACT_METHOD = pctuAdmissionMethods[0];

function pctuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'pctu',
    year: PCTU_EXACT_METHOD.year,
    methodId: PCTU_EXACT_METHOD.id,
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
 * PCTU 2025 — nhánh exact (PT2, xét điểm thi TN THPT thuần). Điểm xét = tổng thô 3 môn (không nhân
 * hệ số) + điểm ưu tiên KV/ĐT (judgment call giá trị bảng). So với điểm chuẩn theo NGÀNH đã chọn —
 * threshold ÁP DỤNG CHUNG cho mọi tổ hợp hợp lệ của ngành đó (khác HUC, mỗi tổ hợp 1 mức riêng).
 */
export function evaluatePctuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: PctuSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'pctu-field', label: 'Chọn ngành PCTU để tra điểm chuẩn và tính Điểm xét.' });
    return pctuExactPartial({ missingRequirements, reason: 'Cần chọn ngành PCTU để áp điểm chuẩn và tính Điểm xét.' });
  }
  const entry: PctuFieldThreshold | undefined = PCTU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'pctu-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn PCTU 2025 (chưa mô hình hoá — chỉ 6 ngành).` });
    return pctuExactPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm chuẩn PCTU 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'pctu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return pctuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'pctu-subject-combination-not-in-list',
      label: `Tổ hợp đã chọn không thuộc danh sách đã xác minh cho ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return pctuExactPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách đã xác minh cho ${entry.name} (${entry.combinationIds.join(', ')}).` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `pctu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return pctuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét PCTU.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupPctuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePctuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (PT2, nhánh thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];
  if (entry.code === '7720101' || entry.code === '7720501') {
    reasons.push('Lưu ý: ngành Y khoa/Răng-Hàm-Mặt còn yêu cầu tiêu chí phụ "đã học môn Sinh học ở phổ thông" (chưa kiểm tra được qua UniscoreVN).');
  }

  explanation.push({
    id: 'pctu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: pctuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pctu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: pctuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pctu-exact-final',
    label: 'Điểm xét (ĐM1 + ĐM2 + ĐM3 + Điểm ƯT)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: pctuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pctu-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: pctuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'pctu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'pctu',
    year: PCTU_EXACT_METHOD.year,
    methodId: PCTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pctuExactFormulaEvidence.evidence, ...pctuFieldThresholdEvidence.evidence],
  };
}
