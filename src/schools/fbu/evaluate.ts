import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FBU_THPT_THRESHOLD } from './eligibility';
import { fbuAdmissionMethods } from './methods';
import { calculateFbuEffectivePriority30, lookupFbuStandardPriority30 } from './priority';
import { calculateFbuBonus30 } from './bonus';
import { fbuThptExactFormulaEvidence } from './evidence';

export function evaluateFbuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fbu',
    schoolShortName: 'FBU',
    method: fbuAdmissionMethods[0],
    profile,
    context,
    threshold: FBU_THPT_THRESHOLD,
    evidenceSourceId: 'fbu-quality-threshold-2026',
  });
}

const FBU_EXACT_METHOD = fbuAdmissionMethods[1];
const FBU_EXACT_THRESHOLD_30 = 17;

/**
 * FBU 2026 — nhánh exact, Phương thức 1 (mã 100, xét kết quả thi TN THPT), nhóm ngành chung (KHÔNG
 * gồm Luật kinh tế). Quyết định 99/QĐ-ĐHTNH mục 2.1.2 xác nhận công thức:
 * Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn 3)/4] × 3 + ĐKK(nếu có) +
 * ĐXT(nếu có) + ĐƯT(nếu có), tối đa 30 điểm; mục 6.1.1 xác nhận ngưỡng 17,0/30.
 *
 * "Điểm môn 1" (Toán hoặc Ngữ văn, nhân hệ số 2) được xác định là môn XUẤT HIỆN TRƯỚC trong tên tổ
 * hợp như liệt kê ở mục 5.2 của chính văn bản (vd "Toán, Ngữ văn, Tiếng Anh" cho D01 → môn 1 =
 * Toán; "Ngữ văn, Toán, Lịch sử" cho C03 → môn 1 = Ngữ văn) — KHÔNG phải suy đoán, bám theo thứ tự
 * liệt kê thật trong bảng tổ hợp. Với các tổ hợp UniscoreVN hỗ trợ hiện tại (A00/A01/A02/B00/B08/
 * D01/D07 — xem `core/subjects.ts`), Toán luôn được liệt kê trước nên môn 1 = Toán.
 */
export interface FbuThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {}

export function evaluateFbuThptExamExactAdmission(profile: ApplicantProfile, context: FbuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'fbu',
    year: FBU_EXACT_METHOD.year,
    methodId: FBU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'fbu-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển FBU.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển FBU.');
  }

  const subjects = context.subjectContext.subjects;
  const weightedSubject: SubjectId | undefined = subjects.includes('math') ? 'math' : subjects.includes('literature') ? 'literature' : undefined;
  if (!weightedSubject) {
    missingRequirements.push({ kind: 'official-rule', code: 'fbu-exact-no-weighted-subject', label: 'Tổ hợp không có môn Toán hoặc Ngữ văn để xác định "Điểm môn 1" (nhân hệ số 2).' });
    return partial('Tổ hợp đã chọn không có môn Toán hoặc Ngữ văn — không xác định được "Điểm môn 1".');
  }

  const missingSubjects: SubjectId[] = [];
  const scores: Partial<Record<SubjectId, number>> = {};
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores[subjectId] = score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `fbu-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp FBU.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const otherSubjects = subjects.filter((s) => s !== weightedSubject);
  const weightedScore = scores[weightedSubject] ?? 0;
  const otherTotal = otherSubjects.reduce((sum, s) => sum + (scores[s] ?? 0), 0);
  const raw30 = round2(((weightedScore * 2 + otherTotal) / 4) * 3);

  const standardPriority30 = lookupFbuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateFbuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const bonus30 = calculateFbuBonus30({ ielts: profile.certificates?.ielts });
  const total30 = round2(Math.min(30, raw30 + priority.effectivePriority30 + bonus30));
  const eligible = total30 >= FBU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào FBU 2026 (PT1, nhóm ngành chung trừ Luật kinh tế): điểm xét tuyển (gồm điểm ưu tiên + điểm cộng, tối đa 30) ≥ ${FBU_EXACT_THRESHOLD_30}/30.`,
    `Điểm xét tuyển thô = ${raw30}/30 (môn ${SUBJECT_LABELS[weightedSubject]} nhân hệ số 2), điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30, điểm cộng (IELTS) = ${bonus30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'fbu-exact-raw',
    label: 'Điểm xét tuyển thô (môn 1 nhân hệ số 2)',
    output: raw30,
    scale: 30,
    formula: `[((${SUBJECT_LABELS[weightedSubject]} × 2) + ${otherSubjects.map((s) => SUBJECT_LABELS[s]).join(' + ')})/4] × 3`,
    evidence: fbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'fbu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − điểm xét tuyển thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: fbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'fbu-exact-bonus',
    label: 'Điểm cộng (IELTS)',
    output: bonus30,
    scale: 30,
    formula: 'Bảng 2.1 mục 2.1.1 (giải HSG cấp tỉnh/thành mục Bảng 2.2 chưa model, thiếu input field)',
    evidence: fbuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'fbu-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên + điểm cộng, tối đa 30)',
    output: total30,
    scale: 30,
    formula: 'min(30, round2(điểm xét tuyển thô + điểm ưu tiên hiệu lực + điểm cộng))',
    evidence: fbuThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'fbu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'fbu',
    year: FBU_EXACT_METHOD.year,
    methodId: FBU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: fbuThptExactFormulaEvidence.evidence,
  };
}
