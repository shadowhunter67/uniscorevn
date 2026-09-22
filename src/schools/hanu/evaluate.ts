import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hanuAdmissionMethods } from './methods';
import { HANU_THPT_EXAM_THRESHOLD_40_BY_PROGRAM_CODE, HANU_PROGRAM_LABELS, HANU_LITERATURE_WEIGHTED_PROGRAM_CODES } from './thresholds';
import { calculateHanuEffectivePriority30, lookupHanuStandardPriority30 } from './priority';
import { hanuThptExamExactEvidence } from './evidence';

export interface HanuThptExamEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

interface WeightedTotalResult {
  ok: true;
  raw50: number;
  raw40: number;
}
interface WeightedTotalError {
  ok: false;
  reason: 'missing-english' | 'missing-weighted-subject' | 'missing-scores';
  missingSubjects: SubjectId[];
}

/** Toán/Văn (tuỳ ngành) và Ngoại ngữ (tiếng Anh) nhân hệ số 2, môn còn lại hệ số 1. Tổng tối đa 50
 * điểm, quy đổi về thang 40 bằng ×40/50. Chỉ hỗ trợ tổ hợp dùng tiếng Anh làm Ngoại ngữ (taxonomy
 * môn học hiện có không có các ngoại ngữ khác — xem `knowledgeGaps.ts`). */
function computeWeightedTotal(
  profile: ApplicantProfile,
  subjects: readonly SubjectId[],
  literatureWeighted: boolean
): WeightedTotalResult | WeightedTotalError {
  if (!subjects.includes('english')) return { ok: false, reason: 'missing-english', missingSubjects: [] };
  const weightedSubject: SubjectId = literatureWeighted ? 'literature' : 'math';
  if (!subjects.includes(weightedSubject)) return { ok: false, reason: 'missing-weighted-subject', missingSubjects: [] };

  const missing: SubjectId[] = [];
  const scoreOf = (s: SubjectId): number => {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    return v ?? 0;
  };

  let raw50 = 0;
  for (const s of subjects) {
    const v = scoreOf(s);
    const mult = s === 'english' || s === weightedSubject ? 2 : 1;
    raw50 += v * mult;
  }
  if (missing.length > 0) return { ok: false, reason: 'missing-scores', missingSubjects: missing };

  return { ok: true, raw50: round2(raw50), raw40: round2((raw50 * 40) / 50) };
}

const HANU_BASELINE_METHOD = hanuAdmissionMethods[0];
const HANU_EXACT_METHOD = hanuAdmissionMethods[1];

function buildContextErrors(context: HanuThptExamEvaluationContext): MissingRequirement[] | undefined {
  const missingRequirements: MissingRequirement[] = [];
  if (context.programCode === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hanu-program-code', label: 'Chọn mã ngành HANU.' });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hanu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HANU (dùng tiếng Anh làm Ngoại ngữ).' });
  }
  return missingRequirements.length > 0 ? missingRequirements : undefined;
}

/** HANU 2026 — nhánh baseline (luôn trả `partial`, dùng để kiểm tra sơ bộ qua `/compare` khi chưa
 * chọn mã ngành cụ thể). */
export function evaluateHanuThptExamAdmission(profile: ApplicantProfile, context: HanuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements = buildContextErrors(context) ?? [];
  const missingRules = (HANU_BASELINE_METHOD.knowledgeGaps ?? []).map((g) => g.label);

  if (missingRequirements.length > 0) {
    return {
      schoolId: 'hanu',
      year: HANU_BASELINE_METHOD.year,
      methodId: HANU_BASELINE_METHOD.id,
      confidence: 'partial',
      eligibility: { status: 'unknown', reasons: ['Cần chọn mã ngành và tổ hợp môn để kiểm tra ngưỡng HANU.'] },
      missingInputs: [],
      missingRules,
      missingRequirements,
      explanation: [],
      evidence: [],
    };
  }

  const threshold = HANU_THPT_EXAM_THRESHOLD_40_BY_PROGRAM_CODE[context.programCode!];
  if (threshold === undefined) {
    return {
      schoolId: 'hanu',
      year: HANU_BASELINE_METHOD.year,
      methodId: HANU_BASELINE_METHOD.id,
      confidence: 'partial',
      eligibility: { status: 'unknown', reasons: [`Mã ngành ${context.programCode} không có trong bảng điểm chuẩn HANU đã xác nhận.`] },
      missingInputs: [],
      missingRules,
      missingRequirements: [{ kind: 'official-rule', code: 'hanu-program-not-found', label: `Mã ngành ${context.programCode} không có trong bảng điểm chuẩn HANU đã xác nhận.` }],
      explanation: [],
      evidence: [],
    };
  }

  const literatureWeighted = HANU_LITERATURE_WEIGHTED_PROGRAM_CODES.has(context.programCode!);
  const weighted = computeWeightedTotal(profile, context.subjectContext!.subjects, literatureWeighted);
  if (!weighted.ok) {
    const missing = weighted.reason === 'missing-scores' ? weighted.missingSubjects : [];
    return {
      schoolId: 'hanu',
      year: HANU_BASELINE_METHOD.year,
      methodId: HANU_BASELINE_METHOD.id,
      confidence: 'partial',
      eligibility: { status: 'unknown', reasons: ['Cần đủ điểm 3 môn (tổ hợp dùng tiếng Anh làm Ngoại ngữ) để kiểm tra ngưỡng HANU.'] },
      missingInputs: [],
      missingRules,
      missingRequirements: missing.map((s) => ({ kind: 'profile-input' as const, code: `hanu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HANU.` })),
      explanation: [],
      evidence: [],
    };
  }

  const eligible = weighted.raw40 >= threshold;
  return {
    schoolId: 'hanu',
    year: HANU_BASELINE_METHOD.year,
    methodId: HANU_BASELINE_METHOD.id,
    confidence: 'partial',
    eligibility: {
      status: eligible ? 'eligible' : 'ineligible',
      reasons: [`Điểm chuẩn ${HANU_PROGRAM_LABELS[context.programCode!]}: ${threshold}/40. Tổng thô (đã nhân hệ số, quy đổi thang 40, chưa gồm ưu tiên) = ${weighted.raw40}/40.`],
    },
    missingInputs: [],
    missingRules,
    missingRequirements: [],
    explanation: [],
    evidence: [{ sourceId: 'hanu-cutoff-2026', location: 'Quyết định 3222/QĐ-ĐHHN', verification: 'verified', effectiveYear: 2026 }],
  };
}

