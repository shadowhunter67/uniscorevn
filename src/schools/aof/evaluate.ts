import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { AOF_THPT_THRESHOLD } from './eligibility';
import { aofAdmissionMethods } from './methods';
import { AOF_FIELD_THRESHOLD_BY_CODE_2025, type AofFieldThreshold2025 } from './thresholds2025';
import { lookupAofStandardPriority30_2025, calculateAofEffectivePriority30_2025 } from './priority2025';
import { aofExactFormulaEvidence2025, aofFieldThresholdEvidence2025 } from './evidence2025';

export function evaluateAofThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'aof',
    schoolShortName: 'AOF',
    method: aofAdmissionMethods[0],
    profile,
    context,
    threshold: AOF_THPT_THRESHOLD,
    evidenceSourceId: 'aof-threshold-2026',
  });
}

function readSubjectTotal2025(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

const AOF_EXACT_METHOD_2025 = aofAdmissionMethods[1];

export interface AofSubjectContext2025 {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface AofThptExamExactEvaluationContext2025 {
  fieldCode?: string;
  subjectContext?: AofSubjectContext2025;
}

function aofExactPartial2025(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'aof',
    year: AOF_EXACT_METHOD_2025.year,
    methodId: AOF_EXACT_METHOD_2025.id,
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
 * AOF 2025 — nhánh exact (phương thức 3, năm liền kề, KHÁC method[0] là ngưỡng sàn 2026). Điểm xét
 * = tổng thô 3 môn (KHÔNG nhân hệ số) + điểm ưu tiên KV/ĐT (judgment call giá trị bảng, nguồn xác
 * nhận TRỰC TIẾP CÓ cộng). So với điểm chuẩn theo ngành/chương trình đã chọn — điểm chuẩn GIỐNG
 * NHAU giữa mọi tổ hợp trong 1 ngành (kiểu VNU-UET/HUNRE/HUMP).
 */
export function evaluateAofThptExamExactAdmission2025(
  profile: ApplicantProfile,
  context: AofThptExamExactEvaluationContext2025 = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'aof-field-2025', label: 'Chọn ngành/chương trình AOF để tra điểm chuẩn 2025 và tính Điểm xét.' });
    return aofExactPartial2025({ missingRequirements, reason: 'Cần chọn ngành/chương trình AOF để áp điểm chuẩn 2025 và tính Điểm xét.' });
  }
  const entry: AofFieldThreshold2025 | undefined = AOF_FIELD_THRESHOLD_BY_CODE_2025.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'aof-field-2025', label: `Ngành/chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn AOF 2025 (chưa mô hình hoá).` });
    return aofExactPartial2025({ missingRequirements, reason: `Ngành/chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn AOF 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'aof-subject-combination-2025', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return aofExactPartial2025({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!entry.combinationIds.includes(context.subjectContext.combinationId ?? '')) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'aof-subject-combination-not-in-list-2025',
      label: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return aofExactPartial2025({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.name} (${entry.combinationIds.join(', ')}).` });
  }

  const { total30, missingSubjects } = readSubjectTotal2025(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `aof-thpt-2025-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return aofExactPartial2025({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét AOF 2025.' });
  }
  const raw30 = total30 as number;

  const standardPriority30 = lookupAofStandardPriority30_2025(profile.priority?.region, profile.priority?.category);
  const priority = calculateAofEffectivePriority30_2025({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const eligible = finalScore >= entry.threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (nhánh thi TN THPT 2025, phương thức 3): tổng 3 môn + điểm ưu tiên KV/ĐT ≥ ${entry.threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];

  explanation.push({
    id: 'aof-exact-raw-2025',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: aofExactFormulaEvidence2025.evidence,
  });
  explanation.push({
    id: 'aof-exact-priority-2025',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: aofExactFormulaEvidence2025.evidence,
  });
  explanation.push({
    id: 'aof-exact-final-2025',
    label: 'Điểm xét (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô + Điểm ưu tiên',
    evidence: aofExactFormulaEvidence2025.evidence,
  });
  explanation.push({
    id: 'aof-exact-threshold-2025',
    label: `Điểm chuẩn — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: aofFieldThresholdEvidence2025.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'aof-priority-region-category-2025',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'aof',
    year: AOF_EXACT_METHOD_2025.year,
    methodId: AOF_EXACT_METHOD_2025.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...aofExactFormulaEvidence2025.evidence, ...aofFieldThresholdEvidence2025.evidence],
  };
}
