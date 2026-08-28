import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { vnuaAdmissionMethods } from './methods';
import { getVnuaProgramGroupThreshold, type VnuaProgramGroupId } from './thresholds';
import { calculateVnuaEffectivePriority30, lookupVnuaStandardPriority30 } from './priority';
import { vnuaGroupThresholdEvidence, vnuaPriorityFormulaEvidence } from './evidence';

export interface VnuaThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: VnuaProgramGroupId;
}

const COMMON_THPT_MIN30 = 15;
const thresholdLocation = 'Official VNUA 2026 threshold notice, image table tb1.jpg';

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

export function evaluateVnuaThptExamAdmission(profile: ApplicantProfile, context: VnuaThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vnuaAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({
    kind: 'official-rule' as const,
    code: gap.id,
    label: gap.label,
  }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnua-subject-combination',
      label: 'Select a VNUA subject combination for THPT threshold checking.',
    });
    reasons.push('VNUA needs a selected subject combination before the THPT threshold can be checked.');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Missing THPT scores for the selected VNUA subject combination.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vnua-thpt-${subjectId}`,
          label: `THPT score for ${SUBJECT_LABELS[subjectId]} in the selected VNUA combination.`,
        }))
      );
      reasons.push('VNUA needs all three THPT subject scores in the selected combination.');
    }

    if (total30 !== undefined) {
      explanation.push({
        id: 'vnua-thpt-group-threshold',
        label: 'VNUA 2026 THPT threshold',
        output: total30,
        scale: 30,
        formula:
          'Total of three THPT subjects must be at least 15/30 and must also meet the published group-specific THPT threshold.',
        evidence: [{ sourceId: 'vnua-threshold-notice-2026', location: thresholdLocation, verification: 'verified', effectiveYear: 2026 }],
      });

      if (total30 < COMMON_THPT_MIN30) {
        status = 'ineligible';
        reasons.push(`Total ${total30}/30 is below VNUA's common THPT baseline of ${COMMON_THPT_MIN30}/30.`);
      } else if (!context.programGroupId) {
        missingRequirements.push({
          kind: 'school-context',
          code: 'vnua-program-group',
          label: 'Select the VNUA program group (HVN01-HVN23) to apply the group-specific threshold.',
        });
        reasons.push(`Total ${total30}/30 meets the common baseline, but VNUA also requires a group-specific threshold.`);
      } else {
        const threshold = getVnuaProgramGroupThreshold(context.programGroupId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'school-context',
            code: 'vnua-program-group',
            label: 'Select a valid VNUA program group (HVN01-HVN23).',
          });
          reasons.push(`Program group ${context.programGroupId} is not in the imported VNUA threshold table.`);
        } else if (threshold.governedByMinistry || threshold.thptMin30 === undefined) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'vnua-ministry-governed-group-threshold',
            label: `${threshold.groupId} ${threshold.groupName} follows Ministry of Education and Training threshold rules that are not modeled yet.`,
          });
          reasons.push(`${threshold.groupId} ${threshold.groupName} is governed by MOET threshold rules, so the runtime cannot conclude eligibility yet.`);
        } else if (total30 < threshold.thptMin30) {
          status = 'ineligible';
          reasons.push(`Total ${total30}/30 is below ${threshold.groupId} ${threshold.groupName}'s published THPT threshold of ${threshold.thptMin30}/30.`);
        } else {
          status = 'eligible';
          reasons.push(`Total ${total30}/30 meets ${threshold.groupId} ${threshold.groupName}'s published THPT threshold of ${threshold.thptMin30}/30.`);
        }
      }
    }
  }

  return {
    schoolId: 'vnua',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: 'vnua-threshold-notice-2026', location: thresholdLocation, verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}

const VNUA_EXACT_METHOD = vnuaAdmissionMethods[1];

