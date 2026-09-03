import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { hcaAdmissionMethods } from './methods';
import { HCA_MAJOR_THRESHOLD_BY_CODE, type HcaMajorThreshold } from './thresholds';
import { lookupHcaStandardPriority30, calculateHcaEffectivePriority30 } from './priority';
import { calculateHcaBonus30, type HcaBonusGroup1Level, type HcaBonusGroup2Level } from './bonus';
import { hcaExactFormulaEvidence, hcaCombinationEvidence, hcaThresholdEvidence, hcaPriorityEvidence, hcaBonusEvidence } from './evidence';

export interface HcaSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HcaEvaluationContext {
  majorCode?: string;
  subjectContext?: HcaSubjectContext;
  /** Điểm cộng Khuyến khích (Phụ lục 3) — không có field chuẩn trong `ApplicantProfile`, caller tự
   * truyền qua context, cùng tiền lệ BMTU. */
  bonusGroup1?: HcaBonusGroup1Level;
  bonusGroup2?: HcaBonusGroup2Level;
}

const HCA_METHOD = hcaAdmissionMethods[0];

function hcaPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hca',
    year: HCA_METHOD.year,
    methodId: HCA_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
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
 * HCA 2025 — phương thức 100 (thi TN THPT, mục 6.1.6 phần II): Điểm xét tuyển = M1+M2+M3 (tổng thô
 * 3 môn, không hệ số) + Điểm cộng Khuyến khích (nếu caller truyền `bonusGroup1`/`bonusGroup2`, Phụ
 * lục 3) + Điểm ưu tiên KV/ĐT (Phụ lục 4, `priority.ts` — bảng HCA TỰ công bố, không phải judgment
 * call). So với điểm chuẩn 2025 chính thức theo ngành (`thresholds.ts`, cả 5/5 ngành). Không có
 * điều kiện phụ/gate riêng nào ở phương thức 100 (điều kiện học lực/điểm sàn 18,0 của ngành Luật
 * chỉ áp dụng cho phương thức 200 — xét học bạ, KHÔNG áp dụng ở đây).
 */
export function evaluateHcaThptExamAdmission(profile: ApplicantProfile, context: HcaEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.majorCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hca-major', label: 'Chọn ngành HCA để tra điểm chuẩn và tính Điểm xét tuyển.' });
    return hcaPartial({ missingRequirements, reason: 'Cần chọn ngành HCA để áp điểm chuẩn và tính Điểm xét tuyển.' });
  }
  const entry: HcaMajorThreshold | undefined = HCA_MAJOR_THRESHOLD_BY_CODE.get(context.majorCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hca-major', label: `Mã ngành "${context.majorCode}" chưa được mô hình hoá ở HCA.` });
    return hcaPartial({ missingRequirements, reason: `Mã ngành "${context.majorCode}" chưa được mô hình hoá ở HCA.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hca-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hcaPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hca-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong các tổ hợp 2025 của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return hcaPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc các tổ hợp 2025 của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hca-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return hcaPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển HCA.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupHcaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHcaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const bonus30 = calculateHcaBonus30({ group1: context.bonusGroup1, group2: context.bonusGroup2 });
  const finalScore = round2(Math.min(30, raw30 + bonus30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2025): Điểm xét tuyển >= ${threshold30}/30 — của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm chuẩn đã công bố năm 2025.' : 'Chưa đạt điểm chuẩn đã công bố năm 2025.',
  ];

  explanation.push({
    id: 'hca-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô, M1+M2+M3)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hcaExactFormulaEvidence.evidence,
  });
  if (context.bonusGroup1 || context.bonusGroup2) {
    explanation.push({
      id: 'hca-exact-bonus',
      label: 'Điểm cộng Khuyến khích',
      output: bonus30,
      scale: 30,
      formula: 'Bảng điểm cộng khuyến khích theo nhóm 1 (HSG/KHKT) và nhóm 2 (chứng chỉ ngoại ngữ), Phụ lục 3',
      evidence: hcaBonusEvidence.evidence,
    });
  }
  explanation.push({
    id: 'hca-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (Phụ lục 4)'
      : 'Mức điểm ưu tiên KV/ĐT (Phụ lục 4)',
    evidence: hcaPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'hca-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'M1 + M2 + M3 + Điểm cộng Khuyến khích (nếu có) + Điểm ưu tiên (nếu có)',
    evidence: hcaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'hca-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hcaThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hca-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hca',
    year: HCA_METHOD.year,
    methodId: HCA_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hcaExactFormulaEvidence.evidence, ...hcaThresholdEvidence.evidence, ...hcaCombinationEvidence.evidence],
  };
}
