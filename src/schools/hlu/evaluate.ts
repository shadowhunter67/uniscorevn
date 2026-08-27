import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HLU_THPT_THRESHOLD } from './eligibility';
import { hluAdmissionMethods } from './methods';
import {
  HLU_COMBOS,
  HLU_COMBO_DELTA_TO_D01,
  HLU_MAX_SCORE_30,
  HLU_PROGRAM_BY_ID,
  HLU_THPT_MIN_THRESHOLD_30,
} from './thresholds';
import { calculateHluEffectivePriority30, lookupHluStandardPriority30 } from './priority';
import { hluThptExamFormulaEvidence, hluCutoffEvidence, hluThptExamThresholdEvidence } from './evidence';

export function evaluateHluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hlu',
    schoolShortName: 'HLU',
    method: hluAdmissionMethods[0],
    profile,
    context,
    threshold: HLU_THPT_THRESHOLD,
    evidenceSourceId: 'hlu-quality-threshold-2026',
  });
}

const HLU_EXACT_METHOD = hluAdmissionMethods[1];

export interface HluThptExamExactEvaluationContext {
  /** Mã ngành HLU: 'luat' | 'luat-kinh-te' | 'luat-thuong-mai-quoc-te' | 'ngon-ngu-anh' | 'luat-dak-lak'. */
  programId?: string;
  /** Mã tổ hợp: 'D01' | 'A00' | 'A01' | 'C00'. */
  combinationId?: string;
}

function hluExactPartial(input: { missingInputs?: string[]; missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hlu',
    year: HLU_EXACT_METHOD.year,
    methodId: HLU_EXACT_METHOD.id,
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
 * HLU 2026 — phương thức thi TN THPT, tính đủ Điểm xét tuyển (quy về tổ hợp gốc D01, thang 30):
 * ĐXT = min(30, round2(tổng thô 3 môn − độ chênh tổ hợp + điểm ưu tiên)). Ngưỡng ĐBCL kiểm tra
 * trên tổng thô (theo tổ hợp) ≥ 20/30 (KV3).
 */
export function evaluateHluThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HluThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const { combinationId } = context;
  if (!combinationId || !(combinationId in HLU_COMBOS)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hlu-subject-combination',
      label: 'Chọn tổ hợp xét tuyển HLU (D01, A00, A01 hoặc C00).',
    });
    return hluExactPartial({ missingRequirements, reason: 'Cần chọn tổ hợp xét tuyển hợp lệ (D01/A00/A01/C00) để tính Điểm xét tuyển HLU.' });
  }

  const subjects = HLU_COMBOS[combinationId];
  let rawTotal = 0;
  const missingSubjects: string[] = [];
  for (const subjectId of subjects) {
    const s = profile.thpt?.scores?.[subjectId];
    if (s === undefined) missingSubjects.push(subjectId);
    else rawTotal += s;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hlu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId as keyof typeof SUBJECT_LABELS]} cho tổ hợp ${combinationId}.`,
      }))
    );
    return hluExactPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HLU.',
    });
  }
  const raw30 = round2(rawTotal);
  const delta = HLU_COMBO_DELTA_TO_D01[combinationId] ?? 0;

  const standardPriority30 = lookupHluStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHluEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = Math.min(HLU_MAX_SCORE_30, round2(raw30 - delta + priority.effectivePriority30));

  // Ngưỡng bảo đảm chất lượng đầu vào: tổng thô 3 môn (theo tổ hợp, không quy đổi) ≥ 20/30, KV3.
  const thresholdPass = raw30 >= HLU_THPT_MIN_THRESHOLD_30;
  const reasons: string[] = [];
  reasons.push(
    `Ngưỡng bảo đảm chất lượng đầu vào HLU 2026 (lĩnh vực pháp luật, KV3): tổng thô 3 môn ≥ ${HLU_THPT_MIN_THRESHOLD_30}/30 — tổng của bạn ${raw30}/30 → ${thresholdPass ? 'đạt' : 'chưa đạt'}.`
  );
  reasons.push(
    `Điểm xét tuyển (quy về tổ hợp gốc D01) = ${raw30}${delta ? ` − ${delta} (độ chênh tổ hợp ${combinationId})` : ''} + ${priority.effectivePriority30} (ưu tiên) = ${finalScore}/30.`
  );

  const program = context.programId ? HLU_PROGRAM_BY_ID.get(context.programId) : undefined;
  if (context.programId && !program) {
    missingRequirements.push({ kind: 'school-context', code: 'hlu-program-id', label: `Mã ngành "${context.programId}" không có trong bảng điểm trúng tuyển HLU 2026.` });
  }
  if (program) {
    const admitLikely = finalScore >= program.cutoffD01_30;
    reasons.push(
      `Điểm trúng tuyển 2026 ngành ${program.name} (theo tổ hợp gốc D01): ${program.cutoffD01_30}/30 — Điểm xét tuyển của bạn ${finalScore} ${admitLikely ? '≥' : '<'} điểm chuẩn. (Điểm chuẩn thực tế có thể thay đổi theo năm.)`
    );
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'hlu-program-id', label: 'Chọn mã ngành HLU để đối chiếu với điểm trúng tuyển 2026.' });
  }

  explanation.push({ id: 'hlu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hluThptExamFormulaEvidence.evidence });
  if (delta) {
    explanation.push({ id: 'hlu-exact-delta', label: `Độ chênh tổ hợp ${combinationId} → D01`, output: -delta, scale: 30, formula: `− ${delta} (Thông báo 1029)`, evidence: hluThptExamFormulaEvidence.evidence });
  }
  explanation.push({
    id: 'hlu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 Quy chế HLU)' : 'Mức ưu tiên KV/ĐT (Điều 7 Quy chế HLU)',
    evidence: hluThptExamFormulaEvidence.evidence,
  });
  explanation.push({ id: 'hlu-exact-final', label: 'Điểm xét tuyển (quy về D01)', output: finalScore, scale: 30, formula: 'min(30, tổng thô − độ chênh tổ hợp + điểm ưu tiên)', evidence: hluThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'hlu-exact-threshold', label: 'Ngưỡng bảo đảm chất lượng đầu vào', output: HLU_THPT_MIN_THRESHOLD_30, scale: 30, formula: reasons[0], evidence: hluThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hlu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  const status: 'eligible' | 'ineligible' = thresholdPass ? 'eligible' : 'ineligible';

  return {
    schoolId: 'hlu',
    year: HLU_EXACT_METHOD.year,
    methodId: HLU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hluThptExamFormulaEvidence.evidence, ...hluThptExamThresholdEvidence.evidence, ...(program ? hluCutoffEvidence.evidence : [])],
  };
}
