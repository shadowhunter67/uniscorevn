import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DAINAM_THPT_THRESHOLD } from './eligibility';
import { dainamAdmissionMethods } from './methods';
import { dainamThptExactFormulaEvidence } from './evidence';

export function evaluateDainamThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dainam',
    schoolShortName: 'DNU-HN',
    method: dainamAdmissionMethods[0],
    profile,
    context,
    threshold: DAINAM_THPT_THRESHOLD,
    evidenceSourceId: 'dainam-threshold-2026',
  });
}

export interface DainamSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface DainamThptExamEvaluationContext {
  subjectContext?: DainamSubjectContext;
}

const DAINAM_EXACT_METHOD = dainamAdmissionMethods[1];

/**
 * Đại Nam 2026 — nhánh exact, phương thức thi TN THPT, áp dụng cho ngành NGOÀI lĩnh vực Sức khoẻ
 * và Pháp luật (nhóm ngành này có ngưỡng riêng theo học lực/điểm xét tốt nghiệp THPT — chưa mô
 * hình hoá, xem knowledgeGaps). Thông báo chính thức tuyensinh.dainam.edu.vn xác nhận TRỰC TIẾP
 * ngưỡng 15 điểm "không bao gồm điểm cộng, điểm ưu tiên khu vực và đối tượng" — điểm ưu tiên KHÔNG
 * được cộng vào tổng khi so với ngưỡng này (không phải judgment call).
 */
export function evaluateDainamThptExamExactAdmission(
  profile: ApplicantProfile,
  context: DainamThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dainam',
    year: DAINAM_EXACT_METHOD.year,
    methodId: DAINAM_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'dainam-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển Đại Nam.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển Đại Nam.');
  }

  const subjects = context.subjectContext.subjects;
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
        code: `dainam-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp Đại Nam.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const total30 = round2(total);
  const threshold = 15;
  const eligible = total30 >= threshold;

  const explanation: CalculationStep[] = [
    {
      id: 'dainam-exact-raw',
      label: 'Tổng điểm 3 môn thi (thô)',
      output: total30,
      scale: 30,
      formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
      evidence: dainamThptExactFormulaEvidence.evidence,
    },
    {
      id: 'dainam-exact-total',
      label: 'Tổng điểm dùng để so ngưỡng (KHÔNG cộng điểm ưu tiên, không tính điểm cộng)',
      output: total30,
      scale: 30,
      formula: 'Tổng điểm thô 3 môn (nguồn xác nhận trực tiếp: không cộng điểm ưu tiên khu vực/đối tượng)',
      evidence: dainamThptExactFormulaEvidence.evidence,
    },
  ];

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào Đại Nam 2026 (ngành ngoài lĩnh vực Sức khoẻ/Pháp luật): tổng điểm thô 3 môn (không cộng điểm ưu tiên) >= ${threshold}/30.`,
    `Tổng điểm thô 3 môn = ${total30}/30 -> ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  return {
    schoolId: 'dainam',
    year: DAINAM_EXACT_METHOD.year,
    methodId: DAINAM_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: dainamThptExactFormulaEvidence.evidence,
  };
}
