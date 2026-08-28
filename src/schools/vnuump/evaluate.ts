import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VNUUMP_THPT_THRESHOLD } from './eligibility';
import { vnuumpAdmissionMethods } from './methods';
import { getVnuumpProgramThreshold, type VnuumpProgramId } from './thresholds';
import { calculateVnuumpEffectivePriority30, lookupVnuumpStandardPriority30 } from './priority';
import { vnuumpThptExactFormulaEvidence } from './evidence';

export function evaluateVnuumpThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vnuump',
    schoolShortName: 'VNU-UMP',
    method: vnuumpAdmissionMethods[0],
    profile,
    context,
    threshold: VNUUMP_THPT_THRESHOLD,
    evidenceSourceId: 'vnuump-admission-notice-2026',
  });
}

const VNUUMP_EXACT_METHOD = vnuumpAdmissionMethods[1];

export interface VnuumpThptExamExactEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: VnuumpProgramId;
}

/**
 * VNU-UMP 2026 — nhánh exact, phương thức thi TN THPT (96% chỉ tiêu), theo từng ngành. Thông báo
 * 2468/TB-ĐHYD mục 1 xác nhận bảng ngưỡng theo ngành (Y khoa/Răng-Hàm-Mặt 22,0; Dược học 20,0; Kỹ
 * thuật xét nghiệm/Kỹ thuật hình ảnh/Điều dưỡng 19,0), mức nêu cho thí sinh KV3 (không nhân hệ số,
 * không tính điểm cộng). Trang tuyển sinh chính thức xác nhận công thức chung CỘNG điểm ưu tiên
 * khu vực/đối tượng theo Điều 7 Quy chế của Bộ GD&ĐT vào tổng trước khi so ngưỡng — thí sinh KV3
 * có ưu tiên = 0 nên tổng = thô, khớp cách nêu ngưỡng. Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn
 * toàn quốc (judgment call, xem `priority.ts`). Điểm cộng KHÔNG tính vào ngưỡng (mục 1 xác nhận rõ
 * "không tính điểm cộng") — không model.
 */
export function evaluateVnuumpThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VnuumpThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'vnuump',
    year: VNUUMP_EXACT_METHOD.year,
    methodId: VNUUMP_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programId) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuump-exact-program', label: 'Chọn ngành xét tuyển VNU-UMP (Y khoa/Răng-Hàm-Mặt/Dược học/Kỹ thuật xét nghiệm/Kỹ thuật hình ảnh/Điều dưỡng).' });
    return partial('Cần chọn ngành để tính ngưỡng đầu vào VNU-UMP.');
  }
  const threshold = getVnuumpProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'official-rule', code: 'vnuump-exact-program-not-found', label: `Ngành ${context.programId} không có trong bảng ngưỡng VNU-UMP đã xác nhận.` });
    return partial(`Ngành ${context.programId} không có trong bảng ngưỡng VNU-UMP đã xác nhận.`);
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vnuump-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VNU-UMP.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển VNU-UMP.');
  }

  const subjects = context.subjectContext.subjects;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuump-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VNU-UMP.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupVnuumpStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnuumpEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold.min30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào VNU-UMP 2026, ngành ${threshold.programName}: tổng điểm (đã gồm điểm ưu tiên, không tính điểm cộng) ≥ ${threshold.min30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'vnuump-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnuumpThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuump-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: vnuumpThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnuump-exact-total',
    label: `Tổng điểm dùng để so ngưỡng ngành ${threshold.programName} (đã gồm ưu tiên, không tính điểm cộng)`,
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: vnuumpThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vnuump-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'vnuump',
    year: VNUUMP_EXACT_METHOD.year,
    methodId: VNUUMP_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: vnuumpThptExactFormulaEvidence.evidence,
  };
}
