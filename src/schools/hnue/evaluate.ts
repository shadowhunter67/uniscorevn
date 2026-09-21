import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { round2 } from '../../core/round2';
import { SUBJECT_LABELS, type SubjectId } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HNUE_THPT_THRESHOLD } from './eligibility';
import { hnueAdmissionMethods } from './methods';
import { getHnueProgram, lookupHnueMaxPriority30 } from './programs';

export function evaluateHnueThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hnue',
    schoolShortName: 'HNUE',
    method: hnueAdmissionMethods[0],
    profile,
    context,
    threshold: HNUE_THPT_THRESHOLD,
    evidenceSourceId: 'hnue-quality-threshold-2026',
  });
}

const HNUE_FLOOR_METHOD = hnueAdmissionMethods.find((method) => method.id === 'hnue-thpt-exam-floor-exact-2026')!;
const HNUE_FLOOR_EVIDENCE = [
  {
    sourceId: 'hnue-quality-threshold-2026',
    location:
      'Thông báo "Ngưỡng bảo đảm chất lượng đầu vào ... năm 2026" — bảng 9 lĩnh vực: điểm sàn tổng 3 môn (không nhân hệ số, không tính điểm cộng, thí sinh khu vực 3) theo từng mã ngành',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export interface HnueFloorEvaluationContext {
  /** Mã xét tuyển (VD '7140209', '7480201'). */
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** HNUE 2026: so tổng 3 môn thi TN THPT (không hệ số) với điểm sàn của ngành. Chỉ kết luận `eligible`/`ineligible`
 * khi không phụ thuộc cách tính ưu tiên; còn lại `unknown`. Không trả `score`. */
export function evaluateHnueFloorExactAdmission(profile: ApplicantProfile, context: HnueFloorEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'hnue',
    year: HNUE_FLOOR_METHOD.year,
    methodId: HNUE_FLOOR_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getHnueProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'hnue-program', label: 'Chọn ngành HNUE (mã xét tuyển, VD 7140209).' });
    return unknown('Cần chọn ngành HNUE vì điểm sàn khác nhau theo ngành (18–22/30).');
  }
  if (program.floor30 === undefined) {
    missingRequirements.push({ kind: 'official-rule', code: 'hnue-program-out-of-exact-scope', label: `${program.name}: ${program.outOfScopeReason ?? 'chưa mô hình hoá.'}` });
    return unknown(`Ngành ${program.name} của HNUE chưa nằm trong phạm vi tính exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hnue-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của HNUE.' });
    return unknown('Cần chọn tổ hợp 3 môn để so với điểm sàn HNUE.');
  }
  const { subjects } = context.subjectContext;
  const missing = subjects.filter((subjectId) => profile.thpt?.scores?.[subjectId] === undefined);
  if (missing.length > 0) {
    missingRequirements.push(
      ...missing.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hnue-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HNUE.`,
      }))
    );
    return unknown('Cần đủ điểm 3 môn của tổ hợp để so với điểm sàn HNUE.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(subjects.reduce((sum, subjectId) => sum + profile.thpt!.scores![subjectId]!, 0));
  const maxPriority30 = lookupHnueMaxPriority30(profile.priority?.region, profile.priority?.category);
  const floor30 = program.floor30;

  const explanation: CalculationStep[] = [
    {
      id: 'hnue-floor-raw',
      label: 'Tổng điểm 3 môn thi TN THPT (không nhân hệ số) — so với điểm sàn, KHÔNG phải điểm xét tuyển cuối',
      output: raw30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: HNUE_FLOOR_EVIDENCE,
    },
  ];

  missingRequirements.push(
    {
      kind: 'official-rule',
      code: 'hnue-final-score-not-modeled',
      label: 'Chỉ kiểm tra điểm sàn: điểm xét tuyển cuối của HNUE (hệ số môn, quy đổi) chưa mô hình hoá, chưa có điểm chuẩn để so sánh.',
    },
    { kind: 'official-rule', code: 'hnue-other-methods-not-modeled', label: 'Các phương thức khác (kết quả thi riêng SPT2026, xét tuyển thẳng...) chưa mô hình hoá.' }
  );

  let status: 'eligible' | 'ineligible' | 'unknown';
  let reason: string;
  if (raw30 >= floor30) {
    status = 'eligible';
    reason = `Tổng ${raw30}/30 ≥ điểm sàn ${floor30}/30 của ngành ${program.name}.`;
  } else if (round2(raw30 + maxPriority30) < floor30) {
    status = 'ineligible';
    reason = `Tổng ${raw30}/30 (kể cả cộng ưu tiên tối đa ${maxPriority30}) vẫn < điểm sàn ${floor30}/30 của ngành ${program.name}.`;
  } else {
    status = 'unknown';
    reason = `Tổng ${raw30}/30 < điểm sàn ${floor30}/30 (xác định cho thí sinh khu vực 3), nhưng cộng ưu tiên có thể đạt: nguồn không nói rõ ưu tiên được tính trước hay sau khi so sàn nên chưa kết luận.`;
    missingRequirements.push({
      kind: 'official-rule',
      code: 'hnue-priority-vs-floor-unspecified',
      label: 'Điểm sàn HNUE xác định cho thí sinh khu vực 3, không nêu ưu tiên tính trước hay sau khi so sàn.',
    });
  }

  return {
    schoolId: 'hnue',
    year: HNUE_FLOOR_METHOD.year,
    methodId: HNUE_FLOOR_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...HNUE_FLOOR_EVIDENCE],
  };
}
