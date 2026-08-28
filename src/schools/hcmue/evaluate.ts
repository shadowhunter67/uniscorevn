import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hcmueAdmissionMethods } from './methods';
import { hcmueKnowledgeGaps } from './knowledgeGaps';
import { checkHcmueThptThreshold, getHcmueProgramThreshold } from './eligibility';
import { hcmueProgramThresholdEvidence, hcmueThptFormulaEvidence } from './evidence';
import { calculateHcmueEffectivePriority30, lookupHcmueStandardPriority30 } from './priority';

export interface HcmueEvaluationContext {
  selectedProgramId?: string;
  subjectContext?: {
    combinationId?: string;
    subjects: readonly SubjectId[];
  };
}

export function evaluateHcmueAdmission(profile: ApplicantProfile, context: HcmueEvaluationContext = {}): AdmissionEvaluation {
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const explanation: CalculationStep[] = [];
  const program = getHcmueProgramThreshold(context.selectedProgramId);

  if (!context.selectedProgramId) {
    missingRequirements.push({ kind: 'school-context', code: 'program', label: 'Chọn ngành HCMUE để kiểm tra ngưỡng đầu vào.' });
  } else if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'program', label: 'Ngành HCMUE đã chọn không có trong bảng ngưỡng 2026 đã xác minh.' });
  }

  let thptTotal30: number | undefined;
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmue-subject-combination', label: 'Chọn tổ hợp THPT HCMUE.' });
  } else {
    const missingSubjects: SubjectId[] = [];
    const total = context.subjectContext.subjects.reduce((sum, subjectId) => {
      const score = profile.thpt?.scores?.[subjectId];
      if (score === undefined) missingSubjects.push(subjectId);
      return sum + (score ?? 0);
    }, 0);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ 3 môn THPT trong tổ hợp HCMUE đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hcmue-thpt-${subjectId}`,
          label: `Điểm THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HCMUE.`,
        }))
      );
    } else {
      thptTotal30 = Math.round(total * 100) / 100;
    }
  }

  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  if (program && thptTotal30 !== undefined) {
    const threshold = checkHcmueThptThreshold(thptTotal30, program.id);
    status = threshold.pass ? 'eligible' : 'ineligible';
    reasons.push(threshold.requiredText);
    explanation.push({
      id: 'hcmue-thpt-threshold',
      label: 'Ngưỡng đầu vào THPT HCMUE 2026',
      output: thptTotal30,
      scale: 30,
      formula: threshold.requiredText,
    });
  }

  return {
    schoolId: 'hcmue',
    year: hcmueAdmissionMethods[0].year,
    methodId: hcmueAdmissionMethods[0].id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn ngành, tổ hợp và nhập điểm THPT để kiểm tra ngưỡng HCMUE.'] },
    missingInputs,
    missingRules: hcmueKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: [
      ...missingRequirements,
      ...hcmueKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
    ],
    explanation,
    evidence: [...hcmueProgramThresholdEvidence.evidence, ...hcmueThptFormulaEvidence.evidence],
  };
}

const HCMUE_EXACT_METHOD = hcmueAdmissionMethods[1];

export interface HcmueThptExamExactEvaluationContext {
  selectedProgramId?: string;
  subjectContext?: {
    combinationId?: string;
    subjects: readonly SubjectId[];
  };
}

/** HCMUE 2026 — ngưỡng đầu vào theo ngành (chỉ 47 ngành trụ sở chính TP.HCM có `thptThreshold30`
 * công bố, xem `data/programs.ts`). So TỔNG THÔ 3 môn với ngưỡng ngành (nguồn im lặng về việc đã
 * gồm điểm ưu tiên — judgment call, cùng tiền lệ TBDU/CTU). Điểm ưu tiên (Điều 7 TT 06/2026,
 * `priority.ts`) chỉ dùng để tính ĐXT tham khảo, KHÔNG dùng để so ngưỡng. */
export function evaluateHcmueThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HcmueThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hcmue',
    year: HCMUE_EXACT_METHOD.year,
    methodId: HCMUE_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.selectedProgramId) {
    missingRequirements.push({ kind: 'school-context', code: 'program', label: 'Chọn ngành HCMUE (trụ sở chính TP.HCM) để tính ngưỡng đầu vào.' });
    return partial('Cần chọn ngành HCMUE để tính ngưỡng đầu vào.');
  }
  const program = getHcmueProgramThreshold(context.selectedProgramId);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'program', label: 'Ngành HCMUE đã chọn không có trong danh mục 2026 đã xác minh.' });
    return partial('Ngành HCMUE đã chọn không có trong danh mục 2026 đã xác minh.');
  }
  if (program.thptThreshold30 === undefined) {
    missingRequirements.push({
      kind: 'official-rule',
      code: 'hcmue-branch-campus-threshold-unpublished',
      label: `HCMUE chưa công bố ngưỡng đầu vào riêng cho ${program.code} - ${program.name} (ngành phân hiệu Long An/Gia Lai) — ngoài phạm vi nhánh exact.`,
    });
    return partial(`HCMUE chưa công bố ngưỡng đầu vào riêng cho ${program.code} - ${program.name}.`);
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmue-subject-combination', label: 'Chọn tổ hợp THPT HCMUE.' });
    return partial('Cần chọn tổ hợp THPT để tính ngưỡng đầu vào HCMUE.');
  }

  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of context.subjectContext.subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hcmue-thpt-${subjectId}`,
        label: `Điểm THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HCMUE.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn THPT trong tổ hợp HCMUE đã chọn.', ['Chưa đủ 3 môn THPT trong tổ hợp HCMUE đã chọn.']);
  }

  const raw30 = round2(total);
  const threshold = program.thptThreshold30;
  const eligible = raw30 >= threshold;
  const standardPriority30 = lookupHcmueStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmueEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);

  const reasons = [
    `Ngưỡng đầu vào HCMUE 2026 (${program.code} - ${program.name}, trụ sở chính TP.HCM): tổng điểm thô 3 môn ≥ ${threshold.toFixed(2)}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. ĐXT tham khảo (thô + ưu tiên) = ${dxt30}/30.`,
  ];

  explanation.push({
    id: 'hcmue-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hcmueProgramThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'hcmue-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)',
    evidence: hcmueThptFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hcmue-exact-dxt',
    label: 'ĐXT tham khảo (không dùng để so ngưỡng)',
    output: dxt30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên) — ĐXT = M1+M2+M3+ĐƯT',
    evidence: hcmueThptFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hcmue-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — ĐXT tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'hcmue',
    year: HCMUE_EXACT_METHOD.year,
    methodId: HCMUE_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmueProgramThresholdEvidence.evidence, ...hcmueThptFormulaEvidence.evidence],
  };
}
