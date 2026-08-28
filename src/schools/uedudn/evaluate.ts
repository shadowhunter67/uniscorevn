import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UEDUDN_THPT_THRESHOLD, UEDUDN_PROGRAM_GROUP_THRESHOLD_30, UEDUDN_PROGRAM_GROUP_LABELS, type UedudnProgramGroup } from './eligibility';
import { uedudnAdmissionMethods } from './methods';
import { calculateUedudnEffectivePriority30, lookupUedudnStandardPriority30 } from './priority';
import { uedudnThptExactFormulaEvidence } from './evidence';

export function evaluateUedudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uedudn',
    schoolShortName: 'UED',
    method: uedudnAdmissionMethods[0],
    profile,
    context,
    threshold: UEDUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uedudn-quality-threshold-2026',
  });
}

export interface UedudnSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface UedudnThptExamEvaluationContext {
  group?: UedudnProgramGroup;
  subjectContext?: UedudnSubjectContext;
}

const UEDUDN_EXACT_METHOD = uedudnAdmissionMethods[1];

/**
 * UED 2026 — nhánh exact, phương thức thi TN THPT (33/37 ngành công thức chuẩn). Ảnh chính thức
 * tuyensinh.ued.udn.vn xác nhận công thức "tổng 3 môn + điểm ưu tiên KV/ĐT" (tuyên bố trực tiếp)
 * và ngưỡng theo 3 mức. Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem
 * `priority.ts`).
 */
export function evaluateUedudnThptExamExactAdmission(
  profile: ApplicantProfile,
  context: UedudnThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: UedudnProgramGroup = context.group ?? 'tier15_5';

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'uedudn',
    year: UEDUDN_EXACT_METHOD.year,
    methodId: UEDUDN_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'uedudn-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển UED.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển UED.');
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
        code: `uedudn-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp UED.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = UEDUDN_PROGRAM_GROUP_THRESHOLD_30[group];
  const standardPriority30 = lookupUedudnStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUedudnEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào UED 2026 (ngành: ${UEDUDN_PROGRAM_GROUP_LABELS[group]}): tổng điểm 3 môn + điểm ưu tiên >= ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 -> tổng = ${total30}/30 -> ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'uedudn-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: uedudnThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uedudn-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: uedudnThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'uedudn-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: uedudnThptExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uedudn-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'uedudn',
    year: UEDUDN_EXACT_METHOD.year,
    methodId: UEDUDN_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: uedudnThptExactFormulaEvidence.evidence,
  };
}
