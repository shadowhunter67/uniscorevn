import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hmuAdmissionMethods } from './methods';
import { HMU_THRESHOLD_BY_PROGRAM_ID, type HmuProgramThreshold } from './thresholds';
import { hmuThptExactFormulaEvidence, hmuPerMajorThresholdEvidence } from './evidence';

export interface HmuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HmuThptExamExactEvaluationContext {
  /** programId nội bộ HMU (vd 'y-khoa'), xem `thresholds.ts`. */
  selectedProgramId?: string;
  subjectContext?: HmuSubjectContext;
}

const HMU_EXACT_METHOD = hmuAdmissionMethods[0];

function hmuPartial(input: {
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'hmu',
    year: HMU_EXACT_METHOD.year,
    methodId: HMU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs ?? [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: input.explanation ?? [],
    evidence: [],
  };
}

/**
 * HMU 2026 — phương thức xét điểm thi TN THPT, kiểm tra ngưỡng đảm bảo chất lượng đầu vào theo
 * ngành: Tổng thô 3 môn (không nhân hệ số, KHÔNG cộng điểm ưu tiên/điểm khuyến khích, theo đúng
 * ghi chú nguồn) so với ngưỡng ngành (`thresholds.ts`). Đây là điều kiện SÀN (đăng ký xét tuyển),
 * KHÔNG phải điểm chuẩn trúng tuyển cuối cùng (luôn cao hơn hoặc bằng sàn).
 */
export function evaluateHmuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HmuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.selectedProgramId) {
    missingRequirements.push({ kind: 'school-context', code: 'hmu-program-code', label: 'Chọn ngành HMU để tra điểm sàn.' });
    return hmuPartial({ missingRequirements, reason: 'Cần chọn ngành HMU để áp điểm sàn và kiểm tra điều kiện.' });
  }

  const entry: HmuProgramThreshold | undefined = HMU_THRESHOLD_BY_PROGRAM_ID.get(context.selectedProgramId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hmu-program-code', label: `Ngành "${context.selectedProgramId}" không có trong bảng điểm sàn HMU 2026.` });
    return hmuPartial({ missingRequirements, reason: `Ngành "${context.selectedProgramId}" không có trong bảng điểm sàn HMU 2026.` });
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hmu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
    return hmuPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ngành ${entry.name}.` });
  }

  const { subjects } = context.subjectContext;
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hmu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hmuPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để kiểm tra ngưỡng HMU.',
    });
  }

  const raw30 = round2(total);
  const eligible = raw30 >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ngành ${entry.name} (${entry.code}): tổng điểm thô 3 môn (không nhân hệ số, không cộng điểm ưu tiên/điểm khuyến khích) ≥ ${entry.threshold30}/30 — tổng của bạn = ${raw30}/30.`,
    'Đây là điều kiện SÀN (đủ điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng — điểm chuẩn thực tế theo ngành có thể cao hơn và có cộng điểm ưu tiên/điểm khuyến khích.',
    eligible ? 'Đạt ngưỡng đảm bảo chất lượng đầu vào.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.',
  ];

  explanation.push({
    id: 'hmu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hmuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hmu-exact-threshold',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hmuPerMajorThresholdEvidence.evidence,
  });

  return {
    schoolId: 'hmu',
    year: HMU_EXACT_METHOD.year,
    methodId: HMU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hmuThptExactFormulaEvidence.evidence, ...hmuPerMajorThresholdEvidence.evidence],
  };
}
