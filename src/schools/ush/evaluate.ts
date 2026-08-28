import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { checkUshThreshold, USH_SUBJECT_PAIRS } from './eligibility';
import { ushAdmissionMethods } from './methods';
import { ushKnowledgeGaps } from './knowledgeGaps';
import { calculateUshEffectivePriority30, lookupUshStandardPriority30 } from './priority';
import { ushDxtFormulaEvidence, ushThresholdEvidence } from './evidence';

export interface UshEvaluationContext {
  pairId?: string;
  talentScore10?: number;
}

export function evaluateUshAdmission(profile: ApplicantProfile, context: UshEvaluationContext = {}): AdmissionEvaluation {
  const method = ushAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const gapExtras = {
    missingRules: ushKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: ushKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  const pair = USH_SUBJECT_PAIRS.find((candidate) => candidate.id === context.pairId);
  if (!pair) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-subject-pair', label: 'Chọn tổ hợp môn xét tuyển USH (T00/T01/T04/T06).' });
  }
  if (context.talentScore10 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-talent-score', label: 'Nhập điểm thi năng khiếu TDTT (thang 10) USH.' });
  }

  if (pair) {
    const [subjectA, subjectB] = pair.subjects;
    const scoreA = profile.thpt?.scores?.[subjectA];
    const scoreB = profile.thpt?.scores?.[subjectB];
    const missingSubjects: SubjectId[] = [];
    if (scoreA === undefined) missingSubjects.push(subjectA);
    if (scoreB === undefined) missingSubjects.push(subjectB);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 2 môn văn hóa trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ush-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp USH.`,
        }))
      );
    }

    if (scoreA !== undefined && scoreB !== undefined && context.talentScore10 !== undefined) {
      const culturalTotal = Math.round((scoreA + scoreB) * 100) / 100;
      const result = checkUshThreshold(culturalTotal, context.talentScore10);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'ush-total-threshold',
        label: 'Ngưỡng đầu vào USH 2026 (thi TN THPT + năng khiếu TDTT)',
        output: culturalTotal + context.talentScore10,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'ush-admission-notice-2026', location: 'Thông báo 10/TB-TDTTHCM, mục 7.2', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'ush',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn, nhập điểm 2 môn văn hóa và điểm năng khiếu TDTT để kiểm tra ngưỡng USH.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'ush-admission-notice-2026', location: 'Thông báo 10/TB-TDTTHCM, mục 7.2', verification: 'verified', effectiveYear: 2026 }],
  };
}

const USH_EXACT_METHOD = ushAdmissionMethods[1];

/**
 * USH 2026 — nhánh exact, PT1 (mã 405), nhóm ngành Huấn luyện thể thao/Quản lý TDTT/Y sinh học
 * TDTT. Quyết định 58/QĐ-TDTTHCM mục 3.2.b xác nhận ngưỡng đầu vào là tổng THÔ (KHÔNG cộng ưu
 * tiên) 2 môn văn hóa + năng khiếu TDTT ≥ 15,00/30, đồng thời năng khiếu riêng ≥ 5,00/10 — eligible
 * dựa trên ngưỡng này (giống base method). Mục 2.1 xác nhận thêm công thức ĐXT = ĐVH1 + ĐVH2 + ĐNK
 * + Điểm ưu tiên + Điểm cộng — ĐXT (đã gồm ưu tiên) là điểm dùng để XẾP HẠNG CẠNH TRANH (không
 * phải điều kiện đạt/chưa đạt ngưỡng đầu vào), hiển thị thêm để tham khảo. Mức điểm ưu tiên KV/ĐT
 * cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateUshThptExamExactAdmission(profile: ApplicantProfile, context: UshEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'ush',
    year: USH_EXACT_METHOD.year,
    methodId: USH_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const pair = USH_SUBJECT_PAIRS.find((candidate) => candidate.id === context.pairId);
  if (!pair) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-exact-subject-pair', label: 'Chọn tổ hợp môn xét tuyển USH (T00/T01/T04/T06).' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển USH.');
  }
  if (context.talentScore10 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ush-exact-talent-score', label: 'Nhập điểm thi năng khiếu TDTT (thang 10) USH.' });
    return partial('Cần nhập điểm thi năng khiếu TDTT để tính điểm xét tuyển USH.');
  }

  const [subjectA, subjectB] = pair.subjects;
  const scoreA = profile.thpt?.scores?.[subjectA];
  const scoreB = profile.thpt?.scores?.[subjectB];
  const missingSubjects: SubjectId[] = [];
  if (scoreA === undefined) missingSubjects.push(subjectA);
  if (scoreB === undefined) missingSubjects.push(subjectB);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ush-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp USH.`,
      }))
    );
    return partial('Cần đủ điểm 2 môn văn hóa trong tổ hợp đã chọn.');
  }

  const culturalTotal = round2((scoreA as number) + (scoreB as number));
  const raw30 = round2(culturalTotal + context.talentScore10);
  const eligibleResult = checkUshThreshold(culturalTotal, context.talentScore10);

  const standardPriority30 = lookupUshStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUshEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const reasons = [
    eligibleResult.requiredText,
    `Tổng thô (2 môn văn hóa + năng khiếu) = ${raw30}/30, năng khiếu riêng = ${context.talentScore10}/10 → ${eligibleResult.pass ? 'đạt' : 'chưa đạt'} ngưỡng đầu vào.`,
    `Điểm xét tuyển (ĐXT, đã gồm điểm ưu tiên ${priority.effectivePriority30}/30, dùng để xếp hạng cạnh tranh — KHÔNG phải điều kiện đạt ngưỡng) = ${dxt30}/30.`,
  ];

  explanation.push({
    id: 'ush-exact-raw',
    label: 'Tổng thô (2 môn văn hóa + năng khiếu TDTT)',
    output: raw30,
    scale: 30,
    formula: `${SUBJECT_LABELS[subjectA]} + ${SUBJECT_LABELS[subjectB]} + Năng khiếu TDTT`,
    evidence: ushThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'ush-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm, chỉ cộng vào ĐXT)' : 'Điểm ưu tiên (chỉ cộng vào ĐXT)',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: ushDxtFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ush-exact-dxt',
    label: 'Điểm xét tuyển (ĐXT, tham khảo — dùng để xếp hạng cạnh tranh)',
    output: dxt30,
    scale: 30,
    formula: 'min(30, round2(tổng thô + điểm ưu tiên hiệu lực))',
    evidence: ushDxtFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ush-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — ĐXT đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ush',
    year: USH_EXACT_METHOD.year,
    methodId: USH_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibleResult.pass ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ushThresholdEvidence.evidence, ...ushDxtFormulaEvidence.evidence],
  };
}
