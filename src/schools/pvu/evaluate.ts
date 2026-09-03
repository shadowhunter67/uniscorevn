import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { pvuAdmissionMethods } from './methods';
import { calculatePvuEffectivePriority30, lookupPvuStandardPriority30 } from './priority';
import { pvuThptExamFormulaEvidence, pvuThresholdEvidence } from './evidence';

const PVU_METHOD = pvuAdmissionMethods[0];
const PVU_THPT_EXAM_THRESHOLD_30 = 22.5;

export interface PvuThptExamContext {
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/**
 * PVU 2026 — phương thức PT1 (thi TN THPT), hệ chính quy trong nước. Điểm xét tuyển = tổng thô 3
 * môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call giá trị bảng). So với điểm chuẩn 2026 =
 * 22,50/30 — mức DUY NHẤT áp dụng cho mọi ngành/tổ hợp (khác PCTU/HUST vốn có bảng theo ngành).
 */
export function evaluatePvuThptExamAdmission(profile: ApplicantProfile, context: PvuThptExamContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'pvu',
    year: PVU_METHOD.year,
    methodId: PVU_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'pvu-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển PVU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính Điểm xét tuyển PVU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `pvu-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp PVU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển PVU.');
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupPvuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePvuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(Math.min(30, raw30 + priority.effectivePriority30));
  const eligible = dxt30 >= PVU_THPT_EXAM_THRESHOLD_30;

  const reasons = [
    `Điểm chuẩn PVU 2026 (PT1, hệ chính quy trong nước, đợt 1, đồng nhất mọi ngành/tổ hợp): Điểm xét tuyển ≥ ${PVU_THPT_EXAM_THRESHOLD_30}/30 — của bạn = ${dxt30}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];

  explanation.push({
    id: 'pvu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: pvuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pvu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT (khung quốc gia, judgment call)' : 'Mức ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: pvuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pvu-exact-dxt',
    label: 'Điểm xét tuyển',
    output: dxt30,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên',
    evidence: pvuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pvu-exact-threshold',
    label: 'Điểm chuẩn PT1 2026 (hệ chính quy trong nước)',
    output: PVU_THPT_EXAM_THRESHOLD_30,
    scale: 30,
    formula: reasons[0],
    evidence: pvuThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'pvu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'pvu',
    year: PVU_METHOD.year,
    methodId: PVU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pvuThptExamFormulaEvidence.evidence, ...pvuThresholdEvidence.evidence],
  };
}
