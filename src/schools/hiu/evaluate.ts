import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hiuAdmissionMethods } from './methods';
import { hiuKnowledgeGaps } from './knowledgeGaps';
import { checkHiuThptExamThreshold, checkHiuVactThreshold, type HiuThptExamGroup, type HiuVactGroup } from './eligibility';
import { calculateHiuEffectivePriority30, lookupHiuStandardPriority30 } from './priority';
import { hiuThptExamExactThresholdEvidence } from './evidence';

export interface HiuSubjectContext {
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

function buildGapExtras(method: (typeof hiuAdmissionMethods)[number]): { missingRules: string[]; missingRequirements: MissingRequirement[] } {
  const gaps = method.knowledgeGaps ?? hiuKnowledgeGaps;
  return {
    missingRules: gaps.map((gap) => gap.label),
    missingRequirements: gaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };
}

export interface HiuThptExamEvaluationContext {
  group?: HiuThptExamGroup;
  subjectContext?: HiuSubjectContext;
}

/** Xét kết quả thi TN THPT 2026 — chỉ nhóm `standard` (15/30) checkable đầy đủ; nhóm
 * `healthLicenseOrLaw` trả `unknown` (ngưỡng Bộ GD&ĐT quy định, chưa có số trong nguồn HIU). */
export function evaluateHiuThptExamAdmission(profile: ApplicantProfile, context: HiuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hiuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HiuThptExamGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras(method);

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hiu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HIU.' });
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hiu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HIU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkHiuThptExamThreshold(total30, group);
      reasons.push(result.requiredText);
      explanation.push({ id: 'hiu-thpt-exam-threshold', label: 'Ngưỡng đầu vào HIU 2026 (thi TN THPT)', output: total30, scale: 30, formula: result.requiredText });
      status = result.pass === undefined ? 'unknown' : result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'hiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HIU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

const HIU_EXACT_METHOD = hiuAdmissionMethods[3];
const HIU_EXACT_THRESHOLD_30 = 15;

export interface HiuThptExamExactEvaluationContext {
  subjectContext?: HiuSubjectContext;
}

/** HIU 2026 — phương thức thi TN THPT, nhóm standard. ĐXT = round2(tổng thô 3 môn + điểm ưu
 * tiên). Đủ điều kiện ⟺ TỔNG THÔ ≥ 15/30 (nguồn im lặng về việc ngưỡng có gồm ưu tiên hay không). */
export function evaluateHiuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HiuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hiu',
    year: HIU_EXACT_METHOD.year,
    methodId: HIU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hiu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển HIU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển HIU.');
  }
  const subjects = context.subjectContext.subjects;

  const { total30, missingSubjects } = sumThptTotal(profile, subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hiu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HIU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HIU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHiuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHiuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const eligible = raw30 >= HIU_EXACT_THRESHOLD_30;

  const reasons = [
    `Ngưỡng đầu vào HIU 2026 (thi TN THPT, nhóm ngành thường): tổng điểm thô 3 môn ≥ ${HIU_EXACT_THRESHOLD_30}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. Điểm xét tuyển tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({ id: 'hiu-exact-raw', label: 'Tổng điểm 3 môn thi (thô)', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: hiuThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'hiu-exact-priority', label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)', evidence: hiuThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'hiu-exact-dxt', label: 'Điểm xét tuyển tham khảo (không dùng để so ngưỡng)', output: dxt30, scale: 30, formula: 'round2(tổng thô 3 môn + điểm ưu tiên)', evidence: hiuThptExamExactThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hiu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hiu',
    year: HIU_EXACT_METHOD.year,
    methodId: HIU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hiuThptExamExactThresholdEvidence.evidence],
  };
}

export interface HiuVactEvaluationContext {
  group?: HiuVactGroup;
}

/** Xét ĐGNL ĐHQG-HCM 2026 — điểm thô thang 1200, khớp trực tiếp `ApplicantProfile.exams.vact.total`.
 * Cả 3 nhóm đều có ngưỡng công bố (650/700/675). */
export function evaluateHiuVactAdmission(profile: ApplicantProfile, context: HiuVactEvaluationContext = {}): AdmissionEvaluation {
  const method = hiuAdmissionMethods[2];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HiuVactGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras(method);

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  const vactTotal = profile.exams?.vact?.total;
  if (vactTotal === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hiu-vact-total', label: 'Điểm thi ĐGNL ĐHQG-HCM (thang 1200).' });
    reasons.push('Cần điểm thi ĐGNL ĐHQG-HCM để kiểm tra ngưỡng HIU.');
  } else {
    const result = checkHiuVactThreshold(vactTotal, group);
    reasons.push(result.requiredText);
    explanation.push({ id: 'hiu-vact-threshold', label: 'Ngưỡng đầu vào HIU 2026 (ĐGNL ĐHQG-HCM)', output: vactTotal, scale: 1200, formula: result.requiredText });
    status = result.pass ? 'eligible' : 'ineligible';
  }

  return {
    schoolId: 'hiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}
