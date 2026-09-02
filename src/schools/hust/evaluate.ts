import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUST_THPT_THRESHOLD } from './eligibility';
import { hustAdmissionMethods } from './methods';
import { HUST_FIELD_THRESHOLD_BY_CODE_2025, type HustFieldThreshold2025 } from './thresholds2025';
import { lookupHustStandardPriority30_2025, calculateHustEffectivePriority30_2025 } from './priority2025';
import { hustExactFormulaEvidence2025, hustFieldThresholdEvidence2025 } from './evidence2025';

export function evaluateHustThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hust',
    schoolShortName: 'HUST',
    method: hustAdmissionMethods[0],
    profile,
    context,
    threshold: HUST_THPT_THRESHOLD,
    evidenceSourceId: 'hust-threshold-2026',
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

const HUST_EXACT_METHOD_2025 = hustAdmissionMethods[1];

export interface HustSubjectContext2025 {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface HustThptExamExactEvaluationContext2025 {
  fieldCode?: string;
  subjectContext?: HustSubjectContext2025;
}

function hustExactPartial2025(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hust',
    year: HUST_EXACT_METHOD_2025.year,
    methodId: HUST_EXACT_METHOD_2025.id,
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
 * HUST 2025 — nhánh exact. Điểm xét (ĐX) = (a) tổng thô 3 môn nếu tổ hợp KHÔNG có môn chính, hoặc
 * (b) [(tổng thô 3 môn + điểm môn chính) x 3/4] nếu tổ hợp CÓ môn chính — cộng điểm ưu tiên KV/ĐT
 * (judgment call giá trị bảng, quy tắc giảm dần áp trên TỔNG THÔ chưa nhân hệ số). So với điểm
 * chuẩn theo CHƯƠNG TRÌNH + TỔ HỢP đã chọn (mỗi tổ hợp trong 1 chương trình có điểm chuẩn RIÊNG,
 * giống mô hình HUC/QBU/VNU-USSH).
 */
export function evaluateHustThptExamExactAdmission2025(
  profile: ApplicantProfile,
  context: HustThptExamExactEvaluationContext2025 = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'hust-field-2025', label: 'Chọn chương trình đào tạo HUST để tra điểm chuẩn 2025 và tính Điểm xét.' });
    return hustExactPartial2025({ missingRequirements, reason: 'Cần chọn chương trình đào tạo HUST để áp điểm chuẩn 2025 và tính Điểm xét.' });
  }
  const entry: HustFieldThreshold2025 | undefined = HUST_FIELD_THRESHOLD_BY_CODE_2025.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'hust-field-2025', label: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn HUST 2025 (chưa mô hình hoá).` });
    return hustExactPartial2025({ missingRequirements, reason: `Chương trình "${context.fieldCode}" không có trong bảng điểm chuẩn HUST 2025 (chưa mô hình hoá).` });
  }
  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'hust-subject-combination-2025', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return hustExactPartial2025({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  const combinationEntry = entry.combinations.find((c) => c.combinationId === context.subjectContext?.combinationId);
  if (!combinationEntry) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'hust-subject-combination-not-in-list-2025',
      label: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.name} (${entry.combinations.map((c) => c.combinationId).join(', ')}).`,
    });
    return hustExactPartial2025({ missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách công bố cho ${entry.name} (${entry.combinations.map((c) => c.combinationId).join(', ')}).` });
  }

  const { total30, missingSubjects } = readSubjectTotal2025(profile, context.subjectContext.subjects);
  const mainSubject = combinationEntry.mainSubject;
  const mainSubjectMissing = mainSubject !== undefined && profile.thpt?.scores?.[mainSubject] === undefined;
  if (missingSubjects.length > 0 || mainSubjectMissing) {
    const allMissing = new Set<SubjectId>(missingSubjects);
    if (mainSubject !== undefined && mainSubjectMissing) allMissing.add(mainSubject);
    missingRequirements.push(
      ...[...allMissing].map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `hust-thpt-2025-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp/công thức đã chọn.`,
      }))
    );
    return hustExactPartial2025({ missingRequirements, reason: 'Cần đủ điểm các môn thi TN THPT (kể cả môn chính nếu có) để tính Điểm xét HUST 2025.' });
  }
  const raw30 = total30 as number;
  const mainSubjectScore = mainSubject !== undefined ? (profile.thpt?.scores?.[mainSubject] as number) : undefined;
  const dx30 = mainSubject !== undefined && mainSubjectScore !== undefined ? round2(((raw30 + mainSubjectScore) * 3) / 4) : raw30;

  const standardPriority30 = lookupHustStandardPriority30_2025(profile.priority?.region, profile.priority?.category);
  const priority = calculateHustEffectivePriority30_2025({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, dx30 + priority.effectivePriority30));

  const threshold30 = combinationEntry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} — tổ hợp ${combinationEntry.combinationId} (nhánh thi TN THPT 2025): Điểm xét >= ${threshold30}/30 — Điểm xét của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt điểm chuẩn, dự đoán trúng tuyển theo ngưỡng đã công bố.' : 'Chưa đạt điểm chuẩn đã công bố.',
  ];

  explanation.push({
    id: 'hust-exact-raw-2025',
    label: 'Tổng điểm 3 môn thi (thô, không nhân hệ số)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: hustExactFormulaEvidence2025.evidence,
  });
  if (mainSubject !== undefined) {
    explanation.push({
      id: 'hust-exact-dx-2025',
      label: 'Điểm xét (ĐX) — có môn chính',
      output: dx30,
      scale: 30,
      formula: `[(Tổng thô + ${SUBJECT_LABELS[mainSubject]}) x 3/4]`,
      evidence: hustExactFormulaEvidence2025.evidence,
    });
  }
  explanation.push({
    id: 'hust-exact-priority-2025',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia, judgment call)',
    evidence: hustExactFormulaEvidence2025.evidence,
  });
  explanation.push({
    id: 'hust-exact-final-2025',
    label: 'Điểm xét cuối cùng (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: mainSubject !== undefined ? 'ĐX (có môn chính) + Điểm ưu tiên' : 'Tổng thô + Điểm ưu tiên',
    evidence: hustExactFormulaEvidence2025.evidence,
  });
  explanation.push({
    id: 'hust-exact-threshold-2025',
    label: `Điểm chuẩn — ${entry.name} (${combinationEntry.combinationId})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: hustFieldThresholdEvidence2025.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'hust-priority-region-category-2025',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'hust',
    year: HUST_EXACT_METHOD_2025.year,
    methodId: HUST_EXACT_METHOD_2025.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hustExactFormulaEvidence2025.evidence, ...hustFieldThresholdEvidence2025.evidence],
  };
}
