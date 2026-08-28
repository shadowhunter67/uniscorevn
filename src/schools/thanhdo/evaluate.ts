import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { THANHDO_THPT_THRESHOLD, THANHDO_PROGRAM_GROUP_THRESHOLD_30, THANHDO_PROGRAM_GROUP_LABELS, type ThanhdoProgramGroup } from './eligibility';
import { thanhdoAdmissionMethods } from './methods';
import { calculateThanhdoEffectivePriority30, lookupThanhdoStandardPriority30 } from './priority';
import { thanhdoThptExactFormulaEvidence, thanhdoNoBonusPointsEvidence } from './evidence';

export function evaluateThanhdoThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'thanhdo',
    schoolShortName: 'ThanhDo',
    method: thanhdoAdmissionMethods[0],
    profile,
    context,
    threshold: THANHDO_THPT_THRESHOLD,
    evidenceSourceId: 'thanhdo-cutoff-2026',
  });
}

export interface ThanhdoSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface ThanhdoThptExamEvaluationContext {
  group?: ThanhdoProgramGroup;
  subjectContext?: ThanhdoSubjectContext;
}

const THANHDO_EXACT_METHOD = thanhdoAdmissionMethods[1];

/**
 * ThanhDo 2026 — nhánh exact, phương thức thi TN THPT. Trang chính thức thanhdo.edu.vn xác nhận
 * công thức "tổng 3 môn, không nhân hệ số, không tính điểm cộng" và ngưỡng theo 14/14 ngành (6
 * mức). Điểm ưu tiên KV/ĐT là mức chuẩn toàn quốc (judgment call, xem `priority.ts`) — nguồn
 * KHÔNG loại trừ điểm ưu tiên (chỉ loại điểm cộng), đúng tiền lệ judgment-call khi nguồn im lặng
 * đúng 1 điểm trong khi xác nhận đầy đủ phần còn lại.
 */
export function evaluateThanhdoThptExamExactAdmission(
  profile: ApplicantProfile,
  context: ThanhdoThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: ThanhdoProgramGroup = context.group ?? 'tier16';

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'thanhdo',
    year: THANHDO_EXACT_METHOD.year,
    methodId: THANHDO_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'thanhdo-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển ThanhDo.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển ThanhDo.');
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
        code: `thanhdo-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp ThanhDo.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = THANHDO_PROGRAM_GROUP_THRESHOLD_30[group];
  const standardPriority30 = lookupThanhdoStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateThanhdoEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào ThanhDo 2026 (ngành: ${THANHDO_PROGRAM_GROUP_LABELS[group]}): tổng điểm (đã gồm điểm ưu tiên, không có điểm cộng) >= ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 -> tổng = ${total30}/30 -> ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'thanhdo-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: thanhdoThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'thanhdo-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: thanhdoThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'thanhdo-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên, không có điểm cộng)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: [...thanhdoThptExactFormulaEvidence.evidence, ...thanhdoNoBonusPointsEvidence.evidence],
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'thanhdo-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'thanhdo',
    year: THANHDO_EXACT_METHOD.year,
    methodId: THANHDO_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...thanhdoThptExactFormulaEvidence.evidence, ...thanhdoNoBonusPointsEvidence.evidence],
  };
}