export interface VnuaThptExamExactEvaluationContext {
  programGroupId?: VnuaProgramGroupId;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/**
 * VNUA 2026 — nhánh HẸP tính đủ ngưỡng đầu vào (exact), phương thức thi TN THPT, CHỈ 19/23 nhóm
 * ngành có ngưỡng số công bố (`thresholds.ts` — HVN13 Luật và HVN19 Sư phạm công nghệ theo quy
 * định Bộ GD&ĐT, ngoài phạm vi nhánh này). Ngưỡng (`vnua-threshold-notice-2026`) im lặng về việc
 * đã gồm điểm ưu tiên hay chưa — so TỔNG THÔ với ngưỡng (judgment call, cùng tiền lệ
 * `schools/hcmue`); điểm ưu tiên khu vực/đối tượng (`priority.ts`, trích từ chính
 * `vnua-admission-notice-2026`) chỉ dùng để tính ĐXT tham khảo. Điểm cộng (giải thưởng, chứng chỉ
 * ngoại ngữ, tối đa 3,0 theo `vnua-bonus-detail-not-modeled`) KHÔNG được cộng vào ĐXT tham khảo vì
 * nguồn không công bố bảng quy đổi cụ thể từng loại minh chứng sang điểm số.
 */
export function evaluateVnuaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: VnuaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'vnua',
    year: VNUA_EXACT_METHOD.year,
    methodId: VNUA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programGroupId) {
    missingRequirements.push({ kind: 'school-context', code: 'vnua-program-group', label: 'Chọn nhóm ngành VNUA (HVN01-HVN23) để tính ngưỡng đầu vào.' });
    return partial('Cần chọn nhóm ngành VNUA để tính ngưỡng đầu vào.');
  }
  const threshold = getVnuaProgramGroupThreshold(context.programGroupId);
  if (!threshold) {
    missingRequirements.push({ kind: 'school-context', code: 'vnua-program-group', label: 'Chọn một nhóm ngành VNUA hợp lệ (HVN01-HVN23).' });
    return partial(`Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng VNUA 2026 đã xác minh.`);
  }
  if (threshold.governedByMinistry || threshold.thptMin30 === undefined) {
    missingRequirements.push({
      kind: 'official-rule',
      code: 'vnua-ministry-governed-group-threshold',
      label: `${threshold.groupId} ${threshold.groupName} theo quy định của Bộ GD&ĐT, ngoài phạm vi nhánh exact này.`,
    });
    return partial(`${threshold.groupId} ${threshold.groupName} theo quy định của Bộ GD&ĐT, ngoài phạm vi nhánh exact này.`);
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'vnua-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VNUA.' });
    return partial('Cần chọn tổ hợp môn để tính ngưỡng đầu vào VNUA.');
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
        code: `vnua-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VNUA.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp VNUA đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const thresholdValue = threshold.thptMin30;
  const eligible = raw30 >= thresholdValue;
  const standardPriority30 = lookupVnuaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVnuaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);

  const reasons = [
    `Ngưỡng đầu vào VNUA 2026 (${threshold.groupId} ${threshold.groupName}): tổng điểm thô 3 môn ≥ ${thresholdValue}/30.`,
    `Tổng điểm thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng. ĐXT tham khảo (thô + ưu tiên, CHƯA gồm điểm cộng) = ${dxt30}/30.`,
  ];

  explanation.push({
    id: 'vnua-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vnuaGroupThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'vnua-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm, tham khảo)' : 'Điểm ưu tiên (tham khảo)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: vnuaPriorityFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vnua-exact-dxt',
    label: 'ĐXT tham khảo (không dùng để so ngưỡng, chưa gồm điểm cộng)',
    output: dxt30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên)',
    evidence: vnuaPriorityFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vnua-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — ĐXT tham khảo đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'vnua',
    year: VNUA_EXACT_METHOD.year,
    methodId: VNUA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vnuaGroupThresholdEvidence.evidence, ...vnuaPriorityFormulaEvidence.evidence],
  };
}

