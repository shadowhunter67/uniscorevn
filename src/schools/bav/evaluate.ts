import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { BAV_THPT_THRESHOLD } from './eligibility';
import { bavAdmissionMethods } from './methods';
import { BAV_THRESHOLD_BY_CODE, type BavProgramThreshold } from './thresholds';
import { lookupBavStandardPriority30, calculateBavEffectivePriority30 } from './priority';
import { bavThptExactFormulaEvidence, bavPerProgramThresholdEvidence, bavProgramCombinationEvidence } from './evidence';

/**
 * Điểm quy đổi PTXT4: tổng 3 môn theo tổ hợp, môn chính (Toán — luôn có mặt trong mọi tổ hợp BAV
 * dùng ở đây: A00/A01/D01/D07/D09) nhân đôi, tổng tối đa 40, quy đổi về thang 30 (×30/40 = ×0,75).
 * Xem `sources.ts:bav-threshold-2026`.
 */
function computeBavWeightedRaw30(scores: Partial<Record<SubjectId, number>>, subjects: readonly SubjectId[]): number | undefined {
  const mathScore = scores.math;
  if (mathScore === undefined) return undefined;
  let othersSum = 0;
  for (const subjectId of subjects) {
    if (subjectId === 'math') continue;
    const score = scores[subjectId];
    if (score === undefined) return undefined;
    othersSum += score;
  }
  const raw40 = 2 * mathScore + othersSum;
  return round2((raw40 * 30) / 40);
}

export interface BavThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {}

/**
 * Baseline (partial): kiểm tra thô điểm quy đổi PTXT4 (đã nhân đôi Toán, quy đổi thang 30) so với
 * dải ngưỡng công bố [19,00 - 21,50] — KHÔNG chọn mã xét tuyển cụ thể nên không kết luận chắc chắn
 * trong khoảng giữa 2 mức (giống pattern AOF/HAUI baseline).
 */
