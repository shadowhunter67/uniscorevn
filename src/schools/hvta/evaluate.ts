import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HVTA_THPT_THRESHOLD } from './eligibility';
import { hvtaAdmissionMethods } from './methods';
import { calculateHvtaEffectivePriority30, lookupHvtaStandardPriority30 } from './priority';
import { hvtaThptExamThresholdEvidence } from './evidence';

export function evaluateHvtaAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hvta',
    schoolShortName: 'HVTA',
    method: hvtaAdmissionMethods[0],
    profile,
    context,
    threshold: HVTA_THPT_THRESHOLD,
    evidenceSourceId: 'hvta-admission-info-2026',
  });
}

const HVTA_EXACT_METHOD = hvtaAdmissionMethods[1];
const HVTA_EXACT_THRESHOLD_30 = 18;
const HVTA_TOAN_VAN_MIN_10 = 6;

export interface HvtaThptExamExactEvaluationContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HVTA 2026 (ngành Luật, thi TN THPT): đủ điều kiện xét tuyển ⟺ tổng thô 3 môn ≥ 18/30 VÀ điểm
 * Toán/Ngữ văn (môn nào có trong tổ hợp) ≥ 6/10. Điểm ưu tiên chỉ hiển thị tham khảo (không dùng để
 * so ngưỡng). "Đủ điều kiện xét tuyển" KHÔNG đảm bảo đã "Đạt sơ tuyển" (điều kiện hồ sơ riêng). */
export function evaluateHvtaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HvtaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hvta',
    year: HVTA_EXACT_METHOD.year,
    methodId: HVTA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hvta-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HVTA (A00/A01/C00/D01).' });
    return partial('Cần chọn tổ hợp 3 môn để kiểm tra ngưỡng điều kiện xét tuyển HVTA.');
  }
  const subjects = context.subjectContext.subjects;

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `hvta-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HVTA.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để kiểm tra ngưỡng HVTA.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupHvtaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHvtaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);

  const hasMath = subjects.includes('math');
  const hasLiterature = subjects.includes('literature');
  const mathScore = hasMath ? profile.thpt?.scores?.math : undefined;
  const literatureScore = hasLiterature ? profile.thpt?.scores?.literature : undefined;
  const toanVanConditionMet = (!hasMath || (mathScore ?? 0) >= HVTA_TOAN_VAN_MIN_10) && (!hasLiterature || (literatureScore ?? 0) >= HVTA_TOAN_VAN_MIN_10);

  const meetsTotal = raw30 >= HVTA_EXACT_THRESHOLD_30;
  const eligible = meetsTotal && toanVanConditionMet;

  const reasons = [
    `Ngưỡng HVTA 2026 (ngành Luật, thi TN THPT): tổng điểm thô 3 môn ≥ ${HVTA_EXACT_THRESHOLD_30}/30 VÀ điểm Toán/Ngữ văn (môn có trong tổ hợp) ≥ ${HVTA_TOAN_VAN_MIN_10}/10.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${meetsTotal ? 'đạt' : 'chưa đạt'} ngưỡng tổng.`,
    `Điều kiện Toán/Ngữ văn: ${toanVanConditionMet ? 'đạt' : 'chưa đạt'}.`,
    `${eligible ? 'Đủ điều kiện xét tuyển theo ngưỡng điểm (chưa tính điều kiện "Đạt sơ tuyển", xem lưu ý).' : 'Chưa đủ điều kiện xét tuyển.'} Điểm xét tham khảo (thô + ưu tiên, KHÔNG dùng để so ngưỡng) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'hvta-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hvtaThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'hvta-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hvtaThptExamThresholdEvidence.evidence });
  explanation.push({ id: 'hvta-exact-dxt', label: 'Điểm xét tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: hvtaThptExamThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hvta-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tham khảo đang tính với điểm ưu tiên = 0).' });
  }
  missingRequirements.push({ kind: 'official-rule', code: 'hvta-pre-screening-not-modeled', label: 'Cần "Đạt sơ tuyển" tại Tòa án nhân dân/Học viện — UniscoreVN không kiểm tra được điều kiện này.' });

  return {
    schoolId: 'hvta',
    year: HVTA_EXACT_METHOD.year,
    methodId: HVTA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hvtaThptExamThresholdEvidence.evidence],
  };
}
