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
