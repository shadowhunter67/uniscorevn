import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { hcmulawAdmissionMethods } from './methods';
import { findHcmulawProgram, findHcmulawCombination, type HcmulawProgramId } from './programs';
import { checkHcmulawThreshold, checkHcmulawThpt5Threshold } from './eligibility';
import {
  calculateHcmulawSubjectGroupScore,
  calculateHcmulawThpt5FinalScore,
  calculateHcmulawVsat4SubjectGroupScore,
  calculateHcmulawVsat4FinalScore,
  calculateHcmulawPriorityHighschool3FinalScore,
  calculateHcmulawCombined2FinalScore,
} from './calculator';
import { calculateHcmulawMethod2Bonus, hasHcmulawMethod2QualifyingCertificate, type HcmulawMethod2BonusResult } from './bonus';
import { calculateHcmulawPriority30, lookupHcmulawStandardPriority30 } from './priority';
import { convertHcmulawVsatSubjectScore, convertHcmulawTranscriptCombinationScore, getHcmulawTranscriptK } from './conversionTable';
import { sumCombinationAveragesAcrossSemesters, TRANSCRIPT_SEMESTER_LABELS } from '../../core/transcriptSemesters';
import {
  hcmulawFormulaEvidence,
  hcmulawThresholdEvidence,
  hcmulawPriorityEvidence,
  hcmulawVsatConversionEvidence,
  hcmulawTranscriptConversionEvidence,
  hcmulawMethod2BonusEvidence,
} from './evidence';

