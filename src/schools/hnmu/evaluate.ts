import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hnmuAdmissionMethods } from './methods';
import { HNMU_GROUP_THRESHOLD_BY_ID, type HnmuGroupId, type HnmuGroupThreshold } from './thresholds';
import { hnmuThptExactFormulaEvidence, hnmuGroupThresholdEvidence } from './evidence';

export interface HnmuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function readSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

/**
 * Baseline (partial): kiểm tra thô tổng điểm 3 môn so với dải ngưỡng công bố [16,00 - 20,00] —
 * KHÔNG chọn nhóm ngành cụ thể nên không kết luận chắc chắn ở giữa dải.
 */
export interface HnmuThptExamEvaluationContext {
  subjectContext?: HnmuSubjectContext;
}

export function evaluateHnmuThptExamAdmission(profile: ApplicantProfile, context: HnmuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hnmuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  const MIN30 = 16;
  const MAX30 = 20;

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hnmu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HNMU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào HNMU.');
  } else {
    const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hnmu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HNMU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng HNMU.');
    } else if (total30 !== undefined) {
      explanation.push({
        id: 'hnmu-thpt-threshold',
        label: 'Tổng điểm thi TN THPT HNMU 2026 (không nhân hệ số)',
        output: total30,
        scale: 30,
        formula: 'Tổng điểm thô 3 môn, không nhân hệ số, không tính điểm cộng.',
        evidence: hnmuThptExactFormulaEvidence.evidence,
      });
      if (total30 < MIN30) {
        status = 'ineligible';
        reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng thấp nhất đã công bố (${MIN30}/30).`);
      } else if (total30 < MAX30) {
        status = 'unknown';
        reasons.push(`Tổng ${total30}/30 nằm giữa các mức ngưỡng đã công bố theo nhóm ngành (16,00-20,00/30) — cần chọn nhóm ngành cụ thể để kết luận chắc chắn.`);
      } else {
        status = 'eligible';
        reasons.push(`Tổng ${total30}/30 đạt mức ngưỡng cao nhất đã công bố (${MAX30}/30).`);
      }
    }
  }

  return {
    schoolId: 'hnmu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs: [],
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [...hnmuThptExactFormulaEvidence.evidence, ...hnmuGroupThresholdEvidence.evidence],
  };
}

const HNMU_EXACT_METHOD = hnmuAdmissionMethods[1];

export interface HnmuThptExamExactEvaluationContext {
  groupId?: HnmuGroupId;
  subjectContext?: HnmuSubjectContext;
}

function hnmuExactPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hnmu',
    year: HNMU_EXACT_METHOD.year,
    methodId: HNMU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

/**
 * HNMU 2026 — nhánh exact, phương thức xét điểm thi TN THPT, kiểm tra ngưỡng đảm bảo chất lượng
 * đầu vào theo nhóm ngành: Tổng thô 3 môn (không nhân hệ số, KHÔNG cộng điểm cộng/điểm ưu tiên,
 * theo đúng công bố áp dụng thí sinh khu vực 3) so với ngưỡng nhóm ngành (`thresholds.ts`). Đây là
 * điều kiện SÀN (đăng ký xét tuyển), KHÔNG phải điểm chuẩn trúng tuyển cuối cùng.
 */
export function evaluateHnmuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: HnmuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.groupId) {
    missingRequirements.push({ kind: 'school-context', code: 'hnmu-group', label: 'Chọn nhóm ngành HNMU để tra ngưỡng.' });
    return hnmuExactPartial({ missingRequirements, reason: 'Cần chọn nhóm ngành HNMU để áp ngưỡng và kiểm tra điều kiện.' });
  }

  const entry: HnmuGroupThreshold | undefined = HNMU_GROUP_THRESHOLD_BY_ID.get(context.groupId);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hnmu-group', label: `Nhóm ngành "${context.groupId}" không có trong bảng ngưỡng HNMU 2026.` });
    return hnmuExactPartial({ missingRequirements, reason: `Nhóm ngành "${context.groupId}" không có trong bảng ngưỡng HNMU 2026.` });
  }

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hnmu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.groupName}.` });
    return hnmuExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.groupName}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hnmu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hnmuExactPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để kiểm tra ngưỡng HNMU.' });
  }
  const raw30 = total30 as number;
  const eligible = raw30 >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Ngưỡng đảm bảo chất lượng đầu vào ${entry.groupName}: tổng điểm thô 3 môn (không nhân hệ số, không tính điểm cộng, áp dụng thí sinh KV3) ≥ ${entry.threshold30}/30 — tổng của bạn = ${raw30}/30.`,
    'Đây là điều kiện SÀN (đủ điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng.',
    eligible ? 'Đạt ngưỡng đảm bảo chất lượng đầu vào.' : 'Chưa đạt ngưỡng đảm bảo chất lượng đầu vào.',
  ];

  explanation.push({
    id: 'hnmu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hnmuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hnmu-exact-threshold',
    label: `Ngưỡng đảm bảo chất lượng đầu vào — ${entry.groupName}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hnmuGroupThresholdEvidence.evidence,
  });

  return {
    schoolId: 'hnmu',
    year: HNMU_EXACT_METHOD.year,
    methodId: HNMU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hnmuThptExactFormulaEvidence.evidence, ...hnmuGroupThresholdEvidence.evidence],
  };
}
