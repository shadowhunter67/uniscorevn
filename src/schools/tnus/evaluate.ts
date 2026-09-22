import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TNUS_THPT_THRESHOLD } from './eligibility';
import { tnusAdmissionMethods } from './methods';
import {
  TNUS_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE,
  TNUS_PROGRAM_LABELS,
  TNUS_LAW_PROGRAM_CODES,
  TNUS_SEMICONDUCTOR_PROGRAM_CODE,
} from './thresholds';
import { calculateTnusEffectivePriority30, lookupTnusStandardPriority30 } from './priority';
import { tnusThptExamExactEvidence } from './evidence';

export function evaluateTnusThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tnus',
    schoolShortName: 'TNUS',
    method: tnusAdmissionMethods[0],
    profile,
    context,
    threshold: TNUS_THPT_THRESHOLD,
    evidenceSourceId: 'tnus-cutoff-2026',
  });
}

const TNUS_EXACT_METHOD = tnusAdmissionMethods[1];

export interface TnusThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TNUS 2026 — thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện ⟺ ĐXT ≥ điểm
 * chuẩn của mã xét tuyển đã chọn, VÀ (nếu Luật/Luật kinh tế) điểm Toán hoặc Ngữ văn trong tổ hợp
 * ≥ 6,0, VÀ (nếu Công nghệ bán dẫn) điểm Toán ≥ 7,5. Nguồn: `sources.ts:tnus-threshold-2026`. */
export function evaluateTnusThptExamExactAdmission(
  profile: ApplicantProfile,
  context: TnusThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'tnus',
    year: TNUS_EXACT_METHOD.year,
    methodId: TNUS_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? TNUS_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'tnus-program-code', label: 'Chọn mã xét tuyển TNUS.' });
    return partial('Cần chọn mã xét tuyển TNUS để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'tnus-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển TNUS.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển TNUS.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  const scoreBySubject = new Map<SubjectId, number>();
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else {
      total += v;
      scoreBySubject.set(s, v);
    }
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `tnus-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp TNUS.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển TNUS.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupTnusStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateTnusEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = TNUS_PROGRAM_LABELS[context.programCode] ?? context.programCode;

  let subConditionOk = true;
  let subConditionReason: string | undefined;
  if (TNUS_LAW_PROGRAM_CODES.has(context.programCode)) {
    const toan = scoreBySubject.get('math');
    const van = scoreBySubject.get('literature');
    const relevant = toan ?? van;
    if (relevant === undefined) {
      subConditionOk = false;
      subConditionReason = 'Tổ hợp không có môn Toán/Ngữ văn để kiểm tra điều kiện phụ Luật/Luật kinh tế.';
    } else if (relevant < 6.0) {
      subConditionOk = false;
      subConditionReason = `Điều kiện phụ Luật/Luật kinh tế: điểm Toán hoặc Ngữ văn trong tổ hợp phải ≥ 6,0 (đang có ${relevant}).`;
    }
  } else if (context.programCode === TNUS_SEMICONDUCTOR_PROGRAM_CODE) {
    const toan = scoreBySubject.get('math');
    if (toan === undefined || toan < 7.5) {
      subConditionOk = false;
      subConditionReason = `Điều kiện phụ Công nghệ bán dẫn: điểm Toán phải ≥ 7,5 (đang có ${toan ?? 'chưa có'}).`;
    }
  }

  const eligible = dxt30 >= threshold && subConditionOk;

  const reasons = [
    `Điểm chuẩn TNUS 2026 (thi TN THPT, ${programLabel} — mã ${context.programCode}): Điểm xét tuyển ≥ ${threshold}/30.`,
    `Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 → ${dxt30 >= threshold ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];
  if (subConditionReason) reasons.push(subConditionReason);

  explanation.push({ id: 'tnus-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: tnusThptExamExactEvidence.evidence });
  explanation.push({ id: 'tnus-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: tnusThptExamExactEvidence.evidence });
  explanation.push({ id: 'tnus-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên)', evidence: tnusThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'tnus-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'tnus',
    year: TNUS_EXACT_METHOD.year,
    methodId: TNUS_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...tnusThptExamExactEvidence.evidence],
  };
}
