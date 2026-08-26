import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { EAUT_TRANSCRIPT_THRESHOLD, EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR } from './eligibility';
import { eautAdmissionMethods } from './methods';

export interface EautSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface EautTranscriptEvaluationContext {
  subjectContext?: EautSubjectContext;
}

/** Điểm trung bình 3 môn tổ hợp qua 6 học kỳ (lớp 10, 11, 12) — mỗi môn lấy trung bình 3 năm rồi
 * cộng lại, chỉ tính khi ĐỦ cả 3 năm cho môn đó, không suy đoán năm thiếu. */
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

export function evaluateEautTranscriptAdmission(profile: ApplicantProfile, context: EautTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const method = eautAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'eaut-subject-combination', label: 'Chọn tổ hợp môn xét tuyển EAUT.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào EAUT.');
  } else {
    const { subjects } = context.subjectContext;
    const transcript = sumTranscriptAverageTotal(profile, subjects);
    const thpt = sumThptTotal(profile, subjects);

    if (transcript.missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm học bạ cả 3 năm (lớp 10, 11, 12) cho tổ hợp đã chọn.');
      missingRequirements.push(
        ...transcript.missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `eaut-transcript-${subjectId}`,
          label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} cả 3 năm lớp 10, 11, 12.`,
        }))
      );
    }
    if (thpt.missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm thi tốt nghiệp THPT 2026 trong tổ hợp đã chọn (điều kiện kèm theo).');
      missingRequirements.push(
        ...thpt.missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `eaut-thpt-${subjectId}`,
          label: `Điểm thi tốt nghiệp THPT 2026 môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp EAUT.`,
        }))
      );
    }

    let transcriptPass: boolean | undefined;
    if (transcript.total30 !== undefined) {
      explanation.push({
        id: 'eaut-transcript-threshold',
        label: 'Ngưỡng đầu vào EAUT 2026 (học bạ, trung bình 6 học kỳ)',
        output: transcript.total30,
        scale: 30,
        formula: EAUT_TRANSCRIPT_THRESHOLD.requiredText,
        evidence: [{ sourceId: 'eaut-admission-methods-2026', location: 'Phương thức 1 - xét học bạ THPT', verification: 'verified', effectiveYear: 2026 }],
      });
      transcriptPass = transcript.total30 >= EAUT_TRANSCRIPT_THRESHOLD.min30;
      reasons.push(
        transcriptPass
          ? `Điểm học bạ trung bình 6 học kỳ ${transcript.total30}/30 đạt ngưỡng ${EAUT_TRANSCRIPT_THRESHOLD.min30}/30.`
          : `Điểm học bạ trung bình 6 học kỳ ${transcript.total30}/30 thấp hơn ngưỡng ${EAUT_TRANSCRIPT_THRESHOLD.min30}/30.`
      );
    }

    let thptPass: boolean | undefined;
    if (thpt.total30 !== undefined) {
      explanation.push({
        id: 'eaut-thpt-graduation-floor',
        label: 'Điều kiện kèm theo: điểm thi tốt nghiệp THPT 2026',
        output: thpt.total30,
        scale: 30,
        formula: EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.requiredText,
        evidence: [{ sourceId: 'eaut-admission-methods-2026', location: 'Phương thức 1 - xét học bạ THPT', verification: 'verified', effectiveYear: 2026 }],
      });
      thptPass = thpt.total30 >= EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.min30;
      reasons.push(
        thptPass
          ? `Điểm thi tốt nghiệp THPT ${thpt.total30}/30 đạt điều kiện kèm theo ${EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.min30}/30.`
          : `Điểm thi tốt nghiệp THPT ${thpt.total30}/30 thấp hơn điều kiện kèm theo ${EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.min30}/30.`
      );
    }

    if (transcriptPass === false || thptPass === false) {
      status = 'ineligible';
    } else if (transcriptPass === true && thptPass === true) {
      status = 'eligible';
    }
  }

  const gaps = method.knowledgeGaps ?? [];
  return {
    schoolId: 'eaut',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: {
      status,
      reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm học bạ 3 năm + điểm thi tốt nghiệp THPT để kiểm tra ngưỡng EAUT.'],
    },
    missingInputs,
    missingRules: gaps.map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...gaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [{ sourceId: 'eaut-admission-methods-2026', location: 'Phương thức 1 - xét học bạ THPT', verification: 'verified', effectiveYear: 2026 }],
  };
}