function partial(methodId: string, year: number, input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; eligibilityReason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hcmulaw',
    year,
    methodId,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.eligibilityReason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

export interface HcmulawTranscriptEvaluationContext {
  programId?: HcmulawProgramId;
  combinationCode?: string;
}

interface TranscriptConversionResult {
  /** `undefined` = chưa tính được; caller trả về `partialResult` kèm sẵn. */
  converted30?: number;
  x30?: number;
  k?: number;
  program?: ReturnType<typeof findHcmulawProgram>;
  combination?: ReturnType<typeof findHcmulawCombination>;
  partialResult?: AdmissionEvaluation;
}

/**
 * Phần DÙNG CHUNG của Phương thức 2 và 3: resolve ngành/tổ hợp → x (tổng TB 6 học kỳ của 3 môn, đọc
 * từ `profile.transcript.bySemester`) → y = x - k (`conversionTable.ts`).
 *
 * Gap granularity đã ĐÓNG (batch "6 học kỳ") — nhưng đóng bằng DỮ LIỆU THẬT: thiếu bất kỳ học kỳ nào
 * thì trả `partial` + liệt kê đúng ô còn thiếu, TUYỆT ĐỐI không lấy TB cả năm (`grade10/11/12`) làm
 * proxy cho x.
 */
function resolveHcmulawTranscriptCombinationScore(
  profile: ApplicantProfile,
  context: HcmulawTranscriptEvaluationContext,
  methodId: string,
  year: number,
  explanation: CalculationStep[],
  missingRequirements: MissingRequirement[]
): TranscriptConversionResult {
  if (!context.programId) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Chọn ngành xét tuyển HCMULAW.' });
    return { partialResult: partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn ngành để tra ngưỡng đầu vào.' }) };
  }

  const program = findHcmulawProgram(context.programId);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Ngành xét tuyển không hợp lệ.' });
    return { partialResult: partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển hợp lệ.'], missingRequirements, explanation, eligibilityReason: 'Ngành không tồn tại trong danh mục đã import.' }) };
  }

  const combination = findHcmulawCombination(program, context.combinationCode);
  if (!combination) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-combination', label: 'Chọn tổ hợp 3 môn xét tuyển thuộc ngành đã chọn.' });
    return { partialResult: partial(methodId, year, { missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để tính điểm.' }) };
  }

  const k = getHcmulawTranscriptK(combination.code);
  if (k === undefined) {
    missingRequirements.push({
      kind: 'unsupported',
      code: 'hcmulaw-transcript-k-missing',
      label: `Tổ hợp ${combination.code} không có trong bảng "độ lệch k" công bố — không quy đổi được điểm học bạ sang thang thi TN THPT.`,
    });
    return { partialResult: partial(methodId, year, { missingInputs: ['Tổ hợp chưa có độ lệch k công bố.'], missingRequirements, explanation, eligibilityReason: 'Không đủ bảng quy đổi cho tổ hợp này.' }) };
  }

  const combinationTotal = sumCombinationAveragesAcrossSemesters(profile.transcript?.bySemester, combination.subjects);
  if (combinationTotal.total30 === undefined) {
    for (const { subjectId, missingSemesters } of combinationTotal.missingBySubject) {
      missingRequirements.push({
        kind: 'profile-input',
        code: `hcmulaw-transcript-semester-${subjectId}`,
        label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} còn thiếu ${missingSemesters.length}/6 học kỳ (${missingSemesters.map((key) => TRANSCRIPT_SEMESTER_LABELS[key]).join(', ')}).`,
      });
    }
    return {
      partialResult: partial(methodId, year, {
        missingInputs: ['Chưa đủ điểm học bạ TỪNG HỌC KỲ (6 học kỳ lớp 10/11/12) cho 3 môn tổ hợp — điểm trung bình cả năm KHÔNG thay thế được (công thức yêu cầu "trung bình cộng của 6 học kỳ").'],
        missingRequirements,
        explanation,
        eligibilityReason: 'Cần đủ điểm 6 học kỳ của 3 môn tổ hợp để quy đổi điểm học bạ.',
      }),
    };
  }

  const x30 = combinationTotal.total30;
  explanation.push({
    id: `${methodId}-transcript-total`,
    label: 'Điểm tổ hợp học bạ (tổng TB 6 học kỳ của 3 môn)',
    output: x30,
    scale: 30,
    formula: 'x = TB 6 HK môn 1 + TB 6 HK môn 2 + TB 6 HK môn 3',
    evidence: hcmulawTranscriptConversionEvidence.evidence,
  });

  const converted30 = convertHcmulawTranscriptCombinationScore(combination.code, x30)!;
  explanation.push({
    id: `${methodId}-transcript-conversion`,
    label: `Quy đổi tương đương thi TN THPT (tổ hợp ${combination.code}, độ lệch k = ${k.toFixed(2)})`,
    output: converted30,
    scale: 30,
    formula: 'y = x - k',
    evidence: hcmulawTranscriptConversionEvidence.evidence,
  });

  return { converted30, x30, k, program, combination };
}

export interface HcmulawThpt5EvaluationContext {
  programId?: HcmulawProgramId;
  combinationCode?: string;
}

/** Phương thức 5 (mã 100, xét kết quả thi TN THPT 2026) — thang 30. Điểm tổ hợp môn = tổng thô 3
 * môn theo tổ hợp (không nhân hệ số), điểm cộng = 0 (PT5 không có điểm cộng), điểm ưu tiên theo
 * bảng chuẩn quốc gia (giảm dần khi tổng ≥ 22,5/30). */
export function evaluateHcmulawThpt5Admission(profile: ApplicantProfile, context: HcmulawThpt5EvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const methodId = hcmulawAdmissionMethods[3].id;
  const year = hcmulawAdmissionMethods[3].year;

  if (!context.programId) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Chọn ngành xét tuyển HCMULAW.' });
    return partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn ngành để tra ngưỡng đầu vào.' });
  }

  const program = findHcmulawProgram(context.programId);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Ngành xét tuyển không hợp lệ.' });
    return partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển hợp lệ.'], missingRequirements, explanation, eligibilityReason: 'Ngành không tồn tại trong danh mục đã import.' });
  }

  const combination = findHcmulawCombination(program, context.combinationCode);
  if (!combination) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-combination', label: 'Chọn tổ hợp 3 môn xét tuyển thuộc ngành đã chọn.' });
    return partial(methodId, year, { missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để tính điểm.' });
  }

  const subjects: readonly SubjectId[] = combination.subjects;
  const scores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hcmulaw-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]}.` })));
    return partial(methodId, year, { missingInputs: ['Chưa đủ điểm 3 môn thi THPT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn để tính điểm.' });
  }

  const subjectGroupScore30 = calculateHcmulawSubjectGroupScore({ subject1Score: scores[0], subject2Score: scores[1], subject3Score: scores[2] });
  explanation.push({
    id: 'hcmulaw-subject-group',
    label: 'Điểm tổ hợp môn (tổng thô 3 môn)',
    output: subjectGroupScore30,
    scale: 30,
    formula: `${SUBJECT_LABELS[subjects[0]]} + ${SUBJECT_LABELS[subjects[1]]} + ${SUBJECT_LABELS[subjects[2]]}`,
    evidence: hcmulawFormulaEvidence.evidence,
  });

  const standardPriority30 = lookupHcmulawStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmulawPriority30({ academicScore30: subjectGroupScore30, standardPriority30 });
  explanation.push({
    id: 'hcmulaw-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Điểm tổ hợp môn)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: hcmulawPriorityEvidence.evidence,
  });

  const finalScore = calculateHcmulawThpt5FinalScore({ subjectGroupScore30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'hcmulaw-final', label: 'Điểm xét tuyển (Phương thức 5) cuối cùng', output: finalScore, scale: 30 });

  const threshold = checkHcmulawThpt5Threshold(finalScore, program.id);
  explanation.push({ id: 'hcmulaw-eligibility-threshold', label: 'Ngưỡng đầu vào', output: finalScore, scale: 30, formula: threshold.requiredText, evidence: hcmulawThresholdEvidence.evidence });

  return {
    schoolId: 'hcmulaw',
    year,
    methodId,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmulawFormulaEvidence.evidence, ...hcmulawThresholdEvidence.evidence, ...hcmulawPriorityEvidence.evidence],
  };
}

const CERTIFICATE_LABELS: Record<NonNullable<HcmulawMethod2BonusResult['source']>, string> = {
  ielts: 'IELTS',
  toeflIbt: 'TOEFL iBT',
  sat: 'Kỳ thi SAT của Mỹ',
  delf: 'DELF (tiếng Pháp)',
  tcf: 'TCF (tiếng Pháp)',
  jlpt: 'JLPT (tiếng Nhật)',
  hsk: 'HSK (tiếng Trung)',
};

/**
 * Phương thức 2 (mã 410, kết hợp học bạ + chứng chỉ ngoại ngữ quốc tế/SAT) — EXACT trong phạm vi
 * thí sinh không có "điểm xét thưởng" thành tích (cùng semantics conditional-exact với Phương thức 3
 * và với HUTECH/USSH/IU/TDTU/HUFLIT).
 *
 * ĐXT = y + điểm khuyến khích + điểm ưu tiên (kẹp 30), với y = x - k (`conversionTable.ts`) và điểm
 * khuyến khích quy đổi từ chứng chỉ (`bonus.ts`, tối đa 1,50).
 *
 * Batch "chứng chỉ PT2" (2026-09-08) — `hcmulaw-method2-bonus-certificate-model-gap` ĐÃ ĐÓNG. Blocker
 * là MÔ HÌNH DỮ LIỆU, không phải nguồn: bảng điểm khuyến khích vốn đã đọc được đầy đủ dạng text, chỉ
 * thiếu chỗ để lưu chứng chỉ tiếng Pháp/Nhật/Trung và thang TOEFL. Nay `ApplicantProfile.certificates`
 * có `delf`/`tcf`/`jlpt`/`hsk` (theo bậc) + `toeflIbtExamDate` (chọn 1 trong 2 thang TOEFL theo mốc
 * 21/01/2026), nên chọn đúng "duy nhất một loại chứng chỉ cao nhất" được.
 *
 * Vẫn KHÔNG đoán khi thiếu dữ liệu: thiếu ngày dự thi TOEFL mà ngày đó thật sự đổi mức khuyến khích
 * -> trả `partial` + `missingRequirement`, không chọn bừa một thang.
 */
export function evaluateHcmulawCombined2Admission(profile: ApplicantProfile = {}, context: HcmulawTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const methodId = hcmulawAdmissionMethods[0].id;
  const year = hcmulawAdmissionMethods[0].year;

  const resolved = resolveHcmulawTranscriptCombinationScore(profile, context, methodId, year, explanation, missingRequirements);
  if (resolved.partialResult) return resolved.partialResult;

  const x30 = resolved.x30!;
  const converted30 = resolved.converted30!;
  const program = resolved.program!;

  const minTranscript = hcmulawTranscriptConversionEvidence.value.minTranscriptCombined30.method2;
  const transcriptFloorPass = x30 >= minTranscript;
  const transcriptFloorText = `Tổng TB 6 học kỳ của 3 môn tổ hợp ≥ ${minTranscript.toFixed(2)}/30 (điều kiện riêng của Phương thức 2)`;
  explanation.push({ id: `${methodId}-transcript-floor`, label: 'Điều kiện điểm học bạ (Phương thức 2)', output: x30, scale: 30, formula: transcriptFloorText, evidence: hcmulawTranscriptConversionEvidence.evidence });

  const bonus = calculateHcmulawMethod2Bonus(profile.certificates, program.id);

  if (bonus.needsToeflExamDate) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hcmulaw-toefl-exam-date',
      label:
        'Ngày dự thi TOEFL iBT — nguồn dùng 2 thang TOEFL khác nhau theo mốc 21/01/2026 và với điểm bạn đã nhập, 2 thang cho ra 2 mức điểm khuyến khích khác nhau.',
    });
    return partial(methodId, year, {
      missingInputs: ['Thiếu ngày dự thi TOEFL iBT để biết áp thang điểm nào — không chọn bừa thang.'],
      missingRequirements,
      explanation,
      eligibilityReason: transcriptFloorText,
    });
  }

  const certificateText =
    'Điểm khuyến khích: chỉ công nhận DUY NHẤT một loại chứng chỉ (hoặc kết quả SAT) cao nhất, tối đa 1,50 điểm. Chứng chỉ tiếng Pháp/Nhật chỉ dùng được cho ngành Luật; tiếng Trung cho ngành Luật và Ngôn ngữ Trung Quốc.';
  const certificatePass = hasHcmulawMethod2QualifyingCertificate(bonus);
  const bonus30 = bonus.bonus30 ?? 0;
  explanation.push({
    id: `${methodId}-bonus`,
    label: bonus.source ? `Điểm khuyến khích (${CERTIFICATE_LABELS[bonus.source]} — loại cao nhất)` : 'Điểm khuyến khích',
    output: bonus30,
    scale: 30,
    formula: certificateText,
    evidence: hcmulawMethod2BonusEvidence.evidence,
  });
  if (bonus.ignoredForProgram.length > 0) {
    missingRequirements.push({
      kind: 'unsupported',
      code: 'hcmulaw-certificate-not-valid-for-program',
      label: `Chứng chỉ ${bonus.ignoredForProgram.map((key) => CERTIFICATE_LABELS[key]).join(', ')} không dùng được để xét tuyển ngành ${program.name} theo Phương thức 2 — đã bỏ qua khi tính điểm khuyến khích.`,
    });
  }
  if (!certificatePass) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hcmulaw-method2-certificate',
      label: `Chưa có chứng chỉ nào đạt ngưỡng tối thiểu của Phương thức 2 dùng được cho ngành ${program.name} (IELTS ≥ 5.5, TOEFL iBT ≥ 65 hoặc ≥ 3.0 tuỳ thang, SAT ≥ 1150, hoặc DELF/TCF ≥ B1, JLPT ≥ N3, HSK ≥ HSK3 với ngành được phép).`,
    });
  }

  const standardPriority30 = lookupHcmulawStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmulawPriority30({ academicScore30: converted30, standardPriority30 });
  explanation.push({
    id: `${methodId}-priority`,
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Điểm tổ hợp môn)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: hcmulawPriorityEvidence.evidence,
  });

  const finalScore = calculateHcmulawCombined2FinalScore({ subjectGroupScore30: converted30, bonus30, priority30: priority.effectivePriority30 });
  explanation.push({ id: `${methodId}-final`, label: 'Điểm xét tuyển (Phương thức 2) cuối cùng', output: finalScore, scale: 30, formula: 'ĐXT = điểm tổ hợp môn (đã quy đổi) + điểm khuyến khích + điểm ưu tiên' });

  const threshold = checkHcmulawThreshold(finalScore, program.id, 'Phương thức 2, kết hợp học bạ + chứng chỉ quốc tế/SAT');
  explanation.push({ id: `${methodId}-eligibility-threshold`, label: 'Ngưỡng đầu vào', output: finalScore, scale: 30, formula: threshold.requiredText, evidence: hcmulawThresholdEvidence.evidence });

  return {
    schoolId: 'hcmulaw',
    year,
    methodId,
    confidence: 'exact-verified',
    eligibility: {
      status: transcriptFloorPass && certificatePass && threshold.pass ? 'eligible' : 'ineligible',
      reasons: [transcriptFloorText, certificateText, threshold.requiredText],
    },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmulawTranscriptConversionEvidence.evidence, ...hcmulawMethod2BonusEvidence.evidence, ...hcmulawThresholdEvidence.evidence, ...hcmulawPriorityEvidence.evidence],
  };
}

