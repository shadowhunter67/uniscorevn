import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { MDU_THPT_THRESHOLD } from './eligibility';
import { mduAdmissionMethods } from './methods';
import { MDU_PROGRAM_BY_CODE, MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026 } from './thresholds';
import { calculateMduEffectivePriority30, lookupMduStandardPriority30 } from './priority';
import { mduThptExamExactEvidence } from './evidence';

export function evaluateMduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'mdu',
    schoolShortName: 'MDU/MIT',
    method: mduAdmissionMethods[0],
    profile,
    context,
    threshold: MDU_THPT_THRESHOLD,
    evidenceSourceId: 'mdu-admission-methods-2026',
  });
}

const MDU_EXACT_METHOD = mduAdmissionMethods[1];

export interface MduThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

export function evaluateMduThptExamExactAdmission(
  profile: ApplicantProfile,
  context: MduThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'mdu',
    year: MDU_EXACT_METHOD.year,
    methodId: MDU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = context.programCode ? MDU_PROGRAM_BY_CODE[context.programCode] : undefined;
  if (!program) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'mdu-program-code',
      label: `Chọn ngành MDU/MIT (${MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026.length} ngành trong phạm vi exact).`,
    });
    return partial('Cần chọn ngành MDU/MIT để áp ngưỡng điểm chuẩn.');
  }
  if (program.outOfScopeReason) {
    missingRequirements.push({ kind: 'official-rule', code: 'mdu-program-out-of-exact-scope', label: program.outOfScopeReason });
    return partial(`Ngành ${program.name} của MDU/MIT chưa năm trong phạm vi exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'mdu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển MDU/MIT.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét tuyển MDU/MIT.');
  }
  if (!context.subjectContext.combinationId || !program.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'mdu-combination-not-modeled',
      label: `Tổ hợp chưa được hỗ trợ cho ngành ${program.name} (hỗ trợ: ${program.combinationIds.join(', ')}).`,
    });
    return partial('Tổ hợp đã chọn không nằm trong danh sách tổ hợp của ngành MDU/MIT này.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const subjectId of context.subjectContext.subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  if (missing.length > 0) {
    missingRequirements.push(
      ...missing.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `mdu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp MDU/MIT.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét tuyển MDU/MIT.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupMduStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateMduEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= program.threshold30;

  const reasons = [
    `Điểm chuẩn MDU/MIT 2026 (thi TN THPT, ${program.name}): tổng thô 3 môn >= ${program.threshold30}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 -> ${eligible ? 'dat' : 'chưa đạt'} ngưỡng. Điểm xét tham khảo (tho + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({
    id: 'mdu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: mduThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'mdu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 - tổng thô)/7,5] × Mức ưu tiên KV/ĐT (TT 06/2026)' : 'Mức ưu tiên KV/ĐT (TT 06/2026)',
    evidence: mduThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'mdu-exact-dxt',
    label: 'Điểm xét tham khảo (không dùng để so ngưỡng)',
    output: dxt30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên)',
    evidence: mduThptExamExactEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'mdu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập - điểm xét tham khảo đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'mdu',
    year: MDU_EXACT_METHOD.year,
    methodId: MDU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...mduThptExamExactEvidence.evidence],
  };
}
