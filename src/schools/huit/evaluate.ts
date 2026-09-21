import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { huitAdmissionMethods } from './methods';
import { huitKnowledgeGaps } from './knowledgeGaps';
import { getHuitProgram, lookupHuitMaxPriority30 } from './programs';
import { checkHuitThptExamThreshold, checkHuitTranscriptThreshold, type HuitThresholdGroup } from './eligibility';

export interface HuitSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function sumSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

export interface HuitThptExamEvaluationContext {
  thresholdGroup?: HuitThresholdGroup;
  subjectContext?: HuitSubjectContext;
}

/** Phương thức 1: Xét kết quả thi TN THPT 2026. */
export function evaluateHuitThptExamAdmission(profile: ApplicantProfile, context: HuitThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = huitAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HuitThresholdGroup = context.thresholdGroup ?? 'standard';

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `huit-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HUIT.`,
        }))
      );
    }
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'huit-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HUIT.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (total30 !== undefined) {
    const result = checkHuitThptExamThreshold(total30, group);
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({ id: 'huit-thpt-exam-threshold', label: 'Ngưỡng đảm bảo chất lượng HUIT 2026 (thi TN THPT)', output: total30, scale: 30, formula: result.requiredText });
  }

  return {
    schoolId: 'huit',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HUIT.'] },
    missingInputs,
    missingRules: (method.knowledgeGaps ?? huitKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? huitKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

export interface HuitTranscriptEvaluationContext {
  thresholdGroup?: HuitThresholdGroup;
  /** Tổng điểm học tập THPT theo tổ hợp xét tuyển (thang 30) — người dùng tự cung cấp vì nguồn
   * không nêu rõ công thức tính (xem `huit-transcript-methodology-unpublished`). */
  totalScore30?: number;
}

/** Phương thức 2: Xét kết quả học tập THPT (học bạ). */
export function evaluateHuitTranscriptAdmission(profile: ApplicantProfile, context: HuitTranscriptEvaluationContext = {}): AdmissionEvaluation {
  void profile;
  const method = huitAdmissionMethods[1];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HuitThresholdGroup = context.thresholdGroup ?? 'standard';

  if (context.totalScore30 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'huit-transcript-total-score', label: 'Tổng điểm học tập THPT theo tổ hợp xét tuyển (thang 30).' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (context.totalScore30 !== undefined) {
    const result = checkHuitTranscriptThreshold(context.totalScore30, group);
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({
      id: 'huit-transcript-threshold',
      label: 'Ngưỡng đảm bảo chất lượng HUIT 2026 (học tập THPT)',
      output: context.totalScore30,
      scale: 30,
      formula: result.requiredText,
    });
  }

  return {
    schoolId: 'huit',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần nhập tổng điểm học tập THPT theo tổ hợp xét tuyển để kiểm tra ngưỡng HUIT.'] },
    missingInputs: [],
    missingRules: (method.knowledgeGaps ?? huitKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? huitKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

const HUIT_EXACT_METHOD = huitAdmissionMethods.find((method) => method.id === 'huit-thpt-exam-program-exact-2026')!;
const HUIT_RAW_MIN_30 = 15;
const HUIT_LAW_SUBJECT_MIN = 6;
const HUIT_EXACT_EVIDENCE = [
  {
    sourceId: 'huit-quality-threshold-2026',
    location: 'Bài "Điểm sàn xét tuyển đại học năm 2026" (ts.huit.edu.vn): phương thức thi TN THPT 2026 — Luật, Luật kinh tế 20 điểm; các ngành còn lại 16 điểm',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
  {
    sourceId: 'huit-admission-info-2026-superseded',
    location:
      'Thông tin tuyển sinh 2026, mục 1.3 (39 ngành + 4 tổ hợp mỗi ngành) và mục 2.2 (tổng thô 3 môn ≥ 15; Luật/Luật kinh tế: Toán, Ngữ văn ≥ 6,0). Chỉ dùng bảng ngành/tổ hợp và điều kiện chung; ngưỡng Luật PT1 lấy theo bài điểm sàn mới hơn',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export interface HuitProgramEvaluationContext {
  /** Mã ngành (VD '7480201'). */
  programCode?: string;
  subjectContext?: HuitSubjectContext;
}

/** HUIT 2026 phương thức thi TN THPT: so tổng 3 môn thô với ngưỡng của ngành; chỉ kết luận khi không phụ thuộc cách tính
 * ưu tiên (xem `lookupHuitMaxPriority30`). Không trả `score`. */
export function evaluateHuitThptExamProgramExactAdmission(profile: ApplicantProfile, context: HuitProgramEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'huit',
    year: HUIT_EXACT_METHOD.year,
    methodId: HUIT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getHuitProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'huit-program', label: 'Chọn ngành HUIT (mã ngành, VD 7480201). Chương trình liên kết quốc tế chưa được hỗ trợ.' });
    return unknown('Cần chọn ngành HUIT vì ngưỡng và tổ hợp xét tuyển khác nhau theo ngành.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'huit-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của HUIT.' });
    return unknown('Cần chọn tổ hợp 3 môn để so với ngưỡng HUIT.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !program.combinations.includes(combinationId)) {
    missingRequirements.push({ kind: 'school-context', code: 'huit-combination-for-program', label: `Tổ hợp ${combinationId ?? ''} không có trong danh sách xét tuyển của ngành ${program.name}.` });
    return unknown(`Tổ hợp ${combinationId ?? ''} không thuộc ngành ${program.name}.`);
  }
  const missing = subjects.filter((subjectId) => profile.thpt?.scores?.[subjectId] === undefined);
  if (missing.length > 0) {
    missingRequirements.push(
      ...missing.map((subjectId) => ({ kind: 'profile-input' as const, code: `huit-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HUIT.` }))
    );
    return unknown('Cần đủ điểm 3 môn của tổ hợp để so với ngưỡng HUIT.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = Math.round(subjects.reduce((sum, subjectId) => sum + profile.thpt!.scores![subjectId]!, 0) * 100) / 100;
  const threshold30 = program.group === 'law' ? 20 : 16;
  const maxPriority30 = lookupHuitMaxPriority30(profile.priority?.region, profile.priority?.category);
  const lawSubjectFailures =
    program.group === 'law'
      ? (['math', 'literature'] as const).filter((subjectId) => subjects.includes(subjectId) && profile.thpt!.scores![subjectId]! < HUIT_LAW_SUBJECT_MIN)
      : [];

  const explanation: CalculationStep[] = [
    {
      id: 'huit-exact-raw',
      label: 'Tổng điểm 3 môn thi TN THPT (thô, chưa cộng ưu tiên/điểm cộng)',
      output: raw30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: HUIT_EXACT_EVIDENCE,
    },
  ];
  missingRequirements.push({
    kind: 'official-rule',
    code: 'huit-final-score-not-modeled',
    label: 'Chỉ kiểm tra ngưỡng đầu vào: điểm xét tuyển cuối, điểm cộng và điểm chuẩn HUIT chưa mô hình hoá; phương thức học bạ/ĐGNL và chương trình liên kết quốc tế chưa hỗ trợ.',
  });

  let status: 'eligible' | 'ineligible' | 'unknown';
  const reasons: string[] = [];
  if (lawSubjectFailures.length > 0) {
    status = 'ineligible';
    reasons.push(`Ngành ${program.name} yêu cầu điểm Toán và Ngữ văn (môn có trong tổ hợp) ≥ ${HUIT_LAW_SUBJECT_MIN}: chưa đạt ở ${lawSubjectFailures.map((subjectId) => SUBJECT_LABELS[subjectId]).join(', ')}.`);
  } else if (raw30 >= threshold30) {
    status = 'eligible';
    reasons.push(`Tổng ${raw30}/30 ≥ ngưỡng ${threshold30}/30 của ngành ${program.name}.`);
  } else if (Math.round((raw30 + maxPriority30) * 100) / 100 < Math.max(threshold30, HUIT_RAW_MIN_30)) {
    status = 'ineligible';
    reasons.push(`Tổng ${raw30}/30 (kể cả cộng ưu tiên tối đa ${maxPriority30}) vẫn < ngưỡng ${threshold30}/30 của ngành ${program.name}.`);
  } else {
    status = 'unknown';
    reasons.push(`Tổng ${raw30}/30 < ngưỡng ${threshold30}/30 nhưng cộng ưu tiên có thể đạt: nguồn không nói ưu tiên được tính trước hay sau khi so ngưỡng nên chưa kết luận.`);
    missingRequirements.push({ kind: 'official-rule', code: 'huit-priority-vs-threshold-unspecified', label: 'HUIT chỉ nêu "mức điểm ưu tiên theo quy định của Bộ", không nêu ưu tiên tính trước hay sau khi so ngưỡng.' });
  }

  return {
    schoolId: 'huit',
    year: HUIT_EXACT_METHOD.year,
    methodId: HUIT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...HUIT_EXACT_EVIDENCE],
  };
}
