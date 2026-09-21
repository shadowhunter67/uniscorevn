import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { round2 } from '../../core/round2';
import { SUBJECT_LABELS, type SubjectId } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VGU_THPT_THRESHOLD } from './eligibility';
import { vguAdmissionMethods } from './methods';
import { calculateVguEffectivePriority30, lookupVguStandardPriority30 } from './priority';
import { convertVguIeltsToEnglishScore, getVguProgram } from './programs';

export function evaluateVguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vgu',
    schoolShortName: 'VGU',
    method: vguAdmissionMethods[0],
    profile,
    context,
    threshold: VGU_THPT_THRESHOLD,
    evidenceSourceId: 'vgu-floor-score-press-2026',
  });
}

const VGU_EXACT_METHOD = vguAdmissionMethods.find((method) => method.id === 'vgu-thpt-exam-exact-2026')!;
const VGU_RAW_MIN_30 = 15;
const VGU_IELTS_ENGLISH_MIN = 5;
const VGU_EXACT_EVIDENCE = [
  {
    sourceId: 'vgu-admission-notice-2026',
    location:
      'Ảnh "Mức điểm sàn xét tuyển" (PT5, cột Kết quả thi THPT) và ảnh "Bảng quy đổi điểm thi tiếng Anh THPT và chứng chỉ IELTS Học thuật" + khung "Yêu cầu Tiếng Anh" — thông báo 09/07/2026',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
  {
    sourceId: 'vgu-nhaphoc-method5-2026',
    location:
      'Phương thức 5, mục 3-4 — tổ hợp theo ngành; điều kiện a) tổng 3 môn gồm điểm ưu tiên ≥ điểm sàn, b) năng lực tiếng Anh, c) tổng thô ≥ 15,00',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export interface VguExactEvaluationContext {
  /** Mã ngành (VD '7480101'). */
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

function englishTranscriptAverage(profile: ApplicantProfile): number | undefined {
  const grades = [profile.transcript?.grade10, profile.transcript?.grade11, profile.transcript?.grade12].map((grade) => grade?.english);
  if (grades.some((value) => value === undefined)) return undefined;
  return round2((grades[0]! + grades[1]! + grades[2]!) / 3);
}

/** VGU 2026 PT5 (thi TN THPT): đủ điều kiện xét tuyển ⟺ điểm 3 môn + ưu tiên ≥ điểm sàn ngành VÀ tổng thô ≥ 15
 * VÀ đạt yêu cầu tiếng Anh. Đạt tiếng Anh qua bài thi VGU (75/100) không mô hình được ⇒ `unknown`, không `ineligible`. */
export function evaluateVguThptExamExactAdmission(profile: ApplicantProfile, context: VguExactEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'vgu',
    year: VGU_EXACT_METHOD.year,
    methodId: VGU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getVguProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'vgu-program', label: 'Chọn ngành VGU (mã ngành, VD 7480101).' });
    return unknown('Cần chọn ngành VGU vì điểm sàn khác nhau theo ngành (17–22/30).');
  }
  if (!program.combinations) {
    missingRequirements.push({
      kind: 'official-rule',
      code: 'vgu-architecture-out-of-exact-scope',
      label: 'Kiến trúc không có tổ hợp thi THPT được công bố trên trang tuyển sinh — chưa tính exact.',
    });
    return unknown('Ngành Kiến trúc của VGU chưa có tổ hợp xét tuyển thi THPT công bố nên chưa tính exact.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'vgu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của VGU.' });
    return unknown('Cần chọn tổ hợp 3 môn để kiểm tra điểm sàn VGU.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !program.combinations.includes(combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vgu-combination-for-program',
      label: `Tổ hợp ${combinationId ?? ''} không có trong danh sách của ngành ${program.name} (hoặc chưa mô hình hoá được: D03/D05/D26).`,
    });
    return unknown(`Tổ hợp ${combinationId ?? ''} không thuộc phạm vi tính exact của ngành ${program.name}.`);
  }

  const ieltsConverted = convertVguIeltsToEnglishScore(profile.certificates?.ielts);
  let total = 0;
  let usedIelts = false;
  const missing: SubjectId[] = [];
  for (const subjectId of subjects) {
    let score = profile.thpt?.scores?.[subjectId];
    if (subjectId === 'english' && ieltsConverted !== undefined && (score === undefined || ieltsConverted > score)) {
      score = ieltsConverted;
      usedIelts = true;
    }
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  if (missing.length > 0) {
    missingRequirements.push(
      ...missing.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vgu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VGU.`,
      }))
    );
    return unknown('Cần đủ điểm 3 môn của tổ hợp để kiểm tra điểm sàn VGU.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupVguStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVguEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(Math.min(30, raw30 + priority.effectivePriority30));
  const meetsFloor = dxt30 >= program.floor30;
  const meetsRawMin = raw30 >= VGU_RAW_MIN_30;

  const englishAverage = englishTranscriptAverage(profile);
  const ielts = profile.certificates?.ielts;
  const englishByIelts = ielts !== undefined && ielts >= VGU_IELTS_ENGLISH_MIN;
  const englishByAverage = englishAverage !== undefined && englishAverage >= program.englishAverageMin;

  const explanation: CalculationStep[] = [
    {
      id: 'vgu-exact-raw',
      label: usedIelts ? 'Tổng điểm 3 môn (môn Anh dùng điểm IELTS quy đổi vì cao hơn)' : 'Tổng điểm 3 môn thi TN THPT',
      output: raw30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: VGU_EXACT_EVIDENCE,
    },
    {
      id: 'vgu-exact-priority',
      label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
      output: priority.effectivePriority30,
      scale: 30,
      formula: priority.reduced ? '[(30 − tổng điểm)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)',
      evidence: VGU_EXACT_EVIDENCE,
    },
    {
      id: 'vgu-exact-dxt',
      label: `Điểm so với điểm sàn ${program.name} (${program.floor30}/30)`,
      output: dxt30,
      scale: 30,
      formula: 'round2(min(30, tổng 3 môn + điểm ưu tiên))',
      evidence: VGU_EXACT_EVIDENCE,
    },
  ];

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vgu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với ưu tiên = 0).' });
  }
  missingRequirements.push(
    { kind: 'official-rule', code: 'vgu-bonus-not-modeled', label: 'Điểm cộng riêng (nếu có) chưa có trong hồ sơ — kết quả đúng cho thí sinh không có điểm cộng.' },
    {
      kind: 'official-rule',
      code: 'vgu-english-test-toefl-not-modeled',
      label: 'Bài thi tiếng Anh VGU (75/100), TOEFL iBT và IELTS 5,5 (khoảng quy đổi không có giá trị cao nhất xác định) chưa mô hình hoá.',
    }
  );

  const reasons = [
    `Điểm sàn VGU 2026 ngành ${program.name}: ${program.floor30}/30 (đã gồm ưu tiên/điểm cộng). Điểm của bạn ${dxt30}/30 → ${meetsFloor ? 'đạt' : 'chưa đạt'}.`,
    `Tổng thô 3 môn ${raw30}/30 → ${meetsRawMin ? 'đạt' : 'chưa đạt'} mức tối thiểu ${VGU_RAW_MIN_30}.`,
  ];

  let status: 'eligible' | 'ineligible' | 'unknown';
  if (!meetsFloor || !meetsRawMin) {
    status = 'ineligible';
  } else if (englishByIelts || englishByAverage) {
    status = 'eligible';
    reasons.push(
      englishByIelts
        ? `Đạt yêu cầu tiếng Anh qua IELTS ${ielts} (≥ ${VGU_IELTS_ENGLISH_MIN}).`
        : `Đạt yêu cầu tiếng Anh: điểm TB môn Anh 3 năm ${englishAverage} ≥ ${program.englishAverageMin}.`
    );
  } else {
    status = 'unknown';
    if (englishAverage === undefined) {
      missingRequirements.push({
        kind: 'profile-input',
        code: 'vgu-english-evidence',
        label: `Điểm TB môn Anh lớp 10/11/12 (cần ≥ ${program.englishAverageMin}) hoặc IELTS Học thuật ≥ ${VGU_IELTS_ENGLISH_MIN}.`,
      });
      reasons.push('Đủ điểm sàn nhưng chưa có thông tin để kiểm tra yêu cầu tiếng Anh.');
    } else {
      reasons.push(
        `Đủ điểm sàn nhưng điểm TB môn Anh ${englishAverage} < ${program.englishAverageMin} và chưa có IELTS ≥ ${VGU_IELTS_ENGLISH_MIN}: cần đạt bài thi tiếng Anh VGU (75/100) mới đủ điều kiện.`
      );
    }
  }

  return {
    schoolId: 'vgu',
    year: VGU_EXACT_METHOD.year,
    methodId: VGU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...VGU_EXACT_EVIDENCE],
  };
}