export function evaluateBavThptExamAdmission(profile: ApplicantProfile, context: BavThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = bavAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'bav-subject-combination', label: 'Chọn tổ hợp môn xét tuyển BAV (phải có môn Toán).' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào BAV.');
  } else if (!context.subjectContext.subjects.includes('math')) {
    missingRequirements.push({ kind: 'school-context', code: 'bav-subject-combination-requires-math', label: 'Tổ hợp BAV (PTXT4, ngoài lĩnh vực Pháp luật) luôn có môn Toán làm môn chính.' });
    reasons.push('Tổ hợp đã chọn không có môn Toán — ngoài phạm vi nhánh này (lĩnh vực Pháp luật dùng Văn, ngưỡng chưa công bố).');
  } else {
    const scores: Partial<Record<SubjectId, number>> = {};
    const missingSubjects: SubjectId[] = [];
    for (const subjectId of context.subjectContext.subjects) {
      const score = profile.thpt?.scores?.[subjectId];
      if (score === undefined) missingSubjects.push(subjectId);
      else scores[subjectId] = score;
    }
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho BAV.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `bav-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp BAV.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng BAV.');
    } else {
      const weighted30 = computeBavWeightedRaw30(scores, context.subjectContext.subjects);
      if (weighted30 !== undefined) {
        explanation.push({
          id: 'bav-thpt-threshold',
          label: 'Điểm quy đổi PTXT4 BAV 2026 (Toán nhân đôi, quy đổi thang 30)',
          output: weighted30,
          scale: 30,
          formula: BAV_THPT_THRESHOLD.requiredText,
          evidence: bavThptExactFormulaEvidence.evidence,
        });
        if (weighted30 < BAV_THPT_THRESHOLD.min30) {
          status = 'ineligible';
          reasons.push(`Điểm quy đổi ${weighted30}/30 thấp hơn ngưỡng thấp nhất đã công bố (${BAV_THPT_THRESHOLD.min30}/30).`);
        } else if (weighted30 < BAV_THPT_THRESHOLD.max30) {
          status = 'unknown';
          reasons.push(
            `Điểm quy đổi ${weighted30}/30 nằm giữa 2 mức ngưỡng đã công bố (${BAV_THPT_THRESHOLD.requiredText}) — cần chọn mã xét tuyển cụ thể để kết luận chắc chắn.`
          );
        } else {
          status = 'eligible';
          reasons.push(`Điểm quy đổi ${weighted30}/30 đạt mức ngưỡng cao nhất đã công bố (${BAV_THPT_THRESHOLD.max30}/30).`);
        }
      }
    }
  }

  return {
    schoolId: 'bav',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...bavThptExactFormulaEvidence.evidence, ...bavPerProgramThresholdEvidence.evidence],
  };
}

const BAV_EXACT_METHOD = bavAdmissionMethods[1];

export interface BavSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface BavThptExamExactEvaluationContext {
  /** Mã xét tuyển BAV (vd 'BANK01'). */
  programCode?: string;
  subjectContext?: BavSubjectContext;
}

function bavExactPartial(input: {
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'bav',
    year: BAV_EXACT_METHOD.year,
    methodId: BAV_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs ?? [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

/**
 * BAV 2026 — nhánh exact, PTXT4 (thi TN THPT), tính Điểm xét theo mã xét tuyển: ĐX = (2×Toán +
 * 2 môn còn lại) × 30/40 + điểm ưu tiên KV/ĐT (công thức BAV tự công bố, giá trị bảng judgment
 * call quốc gia). Ngưỡng đăng ký xét tuyển so với ĐIỂM QUY ĐỔI (đã nhân đôi Toán, quy đổi thang
 * 30), KHÔNG cộng ưu tiên — đúng câu chữ mục 1 thông báo ngưỡng (khác HAUI, nơi ngưỡng so với tổng
 * thô không nhân hệ số).
 */
export function evaluateBavThptExamExactAdmission(
  profile: ApplicantProfile,
  context: BavThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'bav-program-code', label: 'Chọn mã xét tuyển BAV để tra ngưỡng và tính Điểm xét.' });
    return bavExactPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển BAV để áp ngưỡng và tính Điểm xét.' });
  }

  const entry: BavProgramThreshold | undefined = BAV_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'bav-program-code', label: `Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng BAV 2026 (có thể thuộc lĩnh vực Pháp luật — ngưỡng chưa công bố).` });
    return bavExactPartial({ missingRequirements, reason: `Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng BAV 2026 đã xác nhận.` });
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'bav-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.code} - ${entry.name}.` });
    return bavExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.code} - ${entry.name}.` });
  }
  if (!entry.combinationIds.includes(context.subjectContext.combinationId ?? '')) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'bav-subject-combination-not-in-list',
      label: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.code} (${entry.combinationIds.join(', ')}).`,
    });
    return bavExactPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.code} (${entry.combinationIds.join(', ')}).` });
  }

  const { subjects } = context.subjectContext;
  const scores: Partial<Record<SubjectId, number>> = {};
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores[subjectId] = score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `bav-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return bavExactPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét BAV.',
    });
  }

  const weighted30 = computeBavWeightedRaw30(scores, subjects);
  if (weighted30 === undefined) {
    return bavExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT (bao gồm Toán) để tính Điểm xét BAV.' });
  }

  const standardPriority30 = lookupBavStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateBavEffectivePriority30({ rawTotal30: weighted30, standardPriority30 });
  const finalScore = round2(Math.min(30, weighted30 + priority.effectivePriority30));

  const eligible = weighted30 >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ${entry.code} - ${entry.name} (${entry.jointDegree ? 'liên kết đào tạo quốc tế' : 'chuẩn/chất lượng cao'}): điểm quy đổi ≥ ${entry.threshold30}/30 — điểm quy đổi của bạn = ${weighted30}/30.`,
    eligible ? 'Đạt ngưỡng đảm bảo chất lượng đầu vào.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.',
    `Điểm xét (gồm điểm ưu tiên, chưa gồm điểm cộng — chưa model) = ${finalScore}/30.`,
  ];

  explanation.push({
    id: 'bav-exact-raw',
    label: 'Điểm quy đổi (Toán nhân đôi, quy đổi thang 30)',
    output: weighted30,
    scale: 30,
    formula: `(2×Toán + ${subjects.filter((s) => s !== 'math').map((s) => SUBJECT_LABELS[s]).join(' + ')}) × 30/40`,
    evidence: bavThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bav-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − Điểm quy đổi)/7,5] × Mức điểm ưu tiên quy định (công thức BAV tự công bố; giá trị bảng theo khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: bavThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bav-exact-final',
    label: 'Điểm xét',
    output: finalScore,
    scale: 30,
    formula: 'Điểm quy đổi + Điểm ưu tiên (chưa gồm điểm cộng)',
    evidence: bavThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bav-exact-threshold',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${entry.code}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: [...bavPerProgramThresholdEvidence.evidence, ...bavProgramCombinationEvidence.evidence],
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'bav-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'bav',
    year: BAV_EXACT_METHOD.year,
    methodId: BAV_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...bavThptExactFormulaEvidence.evidence, ...bavPerProgramThresholdEvidence.evidence, ...bavProgramCombinationEvidence.evidence],
  };
}
