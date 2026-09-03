import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { ctuetAdmissionMethods } from './methods';
import { CTUET_FIELD_THRESHOLD_BY_CODE, type CtuetFieldThreshold } from './thresholds';
import { lookupCtuetPriority30, calculateCtuetEffectivePriority30 } from './priority';
import { ctuetExactFormulaEvidence, ctuetFieldThresholdEvidence } from './evidence';

export interface CtuetSubjectContext {
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

const CTUET_METHOD = ctuetAdmissionMethods[0];

function ctuetPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'ctuet',
    year: CTUET_METHOD.year,
    methodId: CTUET_METHOD.id,
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
 * CTUET 2025 — phương thức xét kết quả thi TN THPT. Điểm xét = tổng thô 3 môn theo tổ hợp (không
 * hệ số) + điểm ưu tiên KV/ĐT (mức CHÍNH CHỦ trường công bố, `priority.ts`) + điểm cộng (mặc định 0
 * — trường không công bố bảng cụ thể). So với điểm trúng tuyển chính thức theo NGÀNH đã chọn — chỉ
 * chấp nhận tổ hợp nằm trong danh sách tổ hợp CHÍNH THỨC của ngành đó (`thresholds.ts`).
 */
export function evaluateCtuetThptExamAdmission(
  profile: ApplicantProfile,
  context: { fieldCode?: string; subjectContext?: CtuetSubjectContext } = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ctuet-field', label: 'Chọn ngành CTUET để tra điểm trúng tuyển và tính Điểm xét tuyển.' });
    return ctuetPartial({ missingRequirements, reason: 'Cần chọn ngành CTUET để áp điểm trúng tuyển và tính Điểm xét tuyển.' });
  }
  const entry: CtuetFieldThreshold | undefined = CTUET_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'ctuet-field', label: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển CTUET 2025 (chưa mô hình hoá).` });
    return ctuetPartial({ missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển CTUET 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ctuet-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return ctuetPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'ctuet-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return ctuetPartial({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ctuet-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return ctuetPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển CTUET.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupCtuetPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateCtuetEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (thi TN THPT 2025): tổng 3 môn + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2025.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2025.',
  ];

  explanation.push({
    id: 'ctuet-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: ctuetExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctuet-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (Phụ lục II/III, Quy chế tuyển sinh CTUET)'
      : 'Mức điểm ưu tiên KV/ĐT (Phụ lục II/III, Quy chế tuyển sinh CTUET)',
    evidence: ctuetExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctuet-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên + điểm cộng (mặc định 0)',
    evidence: ctuetExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctuet-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: ctuetFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ctuet-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ctuet',
    year: CTUET_METHOD.year,
    methodId: CTUET_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ctuetExactFormulaEvidence.evidence, ...ctuetFieldThresholdEvidence.evidence],
  };
}
