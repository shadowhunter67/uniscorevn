import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { checkHcmupesThreshold, HCMUPES_SUBJECT_PAIRS, type HcmupesPriorityRegion } from './eligibility';
import { hcmupesAdmissionMethods } from './methods';
import { hcmupesKnowledgeGaps } from './knowledgeGaps';

const KNOWN_REGIONS: readonly HcmupesPriorityRegion[] = ['KV1', 'KV2-NT', 'KV2', 'KV3'];

export interface HcmupesEvaluationContext {
  pairId?: string;
  talentScore10?: number;
}

function isKnownRegion(value: string | undefined): value is HcmupesPriorityRegion {
  return value !== undefined && (KNOWN_REGIONS as readonly string[]).includes(value);
}

export function evaluateHcmupesAdmission(profile: ApplicantProfile, context: HcmupesEvaluationContext = {}): AdmissionEvaluation {
  const method = hcmupesAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const gapExtras = {
    missingRules: hcmupesKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: hcmupesKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  const pair = HCMUPES_SUBJECT_PAIRS.find((candidate) => candidate.id === context.pairId);
  if (!pair) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmupes-subject-pair', label: 'Chọn tổ hợp môn xét tuyển HCMUPES (T00/T01/T04/T06).' });
  }
  if (context.talentScore10 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmupes-talent-score', label: 'Nhập điểm thi năng khiếu TDTT (thang 10) HCMUPES.' });
  }
  const region = profile.priority?.region;
  if (!isKnownRegion(region)) {
    missingRequirements.push({ kind: 'profile-input', code: 'hcmupes-priority-region', label: 'Chọn khu vực ưu tiên (KV1/KV2-NT/KV2/KV3) ở hồ sơ dùng chung — ngưỡng HCMUPES phụ thuộc khu vực.' });
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
          code: `hcmupes-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HCMUPES.`,
        }))
      );
    }

    if (scoreA !== undefined && scoreB !== undefined && context.talentScore10 !== undefined && isKnownRegion(region)) {
      const culturalTotal = Math.round((scoreA + scoreB) * 100) / 100;
      const result = checkHcmupesThreshold(culturalTotal, context.talentScore10, region);
      reasons.push(result.requiredText);
      explanation.push({
        id: 'hcmupes-total-threshold',
        label: 'Ngưỡng đầu vào HCMUPES 2026 (thi TN THPT + năng khiếu TDTT, ngành GDTC)',
        output: culturalTotal + context.talentScore10,
        scale: 30,
        formula: result.requiredText,
        evidence: [{ sourceId: 'hcmupes-gdtc-threshold-2026', location: 'Thông báo 05/TB-HĐTS, mục 1', verification: 'verified', effectiveYear: 2026 }],
      });
      status = result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'hcmupes',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn, khu vực ưu tiên, nhập điểm 2 môn văn hóa và điểm năng khiếu TDTT để kiểm tra ngưỡng HCMUPES.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [{ sourceId: 'hcmupes-gdtc-threshold-2026', location: 'Thông báo 05/TB-HĐTS, mục 1', verification: 'verified', effectiveYear: 2026 }],
  };
}