export interface HcmulawPriorityHighschool3EvaluationContext extends HcmulawTranscriptEvaluationContext {
  /** Học đủ 3 năm tại trường THPT thuộc "Danh sách 149 trường ưu tiên xét tuyển 2026 của ĐHQG-HCM"
   * — danh sách này KHÔNG import trong repo (nằm ngoài phạm vi module trường), nhận cờ từ caller. */
  studiedAtPriorityHighSchool?: boolean;
  /** Kết quả học tập CẢ 3 NĂM lớp 10/11/12 đạt mức Tốt (hoặc giỏi với thí sinh TN từ 2024 trở về
   * trước) — `ApplicantProfile` không lưu xếp loại học lực, nhận cờ từ caller (cùng quy ước
   * `VluTranscriptEvaluationContext.academicRank12`). */
  allYearsRankedGood?: boolean;
  /** `true` = có thành tích được cộng "điểm xét thưởng" (vd giải khuyến khích HSG quốc gia, +1,50) —
   * phạm vi áp dụng của mục này cho từng phương thức không nêu rõ trong nguồn, nên khi `true` kết quả
   * giữ `partial` (cùng semantics `hasBonusAchievement` ở HUTECH/USSH/IU/TDTU/HUFLIT). */
  hasBonusAchievement?: boolean;
}

