import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkVwaThptExamThreshold, checkVwaTranscriptThreshold, type VwaProgramGroup } from './eligibility';
import { vwaAdmissionMethods } from './methods';
import { vwaKnowledgeGaps } from './knowledgeGaps';

export interface VwaSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

/** Điểm trung bình 3 môn tổ hợp qua 6 học kỳ (lớp 10, 11, 12). */
function sumTranscriptAverageTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const g10 = profile.transcript?.grade10?.[subjectId];
    const g11 = profile.transcript?.grade11?.[subjectId];
    const g12 = profile.transcript?.grade12?.[subjectId];
    if (g10 === undefined || g11 === undefined || g12 === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    total += (g10 + g11 + g12) / 3;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

function buildGapExtras(): { missingRules: string[]; missingRequirements: MissingRequirement[] } {
  return {
    missingRules: vwaKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: vwaKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };
}

export interface VwaThptExamEvaluationContext {
  group?: VwaProgramGroup;
  subjectContext?: VwaSubjectContext;
}

export function evaluateVwaThptExamAdmission(profile: ApplicantProfile, context: VwaThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vwaAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: VwaProgramGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras();

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vwa-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VWA.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vwa-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VWA.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkVwaThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'vwa-thpt-exam-threshold',
        label: 'Ngưỡng đầu vào VWA 2026 (thi TN THPT)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'vwa-quality-threshold-2026', location: 'Thông báo 96/TB-HVPNVN', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'vwa',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng VWA.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'vwa-quality-threshold-2026', location: 'Thông báo 96/TB-HVPNVN', verification: 'verified', effectiveYear: 2026 }],
  };
}

export interface VwaTranscriptEvaluationContext {
  group?: VwaProgramGroup;
  subjectContext?: VwaSubjectContext;
}

export function evaluateVwaTranscriptAdmission(profile: ApplicantProfile, context: VwaTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const method = vwaAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: VwaProgramGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras();

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vwa-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VWA.' });
  } else {
    const { total30, missingSubjects } = sumTranscriptAverageTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm học bạ cả 3 năm (lớp 10, 11, 12) cho tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vwa-transcript-${subjectId}`,
          label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} cả 3 năm lớp 10, 11, 12.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkVwaTranscriptThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'vwa-transcript-threshold',
        label: 'Ngưỡng đầu vào VWA 2026 (học bạ)',
        output: total30,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'vwa-quality-threshold-2026', location: 'Thông báo 96/TB-HVPNVN', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'vwa',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm học bạ 3 năm để kiểm tra ngưỡng VWA.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'vwa-quality-threshold-2026', location: 'Thông báo 96/TB-HVPNVN', verification: 'verified', effectiveYear: 2026 }],
  };
}

import { round2 } from '../../core/round2';
import { VWA_THRESHOLD_BY_CODE, type VwaProgramThreshold } from './thresholds';
import { calculateVwaEffectivePriority30, lookupVwaStandardPriority30 } from './priority';
import { vwaThptExamFormulaEvidence } from './evidence';

const VWA_EXACT_METHOD = vwaAdmissionMethods[2];

export interface VwaThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: VwaSubjectContext;
}

function checkVwaSpecialCondition(entry: VwaProgramThreshold, profile: ApplicantProfile): { pass: boolean | undefined; label: string } | undefined {
  if (entry.specialCondition === 'math-min-6') {
    const math = profile.thpt?.scores?.math;
    return { pass: math === undefined ? undefined : math >= 6, label: 'Điểm thi TN THPT môn Toán ≥ 6,0.' };
  }
  return undefined;
}

/** VWA 2026 — phương thức thi TN THPT: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên). Đủ điều kiện
 * xét tuyển ⟺ ĐXT ≥ ngưỡng theo mã xét tuyển VÀ (nếu có) điều kiện phụ theo môn. */
export function evaluateVwaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VwaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'vwa',
    year: VWA_EXACT_METHOD.year,
    methodId: VWA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vwa-program-code', label: 'Chọn mã xét tuyển VWA để áp ngưỡng.' });
    return partial('Cần chọn mã xét tuyển VWA để tính Điểm xét tuyển.');
  }
  const entry = VWA_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry || !entry.modellable) {
    missingRequirements.push({ kind: 'school-context', code: 'vwa-program-code', label: entry ? `Ngành ${entry.name} có điều kiện chứng chỉ ngoại ngữ — ngoài phạm vi nhánh exact.` : `Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng VWA 2026.` });
    return partial(entry ? `Ngành ${entry.name} ngoài phạm vi tính chính xác (cần chứng chỉ ngoại ngữ).` : `Mã xét tuyển "${context.programCode}" không có trong bảng ngưỡng VWA 2026.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vwa-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển VWA.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển VWA.');
  }

  const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `vwa-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp VWA.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển VWA.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total30 as number);
  const standardPriority30 = lookupVwaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVwaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const thresholdPass = raw30 >= entry.threshold30;

  const special = checkVwaSpecialCondition(entry, profile);
  if (special?.pass === undefined && special !== undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vwa-special-condition', label: special.label });
  }

  const reasons = [
    `Ngưỡng điểm xét tuyển ngành ${entry.name} (${entry.code}): tổng thô 3 môn ≥ ${entry.threshold30}/30 — tổng của bạn ${raw30}/30 → ${thresholdPass ? 'đạt' : 'chưa đạt'}.`,
    `Điểm xét tuyển = tổng thô + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30.`,
  ];
  if (special) reasons.push(special.label + (special.pass === true ? ' — đạt.' : special.pass === false ? ' — chưa đạt.' : ' — chưa xác định.'));

  explanation.push({ id: 'vwa-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: vwaThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'vwa-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: vwaThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'vwa-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: vwaThptExamFormulaEvidence.evidence });
  explanation.push({ id: 'vwa-exact-threshold', label: `Ngưỡng — ${entry.name}`, output: entry.threshold30, scale: 30, formula: reasons[0], evidence: vwaThptExamFormulaEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vwa-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  const eligible = thresholdPass && (special ? special.pass === true : true);
  const status: 'eligible' | 'ineligible' | 'unknown' = special?.pass === undefined && special !== undefined ? 'unknown' : eligible ? 'eligible' : 'ineligible';

  return {
    schoolId: 'vwa',
    year: VWA_EXACT_METHOD.year,
    methodId: VWA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vwaThptExamFormulaEvidence.evidence],
  };
}
