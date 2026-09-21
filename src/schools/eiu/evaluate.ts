import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { eiuAdmissionMethods } from './methods';
import { eiuKnowledgeGaps } from './knowledgeGaps';
import { sumCombinationAveragesAcrossSemesters, TRANSCRIPT_SEMESTER_LABELS } from '../../core/transcriptSemesters';
import { checkEiuThptExamThreshold, checkEiuTranscriptThreshold, checkEiuVactThreshold, EIU_THPT_EXAM_THRESHOLD_30, EIU_TRANSCRIPT_THRESHOLD_30, type EiuProgram } from './eligibility';
import { getEiuProgram } from './programs';

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

const EIU_EXACT_METHOD = eiuAdmissionMethods.find((method) => method.id === 'eiu-program-exact-2026')!;
const EIU_EXACT_EVIDENCE = [
  {
    sourceId: 'eiu-admission-scheme-2026',
    location:
      'Đề án tuyển sinh 2026 (eiu.edu.vn): bảng ngành + tổ hợp; PT1 tổng 3 môn thi TN THPT ≥ 15; PT2 tổng TB học bạ 6 kỳ của 3 môn ≥ 18 kèm điểm thi TN THPT ≥ 15 (tổ hợp hoặc Toán, Văn + môn khác); Điều dưỡng theo ngưỡng Bộ GD&ĐT',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export type EiuExactPathway = 'thpt' | 'transcript';

export interface EiuProgramExactContext {
  /** Mã ngành (VD '7480103'). */
  programCode?: string;
  subjectContext?: EiuSubjectContext;
  /** 'thpt' (mặc định): xét điểm thi TN THPT; 'transcript': xét học bạ 6 học kỳ. */
  pathway?: EiuExactPathway;
}

function roundTwo(value: number): number {
  return Math.round(value * 100) / 100;
}

/** EIU 2026 theo ngành (trừ Điều dưỡng): PT thi TN THPT (≥15) hoặc PT học bạ 6 học kỳ (≥18 kèm điều kiện điểm thi ≥15). */
export function evaluateEiuProgramExactAdmission(profile: ApplicantProfile, context: EiuProgramExactContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const pathway: EiuExactPathway = context.pathway ?? 'thpt';
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'eiu',
    year: EIU_EXACT_METHOD.year,
    methodId: EIU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getEiuProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'eiu-program', label: 'Chọn ngành EIU (mã ngành, VD 7480103).' });
    return unknown('Cần chọn ngành EIU để kiểm tra tổ hợp xét tuyển hợp lệ.');
  }
  if (!program.combinations) {
    missingRequirements.push({ kind: 'official-rule', code: 'eiu-program-out-of-exact-scope', label: `${program.name}: ${program.outOfScopeReason ?? 'chưa mô hình hoá.'}` });
    return unknown(`Ngành ${program.name} của EIU chưa nằm trong phạm vi tính exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'eiu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của EIU.' });
    return unknown('Cần chọn tổ hợp 3 môn để kiểm tra ngưỡng EIU.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !program.combinations.includes(combinationId)) {
    missingRequirements.push({ kind: 'school-context', code: 'eiu-combination-for-program', label: `Tổ hợp ${combinationId ?? ''} không có trong danh sách xét tuyển của ngành ${program.name}.` });
    return unknown(`Tổ hợp ${combinationId ?? ''} không thuộc ngành ${program.name}.`);
  }

  const thptScores = profile.thpt?.scores ?? {};
  const comboMissing = subjects.filter((subjectId) => thptScores[subjectId] === undefined);
  const comboTotal = comboMissing.length === 0 ? roundTwo(subjects.reduce((sum, subjectId) => sum + thptScores[subjectId]!, 0)) : undefined;
  const explanation: CalculationStep[] = [];

  if (pathway === 'thpt') {
    if (comboTotal === undefined) {
      missingRequirements.push(...comboMissing.map((subjectId) => ({ kind: 'profile-input' as const, code: `eiu-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp EIU.` })));
      return unknown('Cần đủ điểm 3 môn của tổ hợp để kiểm tra ngưỡng EIU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
    }
    explanation.push({ id: 'eiu-exact-thpt', label: 'Tổng điểm 3 môn thi TN THPT 2026 (thô)', output: comboTotal, scale: 30, formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '), evidence: EIU_EXACT_EVIDENCE });
    const pass = comboTotal >= EIU_THPT_EXAM_THRESHOLD_30;
    missingRequirements.push({ kind: 'official-rule', code: 'eiu-final-score-not-modeled', label: 'Chỉ kiểm tra ngưỡng nhận hồ sơ: không cộng ưu tiên (điều kiện không nhắc), chưa có điểm xét tuyển cuối/điểm chuẩn, ĐGNL và xét tuyển thẳng chưa hỗ trợ.' });
    return {
      schoolId: 'eiu',
      year: EIU_EXACT_METHOD.year,
      methodId: EIU_EXACT_METHOD.id,
      confidence: 'exact-verified',
      eligibility: { status: pass ? 'eligible' : 'ineligible', reasons: [`Tổng ${comboTotal}/30 ${pass ? 'đạt' : 'chưa đạt'} ngưỡng ${EIU_THPT_EXAM_THRESHOLD_30}/30 (thi TN THPT 2026, ngành ${program.name}).`] },
      missingInputs: [],
      missingRules: [],
      missingRequirements,
      explanation,
      evidence: [...EIU_EXACT_EVIDENCE],
    };
  }

  const transcript = sumCombinationAveragesAcrossSemesters(profile.transcript?.bySemester, subjects);
  if (transcript.total30 === undefined) {
    for (const { subjectId, missingSemesters } of transcript.missingBySubject) {
      missingRequirements.push({
        kind: 'profile-input',
        code: `eiu-transcript-semesters-${subjectId}`,
        label: `Điểm học bạ 6 học kỳ môn ${SUBJECT_LABELS[subjectId]} (thiếu ${missingSemesters.map((key) => TRANSCRIPT_SEMESTER_LABELS[key]).join(', ')}).`,
      });
    }
    return unknown('Cần đủ điểm học bạ 6 học kỳ của 3 môn trong tổ hợp để kiểm tra ngưỡng học bạ EIU.', ['Chưa đủ điểm học bạ 6 học kỳ của 3 môn trong tổ hợp đã chọn.']);
  }
  explanation.push({ id: 'eiu-exact-transcript', label: 'Tổng TB 6 học kỳ của 3 môn tổ hợp', output: transcript.total30, scale: 30, formula: 'Σ (TB 6 học kỳ từng môn)', evidence: EIU_EXACT_EVIDENCE });
  const transcriptPass = transcript.total30 >= EIU_TRANSCRIPT_THRESHOLD_30;

  // Điều kiện điểm thi TN THPT ≥ 15: tổ hợp xét tuyển, hoặc Toán + Ngữ văn + 1 môn thi khác.
  const math = thptScores.math;
  const literature = thptScores.literature;
  const otherScores = (Object.entries(thptScores) as [SubjectId, number | undefined][])
    .filter(([subjectId, score]) => subjectId !== 'math' && subjectId !== 'literature' && score !== undefined)
    .map(([, score]) => score!);
  const altTotal = math !== undefined && literature !== undefined && otherScores.length > 0 ? roundTwo(math + literature + Math.max(...otherScores)) : undefined;
  let thptCondition: 'pass' | 'fail' | 'unknown';
  if ((comboTotal !== undefined && comboTotal >= EIU_THPT_EXAM_THRESHOLD_30) || (altTotal !== undefined && altTotal >= EIU_THPT_EXAM_THRESHOLD_30)) thptCondition = 'pass';
  else if (comboTotal !== undefined && altTotal !== undefined) thptCondition = 'fail';
  else thptCondition = 'unknown';
  if (comboTotal !== undefined) {
    explanation.push({ id: 'eiu-exact-thpt-condition', label: 'Điều kiện kèm theo: tổng 3 môn thi TN THPT 2026 của tổ hợp', output: comboTotal, scale: 30, formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '), evidence: EIU_EXACT_EVIDENCE });
  }

  const reasons = [`Học bạ 6 học kỳ ${transcript.total30}/30 ${transcriptPass ? 'đạt' : 'chưa đạt'} ngưỡng ${EIU_TRANSCRIPT_THRESHOLD_30}/30.`];
  let status: 'eligible' | 'ineligible' | 'unknown';
  if (!transcriptPass || thptCondition === 'fail') {
    status = 'ineligible';
    if (thptCondition === 'fail') reasons.push(`Điểm thi TN THPT (tổ hợp ${comboTotal}/30${altTotal !== undefined ? `, hoặc Toán + Văn + môn khác ${altTotal}/30` : ''}) chưa đạt điều kiện kèm theo ${EIU_THPT_EXAM_THRESHOLD_30}/30.`);
  } else if (thptCondition === 'pass') {
    status = 'eligible';
    reasons.push(`Điểm thi TN THPT đạt điều kiện kèm theo ${EIU_THPT_EXAM_THRESHOLD_30}/30.`);
  } else {
    status = 'unknown';
    reasons.push('Đủ điều kiện học bạ nhưng chưa đủ điểm thi TN THPT để kiểm tra điều kiện kèm theo (≥ 15/30, tổ hợp hoặc Toán + Văn + môn khác).');
    missingRequirements.push(
      ...comboMissing.map((subjectId) => ({ kind: 'profile-input' as const, code: `eiu-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} (điều kiện kèm theo của phương thức học bạ).` }))
    );
  }
  missingRequirements.push({ kind: 'official-rule', code: 'eiu-final-score-not-modeled', label: 'Chỉ kiểm tra ngưỡng nhận hồ sơ: không cộng ưu tiên (điều kiện không nhắc), chưa có điểm xét tuyển cuối/điểm chuẩn, ĐGNL và xét tuyển thẳng chưa hỗ trợ.' });

  return {
    schoolId: 'eiu',
    year: EIU_EXACT_METHOD.year,
    methodId: EIU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...EIU_EXACT_EVIDENCE],
  };
}