/**
 * Phương thức 3 (mã 200, học bạ trường THPT ưu tiên ĐHQG-HCM) — EXACT trong phạm vi thí sinh không
 * có điểm xét thưởng thành tích.
 *
 * ĐXT = y + điểm ưu tiên (kẹp 30), với y = x - k. Nguồn (`hcmulaw-method-notice-2026` mục 3, đọc lại
 * verbatim 2026-09-07) KHÔNG có thành phần "điểm khuyến khích" nào cho phương thức này — khác hẳn
 * Phương thức 2. Điều kiện xét: x ≥ 24,50 + học đủ 3 năm trường ưu tiên + học lực cả 3 năm mức Tốt.
 */
export function evaluateHcmulawPriorityHighschool3Admission(
  profile: ApplicantProfile = {},
  context: HcmulawPriorityHighschool3EvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const methodId = hcmulawAdmissionMethods[1].id;
  const year = hcmulawAdmissionMethods[1].year;

  const resolved = resolveHcmulawTranscriptCombinationScore(profile, context, methodId, year, explanation, missingRequirements);
  if (resolved.partialResult) return resolved.partialResult;

  const x30 = resolved.x30!;
  const converted30 = resolved.converted30!;
  const program = resolved.program!;

  const minTranscript = hcmulawTranscriptConversionEvidence.value.minTranscriptCombined30.method3;
  const transcriptFloorText = `Tổng TB 6 học kỳ của 3 môn tổ hợp ≥ ${minTranscript.toFixed(2)}/30 (điều kiện riêng của Phương thức 3)`;
  const transcriptFloorPass = x30 >= minTranscript;
  explanation.push({ id: `${methodId}-transcript-floor`, label: 'Điều kiện điểm học bạ (Phương thức 3)', output: x30, scale: 30, formula: transcriptFloorText, evidence: hcmulawTranscriptConversionEvidence.evidence });

  if (context.studiedAtPriorityHighSchool === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-priority-highschool', label: 'Xác nhận có học đủ 3 năm tại trường THPT thuộc danh sách ưu tiên xét tuyển của ĐHQG-HCM.' });
  }
  if (context.allYearsRankedGood === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hcmulaw-all-years-ranked-good', label: 'Xác nhận kết quả học tập cả 3 năm lớp 10/11/12 đạt mức Tốt (hoặc giỏi).' });
  }

  if (context.hasBonusAchievement === true) {
    missingRequirements.push({
      kind: 'official-rule',
      code: 'hcmulaw-achievement-bonus-scope-unclear',
      label: 'Có thành tích được cộng "điểm xét thưởng" nhưng nguồn không nêu rõ mục này áp dụng cho những phương thức nào — không lắp ráp điểm xét tuyển cuối.',
    });
    return {
      schoolId: 'hcmulaw',
      year,
      methodId,
      confidence: 'partial',
      eligibility: { status: 'unknown', reasons: [transcriptFloorText] },
      missingInputs: ['Mức "điểm xét thưởng" áp dụng cho Phương thức 3 chưa xác định từ nguồn.'],
      missingRules: ['Phạm vi áp dụng "điểm xét thưởng" (giải khuyến khích HSG quốc gia, +1,50) theo từng phương thức chưa nêu rõ.'],
      missingRequirements,
      explanation,
      evidence: [...hcmulawTranscriptConversionEvidence.evidence],
    };
  }

  const standardPriority30 = lookupHcmulawStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmulawPriority30({ academicScore30: converted30, standardPriority30 });
  explanation.push({
    id: `${methodId}-priority`,
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Điểm tổ hợp môn)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: hcmulawPriorityEvidence.evidence,
  });

  const finalScore = calculateHcmulawPriorityHighschool3FinalScore({ subjectGroupScore30: converted30, priority30: priority.effectivePriority30 });
  explanation.push({ id: `${methodId}-final`, label: 'Điểm xét tuyển (Phương thức 3) cuối cùng', output: finalScore, scale: 30 });

  const threshold = checkHcmulawThreshold(finalScore, program.id, 'Phương thức 3, học bạ trường ưu tiên ĐHQG-HCM');
  explanation.push({ id: `${methodId}-eligibility-threshold`, label: 'Ngưỡng đầu vào', output: finalScore, scale: 30, formula: threshold.requiredText, evidence: hcmulawThresholdEvidence.evidence });

  const conditionsKnown = context.studiedAtPriorityHighSchool !== undefined && context.allYearsRankedGood !== undefined;
  const conditionsPass = context.studiedAtPriorityHighSchool === true && context.allYearsRankedGood === true && transcriptFloorPass && threshold.pass;
  const status: 'eligible' | 'ineligible' | 'unknown' = !transcriptFloorPass || !threshold.pass ? 'ineligible' : conditionsKnown ? (conditionsPass ? 'eligible' : 'ineligible') : 'unknown';

  return {
    schoolId: 'hcmulaw',
    year,
    methodId,
    confidence: 'exact-verified',
    eligibility: { status, reasons: [transcriptFloorText, threshold.requiredText, 'Phải học đủ 3 năm tại trường THPT thuộc danh sách ưu tiên ĐHQG-HCM và học lực cả 3 năm đạt mức Tốt.'] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmulawTranscriptConversionEvidence.evidence, ...hcmulawThresholdEvidence.evidence, ...hcmulawPriorityEvidence.evidence],
  };
}