export interface HanuThptExamExactEvaluationContext extends HanuThptExamEvaluationContext {}

/** HANU 2026 — thi TN THPT: ĐXT = round2((Toán|Văn ×2 + Ngoại ngữ ×2 + môn còn lại ×1) × 40/50 +
 * điểm ưu tiên (×4/3)). Đủ điều kiện ⟺ ĐXT ≥ điểm chuẩn của mã ngành đã chọn. Chỉ áp dụng tổ hợp
 * dùng tiếng Anh làm Ngoại ngữ. Nguồn: `sources.ts:hanu-scheme-2026` + `hanu-cutoff-2026`. */
export function evaluateHanuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HanuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];

  const partial = (reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation => ({
    schoolId: 'hanu',
    year: HANU_EXACT_METHOD.year,
    methodId: HANU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.programCode === undefined) {
    return partial('Cần chọn mã ngành HANU để áp điểm chuẩn.', [{ kind: 'school-context', code: 'hanu-exact-program-code', label: 'Chọn mã ngành HANU.' }]);
  }
  const threshold = HANU_THPT_EXAM_THRESHOLD_40_BY_PROGRAM_CODE[context.programCode];
  if (threshold === undefined) {
    return partial(`Mã ngành ${context.programCode} không có trong bảng điểm chuẩn HANU đã xác nhận.`, [
      { kind: 'official-rule', code: 'hanu-exact-program-not-found', label: `Mã ngành ${context.programCode} không có trong bảng điểm chuẩn HANU đã xác nhận.` },
    ]);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    return partial('Cần chọn tổ hợp 3 môn (dùng tiếng Anh làm Ngoại ngữ) để tính Điểm xét tuyển HANU.', [
      { kind: 'school-context', code: 'hanu-exact-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HANU (dùng tiếng Anh làm Ngoại ngữ).' },
    ]);
  }

  const literatureWeighted = HANU_LITERATURE_WEIGHTED_PROGRAM_CODES.has(context.programCode);
  const weighted = computeWeightedTotal(profile, context.subjectContext.subjects, literatureWeighted);
  if (!weighted.ok) {
    if (weighted.reason === 'missing-english' || weighted.reason === 'missing-weighted-subject') {
      return partial(
        `Tổ hợp đã chọn không hợp lệ cho mã ngành ${context.programCode} — cần có tiếng Anh và ${literatureWeighted ? 'Ngữ văn' : 'Toán'} (2 môn nhân hệ số 2).`,
        [{ kind: 'school-context', code: 'hanu-exact-invalid-combination', label: 'Tổ hợp không hợp lệ (thiếu môn nhân hệ số 2 hoặc không dùng tiếng Anh).' }]
      );
    }
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', [
      ...weighted.missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hanu-exact-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HANU.` })),
    ]);
  }

  const standardPriority30 = lookupHanuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHanuEffectivePriority30({ rawTotal40: weighted.raw40, standardPriority30 });
  const priorityAdd40 = round2((priority.effectivePriority30 * 4) / 3);
  const dxt40 = round2(Math.min(40, weighted.raw40 + priorityAdd40));
  const programLabel = HANU_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt40 >= threshold;

  const weightedSubjectLabel = literatureWeighted ? 'Ngữ văn' : 'Toán';
  const reasons = [
    `Điểm chuẩn HANU 2026 (thi TN THPT, ${programLabel} — mã ${context.programCode}): Điểm xét tuyển ≥ ${threshold}/40.`,
    `Tổng thô (${weightedSubjectLabel} & Ngoại ngữ ×2, môn còn lại ×1, quy đổi thang 40) = ${weighted.raw40}/40; điểm ưu tiên = ${priorityAdd40}/40 → Điểm xét tuyển = ${dxt40}/40 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];

  explanation.push({
    id: 'hanu-exact-raw',
    label: `Tổng điểm thô (${weightedSubjectLabel} & Ngoại ngữ ×2)`,
    output: weighted.raw40,
    scale: 40,
    formula: `(${weightedSubjectLabel} ×2 + Ngoại ngữ ×2 + môn còn lại ×1) × 40/50`,
    evidence: hanuThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'hanu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priorityAdd40,
    scale: 40,
    formula: priority.reduced ? '[(30 − tổng thô thang 30 tương đương)/7,5] × Mức ưu tiên KV/ĐT × 4/3' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026) × 4/3',
    evidence: hanuThptExamExactEvidence.evidence,
  });
  explanation.push({
    id: 'hanu-exact-dxt',
    label: 'Điểm xét tuyển',
    output: dxt40,
    scale: 40,
    formula: 'round2(tổng thô thang 40 + điểm ưu tiên)',
    evidence: hanuThptExamExactEvidence.evidence,
  });

  const missingRequirements: MissingRequirement[] = [];
  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hanu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hanu',
    year: HANU_EXACT_METHOD.year,
    methodId: HANU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt40, scale: 40 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hanuThptExamExactEvidence.evidence],
  };
}
