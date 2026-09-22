import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { findNeuVactEquivalenceBand } from './equivalence';
import { neuEquivalenceBandEvidence, neuThptExamExactEvidence } from './evidence';
import { neuKnowledgeGaps } from './knowledgeGaps';
import { neuAdmissionMethods } from './methods';
import { NEU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE, NEU_PROGRAM_LABELS } from './thresholds';
import { calculateNeuEffectivePriority30, lookupNeuStandardPriority30 } from './priority';

export interface NeuEquivalenceEvaluationContext {
  vactScore?: number;
}

export function evaluateNeuEquivalence(profile: ApplicantProfile, context: NeuEquivalenceEvaluationContext = {}): AdmissionEvaluation {
  const method = neuAdmissionMethods[0];
  const vactScore = context.vactScore ?? profile.exams?.vact?.total;
  const explanation: CalculationStep[] = [];
  const officialGaps = neuKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const missingRequirements: MissingRequirement[] = [];

  if (vactScore === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'neu-vact', label: 'V-ACT score for NEU equivalence band lookup.' });
    return {
      schoolId: 'neu',
      year: method.year,
      methodId: method.id,
      confidence: 'unavailable',
      eligibility: { status: 'unknown', reasons: ['V-ACT score is required to look up NEU equivalence band.'] },
      missingInputs: ['Missing V-ACT score.'],
      missingRules: neuKnowledgeGaps.map((gap) => gap.label),
      missingRequirements: [...missingRequirements, ...officialGaps],
      explanation,
      evidence: [],
    };
  }

  const band = findNeuVactEquivalenceBand(vactScore);
  const status = band ? 'eligible' : 'ineligible';
  const reason = band
    ? `V-ACT ${vactScore} is in NEU equivalent band THPT ${band.thpt[0]}-${band.thpt[1]}/30.`
    : 'V-ACT score is below the lowest NEU published equivalence band (700-752 -> THPT 22-24).';

  explanation.push({
    id: 'neu-vact-equivalence-band',
    label: 'NEU V-ACT equivalent score band',
    output: vactScore,
    formula: band ? `V-ACT ${band.vact[0]}-${band.vact[1]} -> THPT ${band.thpt[0]}-${band.thpt[1]}` : 'No published band matched',
    evidence: neuEquivalenceBandEvidence.evidence,
  });

  return {
    schoolId: 'neu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: [reason] },
    missingInputs: [],
    missingRules: neuKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: officialGaps,
    explanation,
    evidence: neuEquivalenceBandEvidence.evidence,
  };
}

const NEU_EXACT_METHOD = neuAdmissionMethods[1];

export interface NeuThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** NEU 2026 (PTXT5 — thi TN THPT thuần): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên), tổ hợp
 * A00/A01/D01/D07 hệ số 1. Đủ điều kiện ⟺ ĐXT ≥ điểm chuẩn của mã ngành đã chọn. Nguồn:
 * `sources.ts:neu-admission-info-2026` + `neu-cutoff-2026`. */
export function evaluateNeuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: NeuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'neu',
    year: NEU_EXACT_METHOD.year,
    methodId: NEU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? NEU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'neu-exact-program-code', label: 'Chọn mã ngành NEU (chuẩn, không gồm tiên tiến/chất lượng cao).' });
    return partial('Cần chọn mã ngành NEU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'neu-exact-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển NEU (A00/A01/D01/D07).' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển NEU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `neu-exact-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp NEU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển NEU.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupNeuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateNeuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = NEU_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt30 >= threshold;

  const reasons = [
    `Điểm chuẩn NEU 2026 (PTXT5 — thi TN THPT, ${programLabel} — mã ${context.programCode}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];

  explanation.push({ id: 'neu-exact-raw', label: 'Tổng điểm 3 môn thi (thô, hệ số 1)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: neuThptExamExactEvidence.evidence });
  explanation.push({ id: 'neu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (mục 7.1, chính chủ)', evidence: neuThptExamExactEvidence.evidence });
  explanation.push({ id: 'neu-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: neuThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'neu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'neu',
    year: NEU_EXACT_METHOD.year,
    methodId: NEU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...neuThptExamExactEvidence.evidence],
  };
}