export interface HcmulawVsat4EvaluationContext {
  programId?: HcmulawProgramId;
  combinationCode?: string;
  /** Điểm thô V-SAT (thang 150) TỪNG MÔN — key theo `SubjectId` của môn đó trong tổ hợp đã chọn.
   * KHÔNG persist vào `ApplicantProfile` dùng chung (cùng quy ước UFM). */
  vsatScoresBySubject?: Partial<Record<SubjectId, number>>;
}

/** Phương thức 4 (mã 417, V-SAT 2026) — thang 30. "Điểm tổ hợp môn" = tổng 3 điểm môn ĐÃ quy đổi
 * riêng từng môn sang thang thi TN THPT (mục 2.2 Thông báo 9/7/2026, `conversionTable.ts`), + điểm
 * ưu tiên (PT4 không có điểm cộng, cùng PT5). Môn không có bảng quy đổi công bố (Tin học/Công nghệ/
 * GDKTPL — chỉ 7 môn Toán/Văn/Anh/Lý/Hóa/Sử/Địa có bảng) khiến kết quả `unsupported`. */
export function evaluateHcmulawVsat4Admission(profile: ApplicantProfile, context: HcmulawVsat4EvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const methodId = hcmulawAdmissionMethods[2].id;
  const year = hcmulawAdmissionMethods[2].year;

  if (!context.programId) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Chọn ngành xét tuyển HCMULAW.' });
    return partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn ngành để tra ngưỡng đầu vào.' });
  }

  const program = findHcmulawProgram(context.programId);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-program', label: 'Ngành xét tuyển không hợp lệ.' });
    return partial(methodId, year, { missingInputs: ['Chọn ngành xét tuyển hợp lệ.'], missingRequirements, explanation, eligibilityReason: 'Ngành không tồn tại trong danh mục đã import.' });
  }

  const combination = findHcmulawCombination(program, context.combinationCode);
  if (!combination) {
    missingRequirements.push({ kind: 'school-context', code: 'hcmulaw-combination', label: 'Chọn tổ hợp 3 môn xét tuyển thuộc ngành đã chọn.' });
    return partial(methodId, year, { missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, eligibilityReason: 'Cần chọn tổ hợp để tính điểm.' });
  }

  const subjects: readonly SubjectId[] = combination.subjects;
  const unsupportedSubjects = subjects.filter((s) => convertHcmulawVsatSubjectScore(s, 150) === undefined);
  if (unsupportedSubjects.length > 0) {
    missingRequirements.push({
      kind: 'unsupported',
      code: 'hcmulaw-vsat-subject-table-missing',
      label: `Bảng quy đổi V-SAT chưa công bố cho môn ${unsupportedSubjects.map((s) => SUBJECT_LABELS[s]).join(', ')} — chỉ 7 môn Toán/Ngữ văn/Tiếng Anh/Vật lý/Hoá học/Lịch sử/Địa lý có bảng.`,
    });
    return partial(methodId, year, { missingInputs: ['Tổ hợp có môn chưa có bảng quy đổi V-SAT.'], missingRequirements, explanation, eligibilityReason: 'Không đủ bảng quy đổi cho tổ hợp này.' });
  }

  const rawScores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = context.vsatScoresBySubject?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else rawScores.push(score);
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hcmulaw-vsat-${s}`, label: `Điểm bài thi V-SAT môn ${SUBJECT_LABELS[s]}.` })));
    return partial(methodId, year, { missingInputs: ['Chưa đủ điểm 3 môn V-SAT theo tổ hợp.'], missingRequirements, explanation, eligibilityReason: 'Cần đủ điểm 3 môn V-SAT để tính điểm.' });
  }

  const converted: number[] = [];
  for (let i = 0; i < subjects.length; i++) {
    const y = convertHcmulawVsatSubjectScore(subjects[i], rawScores[i]);
    if (y === undefined) {
      missingRequirements.push({ kind: 'unsupported', code: `hcmulaw-vsat-out-of-range-${subjects[i]}`, label: `Điểm V-SAT môn ${SUBJECT_LABELS[subjects[i]]} nằm ngoài phạm vi bảng quy đổi công bố.` });
      return partial(methodId, year, { missingInputs: ['Điểm nằm ngoài bảng quy đổi.'], missingRequirements, explanation, eligibilityReason: 'Điểm V-SAT nằm ngoài phạm vi bảng quy đổi.' });
    }
    converted.push(y);
    explanation.push({
      id: `hcmulaw-vsat-conversion-${subjects[i]}`,
      label: `Điểm môn ${SUBJECT_LABELS[subjects[i]]} — quy đổi tương đương thi TN THPT`,
      output: y,
      scale: 10,
      formula: 'y = c + (x-a)(d-c)/(b-a)',
      evidence: hcmulawVsatConversionEvidence.evidence,
    });
  }

  const subjectGroupScore30 = calculateHcmulawVsat4SubjectGroupScore({ subject1Converted10: converted[0], subject2Converted10: converted[1], subject3Converted10: converted[2] });
  explanation.push({
    id: 'hcmulaw-vsat-subject-group',
    label: 'Điểm tổ hợp môn (tổng 3 môn đã quy đổi)',
    output: subjectGroupScore30,
    scale: 30,
    formula: `${SUBJECT_LABELS[subjects[0]]} + ${SUBJECT_LABELS[subjects[1]]} + ${SUBJECT_LABELS[subjects[2]]} (đã quy đổi)`,
    evidence: hcmulawVsatConversionEvidence.evidence,
  });

  const standardPriority30 = lookupHcmulawStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcmulawPriority30({ academicScore30: subjectGroupScore30, standardPriority30 });
  explanation.push({
    id: 'hcmulaw-vsat-priority',
    label: priority.reduced ? 'Điểm ưu tiên đã giảm' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 – Điểm tổ hợp môn)/7,5] × Mức ưu tiên' : 'Mức điểm ưu tiên quy đổi',
    evidence: hcmulawPriorityEvidence.evidence,
  });

  const finalScore = calculateHcmulawVsat4FinalScore({ subjectGroupScore30, priority30: priority.effectivePriority30 });
  explanation.push({ id: 'hcmulaw-vsat-final', label: 'Điểm xét tuyển (Phương thức 4) cuối cùng', output: finalScore, scale: 30 });

  const threshold = checkHcmulawThreshold(finalScore, program.id, 'Phương thức 4, V-SAT 2026');
  explanation.push({ id: 'hcmulaw-vsat-eligibility-threshold', label: 'Ngưỡng đầu vào', output: finalScore, scale: 30, formula: threshold.requiredText, evidence: hcmulawThresholdEvidence.evidence });

  return {
    schoolId: 'hcmulaw',
    year,
    methodId,
    confidence: 'exact-verified',
    eligibility: { status: threshold.pass ? 'eligible' : 'ineligible', reasons: [threshold.requiredText] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcmulawVsatConversionEvidence.evidence, ...hcmulawThresholdEvidence.evidence, ...hcmulawPriorityEvidence.evidence],
  };
}
