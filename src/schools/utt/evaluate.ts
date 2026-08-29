import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTT_THPT_THRESHOLD } from './eligibility';
import { uttAdmissionMethods } from './methods';
import { UTT_THRESHOLD_BY_CODE, type UttProgramThreshold } from './thresholds';
import { lookupUttStandardPriority30, calculateUttEffectivePriority30 } from './priority';
import { uttThptExactFormulaEvidence, uttPerMajorThresholdEvidence } from './evidence';

export function evaluateUttAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'utt',
    schoolShortName: 'UTT',
    method: uttAdmissionMethods[0],
    profile,
    context,
    threshold: UTT_THPT_THRESHOLD,
    evidenceSourceId: 'utt-threshold-2026',
  });
}

export interface UttSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface UttThptExamExactEvaluationContext {
  /** Mã xét tuyển UTT (vd 'GTADCTT2', 'GTADCLA2'). */
  programCode?: string;
  subjectContext?: UttSubjectContext;
}

const UTT_EXACT_METHOD = uttAdmissionMethods[1];

function uttExactPartial(input: {
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'utt',
    year: UTT_EXACT_METHOD.year,
    methodId: UTT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs ?? [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: input.explanation ?? [],
    evidence: [],
  };
}

/**
 * UTT 2026 — nhánh exact, phương thức xét điểm thi TN THPT, tính đủ Điểm xét tuyển theo mã xét
 * tuyển: ĐXT = round2(tổng thô 3 môn tổ hợp + điểm ưu tiên KV/ĐT). Ngưỡng đảm bảo chất lượng đầu
 * vào theo mã xét tuyển (`thresholds.ts`) ĐÃ BAO GỒM điểm ưu tiên (xác nhận trực tiếp từ nguồn) —
 * so ngưỡng với ĐXT (không phải tổng thô, khác CTU/UTM).
 */
export function evaluateUttThptExamExactAdmission(
  profile: ApplicantProfile,
  context: UttThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'utt-program-code', label: 'Chọn mã xét tuyển UTT để tra điểm sàn theo ngành.' });
    return uttExactPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển UTT để áp điểm sàn và tính Điểm xét tuyển.' });
  }

  const entry: UttProgramThreshold | undefined = UTT_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'utt-program-code', label: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn UTT 2026.` });
    return uttExactPartial({ missingRequirements, reason: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn UTT 2026.` });
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'utt-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
    return uttExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
  }

  const { subjects } = context.subjectContext;
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
        code: `utt-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return uttExactPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển UTT.',
    });
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupUttStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUttEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(raw30 + priority.effectivePriority30);

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ngành ${entry.name} (${entry.code}): Điểm xét tuyển (đã gồm điểm ưu tiên) ≥ ${entry.threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30.`,
  ];
  if (entry.additionalMoetConditionNote) reasons.push(entry.additionalMoetConditionNote);
  reasons.push(eligible ? 'Đạt ngưỡng đảm bảo chất lượng đầu vào.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.');

  explanation.push({
    id: 'utt-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: uttThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'utt-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 08/2022/TT-BGDĐT, judgment call)',
    evidence: uttThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'utt-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn (thô) + Điểm ưu tiên',
    evidence: uttThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'utt-exact-threshold',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: uttPerMajorThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'utt-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'utt',
    year: UTT_EXACT_METHOD.year,
    methodId: UTT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...uttThptExactFormulaEvidence.evidence, ...uttPerMajorThresholdEvidence.evidence],
  };
}
