import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HAUI_THPT_THRESHOLD } from './eligibility';
import { hauiAdmissionMethods } from './methods';
import { HAUI_THRESHOLD_BY_CODE, type HauiProgramThreshold } from './thresholds';
import { lookupHauiStandardPriority30, calculateHauiEffectivePriority30 } from './priority';
import { hauiThptExactFormulaEvidence, hauiPerMajorThresholdEvidence } from './evidence';

export function evaluateHauiAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'haui',
    schoolShortName: 'HAUI',
    method: hauiAdmissionMethods[0],
    profile,
    context,
    threshold: HAUI_THPT_THRESHOLD,
    evidenceSourceId: 'haui-threshold-2026',
  });
}

export interface HauiSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HauiThptExamExactEvaluationContext {
  /** Mã xét tuyển HAUI (vd '7480201'). */
  programCode?: string;
  subjectContext?: HauiSubjectContext;
}

const HAUI_EXACT_METHOD = hauiAdmissionMethods[1];

function hauiExactPartial(input: {
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'haui',
    year: HAUI_EXACT_METHOD.year,
    methodId: HAUI_EXACT_METHOD.id,
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
 * HAUI 2026 — nhánh exact, phương thức 3 (thi TN THPT), tính Điểm xét tuyển theo mã xét tuyển:
 * ĐXT = tổng thô 3 môn tổ hợp + điểm ưu tiên KV/ĐT (judgment call). Mức điểm điều kiện đăng ký xét
 * tuyển theo mã xét tuyển (`thresholds.ts`) so với TỔNG THÔ (nguồn im lặng về điểm ưu tiên ở mục
 * này, khác UTT).
 */
export function evaluateHauiThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HauiThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'haui-program-code', label: 'Chọn mã xét tuyển HAUI để tra điểm sàn.' });
    return hauiExactPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển HAUI để áp điểm sàn và tính Điểm xét tuyển.' });
  }

  const entry: HauiProgramThreshold | undefined = HAUI_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'haui-program-code', label: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn HAUI 2026.` });
    return hauiExactPartial({ missingRequirements, reason: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn HAUI 2026.` });
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'haui-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
    return hauiExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
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
        code: `haui-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hauiExactPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HAUI.',
    });
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHauiStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHauiEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(raw30 + priority.effectivePriority30);

  const eligible = raw30 >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Mức điểm điều kiện đăng ký xét tuyển ngành ${entry.name} (${entry.code}): tổng thô 3 môn ≥ ${entry.threshold30}/30 — tổng thô của bạn = ${raw30}/30.`,
  ];
  if (entry.provisional) reasons.push('Mức điểm này ghi "dự kiến*" trong nguồn — mức chính thức chờ hướng dẫn Bộ GD&ĐT.');
  reasons.push(eligible ? 'Đạt ngưỡng đảm bảo chất lượng đầu vào.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.');
  reasons.push(`Điểm xét tuyển (gồm điểm ưu tiên, judgment call) = ${finalScore}/30.`);

  explanation.push({
    id: 'haui-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hauiThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'haui-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 08/2022/TT-BGDĐT, judgment call)',
    evidence: hauiThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'haui-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn (thô) + Điểm ưu tiên',
    evidence: hauiThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'haui-exact-threshold',
    label: `Mức điểm điều kiện đăng ký xét tuyển — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hauiPerMajorThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'haui-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'haui',
    year: HAUI_EXACT_METHOD.year,
    methodId: HAUI_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hauiThptExactFormulaEvidence.evidence, ...hauiPerMajorThresholdEvidence.evidence],
  };
}
