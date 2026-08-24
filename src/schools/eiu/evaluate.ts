import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { eiuAdmissionMethods } from './methods';
import { eiuKnowledgeGaps } from './knowledgeGaps';
import { checkEiuThptExamThreshold, checkEiuTranscriptThreshold, checkEiuVactThreshold, type EiuProgram } from './eligibility';

export interface EiuSubjectContext {
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

/** Điểm trung bình chung 6 học kỳ (cả năm lớp 10, 11, 12) — mỗi môn lấy trung bình 3 năm rồi
 * cộng lại (chỉ tính khi ĐỦ cả 3 năm cho môn đó, không suy đoán năm thiếu). */
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
    missingRules: eiuKnowledgeGaps.map((gap) => gap.label),
    missingRequirements: eiuKnowledgeGaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };
}

export interface EiuThptExamEvaluationContext {
  program?: EiuProgram;
  subjectContext?: EiuSubjectContext;
}

/** Phương thức 1 — xét kết quả thi TN THPT 2026, điểm thô thang 30. */
export function evaluateEiuThptExamAdmission(profile: ApplicantProfile, context: EiuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = eiuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const program: EiuProgram = context.program ?? 'standard';
  const gapExtras = buildGapExtras();

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'eiu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển EIU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào EIU.');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `eiu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp EIU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkEiuThptExamThreshold(total30, program);
      reasons.push(result.requiredText);
      explanation.push({ id: 'eiu-thpt-exam-threshold', label: 'Ngưỡng đầu vào EIU 2026 (thi TN THPT)', output: total30, scale: 30, formula: result.requiredText });
      status = result.pass === 'unknown' ? 'unknown' : result.pass ? 'eligible' : 'ineligible';
    }
  }

  return {
    schoolId: 'eiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng EIU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

export interface EiuTranscriptEvaluationContext {
  program?: EiuProgram;
  subjectContext?: EiuSubjectContext;
}

/** Phương thức 2 — xét học bạ THPT, điểm trung bình chung 6 học kỳ (lớp 10/11/12) của 3 môn tổ
 * hợp, thang 30. Thí sinh tốt nghiệp THPT từ 2026 cần đồng thời đạt ngưỡng thi TN THPT 2026
 * (≥15/30) — nếu chưa biết năm tốt nghiệp, evaluator trả `unknown` thay vì giả định. */
export function evaluateEiuTranscriptAdmission(profile: ApplicantProfile, context: EiuTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const method = eiuAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const program: EiuProgram = context.program ?? 'standard';
  const gapExtras = buildGapExtras();

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'eiu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển EIU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào EIU.');
  } else {
    const { total30, missingSubjects } = sumTranscriptAverageTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm học bạ cả 3 năm (lớp 10, 11, 12) cho tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `eiu-transcript-${subjectId}`,
          label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} cả 3 năm lớp 10, 11, 12.`,
        }))
      );
    }

    if (total30 !== undefined) {
      const result = checkEiuTranscriptThreshold(total30, program);
      reasons.push(result.requiredText);
      explanation.push({ id: 'eiu-transcript-threshold', label: 'Ngưỡng đầu vào EIU 2026 (học bạ)', output: total30, scale: 30, formula: result.requiredText });

      if (result.pass === 'unknown') {
        status = 'unknown';
      } else if (!result.pass) {
        status = 'ineligible';
      } else if (profile.graduationYear === undefined) {
        status = 'unknown';
        missingRequirements.push({
          kind: 'profile-input',
          code: 'eiu-graduation-year',
          label: 'Năm tốt nghiệp THPT (thí sinh tốt nghiệp từ 2026 cần thêm điều kiện điểm thi TN THPT ≥15/30).',
        });
        reasons.push('Cần biết năm tốt nghiệp THPT: thí sinh tốt nghiệp từ 2026 phải đồng thời đạt ngưỡng thi TN THPT 2026 (≥15/30) để dùng phương thức học bạ.');
      } else if (profile.graduationYear >= 2026) {
        const { total30: thptTotal30, missingSubjects: missingThptSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
        if (missingThptSubjects.length > 0) {
          status = 'unknown';
          missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT 2026 để kiểm tra điều kiện kết hợp (thí sinh tốt nghiệp từ 2026).');
          missingRequirements.push(
            ...missingThptSubjects.map((subjectId) => ({
              kind: 'profile-input' as const,
              code: `eiu-thpt-${subjectId}`,
              label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} (điều kiện kết hợp học bạ, thí sinh tốt nghiệp từ 2026).`,
            }))
          );
        } else if (thptTotal30 !== undefined) {
          const combinedResult = checkEiuThptExamThreshold(thptTotal30, program);
          reasons.push(`Điều kiện kết hợp (thí sinh tốt nghiệp từ 2026): ${combinedResult.requiredText}`);
          status = combinedResult.pass === 'unknown' ? 'unknown' : combinedResult.pass ? 'eligible' : 'ineligible';
        }
      } else {
        status = 'eligible';
      }
    }
  }

  return {
    schoolId: 'eiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm học bạ 3 năm để kiểm tra ngưỡng EIU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

export interface EiuVactEvaluationContext {
  program?: EiuProgram;
  subjectContext?: EiuSubjectContext;
}

/** Phương thức 3 — xét ĐGNL ĐHQG-HCM 2026, điểm thô thang 1200, khớp trực tiếp
 * `ApplicantProfile.exams.vact.total`. Cùng điều kiện kết hợp cho thí sinh tốt nghiệp từ 2026
 * như phương thức học bạ (cần chọn tổ hợp môn để kiểm tra điều kiện kết hợp này). */
export function evaluateEiuVactAdmission(profile: ApplicantProfile, context: EiuVactEvaluationContext = {}): AdmissionEvaluation {
  const method = eiuAdmissionMethods[2];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const program: EiuProgram = context.program ?? 'standard';
  const gapExtras = buildGapExtras();

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  const vactTotal = profile.exams?.vact?.total;
  if (vactTotal === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'eiu-vact-total', label: 'Điểm thi ĐGNL ĐHQG-HCM (thang 1200).' });
    reasons.push('Cần điểm thi ĐGNL ĐHQG-HCM để kiểm tra ngưỡng EIU.');
  } else {
    const result = checkEiuVactThreshold(vactTotal, program);
    reasons.push(result.requiredText);
    explanation.push({ id: 'eiu-vact-threshold', label: 'Ngưỡng đầu vào EIU 2026 (ĐGNL ĐHQG-HCM)', output: vactTotal, scale: 1200, formula: result.requiredText });

    if (result.pass === 'unknown') {
      status = 'unknown';
    } else if (!result.pass) {
      status = 'ineligible';
    } else if (profile.graduationYear === undefined) {
      status = 'unknown';
      missingRequirements.push({
        kind: 'profile-input',
        code: 'eiu-graduation-year',
        label: 'Năm tốt nghiệp THPT (thí sinh tốt nghiệp từ 2026 cần thêm điều kiện điểm thi TN THPT ≥15/30).',
      });
      reasons.push('Cần biết năm tốt nghiệp THPT: thí sinh tốt nghiệp từ 2026 phải đồng thời đạt ngưỡng thi TN THPT 2026 (≥15/30) để dùng phương thức ĐGNL.');
    } else if (profile.graduationYear >= 2026) {
      if (!context.subjectContext) {
        status = 'unknown';
        missingRequirements.push({ kind: 'school-context', code: 'eiu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển EIU để kiểm tra điều kiện kết hợp (thí sinh tốt nghiệp từ 2026).' });
      } else {
        const { total30: thptTotal30, missingSubjects: missingThptSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
        if (missingThptSubjects.length > 0) {
          status = 'unknown';
          missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT 2026 để kiểm tra điều kiện kết hợp (thí sinh tốt nghiệp từ 2026).');
          missingRequirements.push(
            ...missingThptSubjects.map((subjectId) => ({
              kind: 'profile-input' as const,
              code: `eiu-thpt-${subjectId}`,
              label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} (điều kiện kết hợp ĐGNL, thí sinh tốt nghiệp từ 2026).`,
            }))
          );
        } else if (thptTotal30 !== undefined) {
          const combinedResult = checkEiuThptExamThreshold(thptTotal30, program);
          reasons.push(`Điều kiện kết hợp (thí sinh tốt nghiệp từ 2026): ${combinedResult.requiredText}`);
          status = combinedResult.pass === 'unknown' ? 'unknown' : combinedResult.pass ? 'eligible' : 'ineligible';
        }
      }
    } else {
      status = 'eligible';
    }
  }

  return {
    schoolId: 'eiu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}
