import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { EAUT_TRANSCRIPT_THRESHOLD, EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR } from './eligibility';
import { sumCombinationAveragesAcrossSemesters, TRANSCRIPT_SEMESTER_LABELS } from '../../core/transcriptSemesters';
import { eautAdmissionMethods } from './methods';
import { getEautProgram } from './programs';

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

const EAUT_EXACT_METHOD = eautAdmissionMethods.find((method) => method.id === 'eaut-transcript-program-exact-2026')!;
const EAUT_EXACT_EVIDENCE = [
  {
    sourceId: 'eaut-admission-methods-2026',
    location:
      'Bài "Trường ĐH Công nghệ Đông Á công bố 4 Phương thức tuyển sinh năm 2026" — Phương thức 1: TB tổ hợp 3 môn trong 6 học kỳ ≥ 18 điểm, điều kiện bắt buộc điểm thi tốt nghiệp THPT 2026 ≥ 15 điểm; ảnh "Các ngành đào tạo - Mã trường DDA" (tổ hợp theo ngành)',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export interface EautProgramEvaluationContext {
  /** Mã ngành (VD '7480201'). */
  programCode?: string;
  subjectContext?: EautSubjectContext;
}

/** EAUT 2026 Phương thức 1: TB 6 học kỳ tổ hợp ≥ 18 VÀ tổng điểm thi TN THPT tổ hợp ≥ 15, theo ngành + tổ hợp hợp lệ. */
export function evaluateEautTranscriptExactAdmission(profile: ApplicantProfile, context: EautProgramEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'eaut',
    year: EAUT_EXACT_METHOD.year,
    methodId: EAUT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getEautProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'eaut-program', label: 'Chọn ngành EAUT (mã ngành, VD 7480201).' });
    return unknown('Cần chọn ngành EAUT để kiểm tra tổ hợp xét tuyển hợp lệ.');
  }
  if (!program.combinations) {
    missingRequirements.push({ kind: 'official-rule', code: 'eaut-program-out-of-exact-scope', label: `${program.name}: ${program.outOfScopeReason ?? 'chưa mô hình hoá.'}` });
    return unknown(`Ngành ${program.name} của EAUT chưa nằm trong phạm vi tính exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'eaut-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của EAUT.' });
    return unknown('Cần chọn tổ hợp 3 môn để kiểm tra ngưỡng EAUT.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !program.combinations.includes(combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'eaut-combination-for-program',
      label: `Tổ hợp ${combinationId ?? ''} không có trong danh sách xét tuyển của ngành ${program.name}.`,
    });
    return unknown(`Tổ hợp ${combinationId ?? ''} không thuộc ngành ${program.name}.`);
  }

  const transcript = sumCombinationAveragesAcrossSemesters(profile.transcript?.bySemester, subjects);
  const thpt = sumThptTotal(profile, subjects);
  if (transcript.total30 === undefined || thpt.total30 === undefined) {
    if (transcript.total30 === undefined) {
      for (const { subjectId, missingSemesters } of transcript.missingBySubject) {
        missingRequirements.push({
          kind: 'profile-input',
          code: `eaut-transcript-semesters-${subjectId}`,
          label: `Điểm học bạ 6 học kỳ môn ${SUBJECT_LABELS[subjectId]} (thiếu ${missingSemesters.map((key) => TRANSCRIPT_SEMESTER_LABELS[key]).join(', ')}).`,
        });
      }
    }
    for (const subjectId of thpt.missingSubjects) {
      missingRequirements.push({ kind: 'profile-input', code: `eaut-thpt-${subjectId}`, label: `Điểm thi tốt nghiệp THPT 2026 môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp EAUT.` });
    }
    return unknown('Cần đủ điểm học bạ 6 học kỳ và điểm thi tốt nghiệp THPT 3 môn của tổ hợp để kiểm tra ngưỡng EAUT.', [
      ...(transcript.total30 === undefined ? ['Chưa đủ điểm học bạ 6 học kỳ của 3 môn trong tổ hợp đã chọn.'] : []),
      ...(thpt.total30 === undefined ? ['Chưa đủ điểm thi tốt nghiệp THPT 3 môn trong tổ hợp đã chọn.'] : []),
    ]);
  }

  const transcriptPass = transcript.total30 >= EAUT_TRANSCRIPT_THRESHOLD.min30;
  const thptPass = thpt.total30 >= EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.min30;
  const explanation: CalculationStep[] = [
    {
      id: 'eaut-exact-transcript',
      label: 'Điểm học bạ: tổng TB 6 học kỳ của 3 môn tổ hợp',
      output: transcript.total30,
      scale: 30,
      formula: 'Σ (TB 6 học kỳ từng môn), không làm tròn từng môn',
      evidence: EAUT_EXACT_EVIDENCE,
    },
    {
      id: 'eaut-exact-thpt',
      label: 'Điều kiện bắt buộc: tổng điểm thi tốt nghiệp THPT 2026 của tổ hợp',
      output: thpt.total30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: EAUT_EXACT_EVIDENCE,
    },
  ];
  missingRequirements.push(
    {
      kind: 'official-rule',
      code: 'eaut-priority-not-in-condition',
      label: 'Điều kiện của EAUT nêu trên điểm trung bình/điểm thi, không nhắc điểm ưu tiên nên không cộng ưu tiên; điểm xét tuyển cuối (xếp hạng) và các phương thức 2-4 chưa mô hình hoá.',
    },
    { kind: 'official-rule', code: 'eaut-talent-subjects-not-modeled', label: 'Khối H/V và bài thi năng khiếu (Kiến trúc, Thiết kế đồ họa số) chưa mô hình hoá.' }
  );

  return {
    schoolId: 'eaut',
    year: EAUT_EXACT_METHOD.year,
    methodId: EAUT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: transcriptPass && thptPass ? 'eligible' : 'ineligible',
      reasons: [
        `Học bạ 6 học kỳ ${transcript.total30}/30 ${transcriptPass ? 'đạt' : 'chưa đạt'} mức tối thiểu ${EAUT_TRANSCRIPT_THRESHOLD.min30}/30.`,
        `Điểm thi tốt nghiệp THPT ${thpt.total30}/30 ${thptPass ? 'đạt' : 'chưa đạt'} điều kiện bắt buộc ${EAUT_TRANSCRIPT_GRADUATION_EXAM_FLOOR.min30}/30.`,
      ],
    },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...EAUT_EXACT_EVIDENCE],
  };
}
