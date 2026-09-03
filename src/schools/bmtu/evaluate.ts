import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { bmtuAdmissionMethods } from './methods';
import { BMTU_FIELD_THRESHOLD_BY_CODE, BMTU_COMBINATION_IDS, type BmtuFieldThreshold } from './thresholds';
import { lookupBmtuStandardPriority30, calculateBmtuEffectivePriority30 } from './priority';
import { calculateBmtuHsgBonus30, type BmtuHsgAwardLevel } from './bonus';
import { bmtuExactFormulaEvidence, bmtuFieldThresholdEvidence, bmtuHsgBonusEvidence } from './evidence';

export interface BmtuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface BmtuEvaluationContext {
  fieldCode?: string;
  subjectContext?: BmtuSubjectContext;
  /** Điểm thưởng HSG (mục 7 đề án) — không có field chuẩn trong `ApplicantProfile`, caller tự truyền. */
  hsgAwardLevel?: BmtuHsgAwardLevel;
}

const BMTU_METHOD = bmtuAdmissionMethods[0];

function bmtuPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'bmtu',
    year: BMTU_METHOD.year,
    methodId: BMTU_METHOD.id,
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
 * BMTU 2026 — phương thức 1 (thi TN THPT, mục 2.1.a đề án): Điểm xét tuyển = ĐM1+ĐM2+ĐM3 (tổng thô
 * 3 môn, không hệ số) + Điểm ưu tiên KV/ĐT (khung quốc gia, judgment call — `priority.ts`) + điểm
 * thưởng HSG (nếu caller truyền `hsgAwardLevel`, mục 7 đề án). So với điểm chuẩn 2026 chính thức
 * theo ngành (`thresholds.ts`, giới hạn Y khoa/Dược học). Điều kiện phụ: môn Sinh (Y khoa) hoặc Hóa
 * (Dược học) lớp 12 phải đạt >= 6,5 (mục 4.2 đề án) — đọc từ `ApplicantProfile.transcript.grade12`.
 */
export function evaluateBmtuThptExamAdmission(profile: ApplicantProfile, context: BmtuEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'bmtu-field', label: 'Chọn ngành BMTU (Y khoa hoặc Dược học) để tra điểm chuẩn và tính Điểm xét tuyển.' });
    return bmtuPartial({ missingRequirements, reason: 'Cần chọn ngành BMTU để áp điểm chuẩn và tính Điểm xét tuyển.' });
  }
  const entry: BmtuFieldThreshold | undefined = BMTU_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'bmtu-field', label: `Mã ngành "${context.fieldCode}" chưa được mô hình hoá ở BMTU (chỉ hỗ trợ Y khoa 7720101, Dược học 7720201).` });
    return bmtuPartial({ missingRequirements, reason: `Mã ngành "${context.fieldCode}" chưa được mô hình hoá ở BMTU.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'bmtu-subject-combination', label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return bmtuPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !BMTU_COMBINATION_IDS.includes(context.subjectContext.combinationId as (typeof BMTU_COMBINATION_IDS)[number])) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'bmtu-subject-combination',
      label: `Tổ hợp đã chọn không nằm trong 5 tổ hợp BMTU đã mô hình hoá (${BMTU_COMBINATION_IDS.join(', ')}).`,
    });
    return bmtuPartial({ missingRequirements, reason: 'Tổ hợp đã chọn không thuộc 5 tổ hợp BMTU đã mô hình hoá.' });
  }

  const { total30, missingSubjects } = readSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `bmtu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return bmtuPartial({ missingRequirements, reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển BMTU.' });
  }
  const raw30 = total30 as number;

  const gateGrade = profile.transcript?.grade12?.[entry.gateSubject];
  const gateLabel = `Điểm trung bình môn ${SUBJECT_LABELS[entry.gateSubject]} lớp 12 >= ${entry.gateMinGrade12}`;
  if (gateGrade === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: `bmtu-gate-${entry.gateSubject}`,
      label: `${gateLabel} (điều kiện phụ đăng ký xét tuyển ${entry.name}, chưa nhập).`,
    });
  }
  const gatePass = gateGrade === undefined ? undefined : gateGrade >= entry.gateMinGrade12;

  const standardPriority30 = lookupBmtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateBmtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const hsgBonus30 = calculateBmtuHsgBonus30(context.hsgAwardLevel);
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30 + hsgBonus30));

  const threshold30 = entry.threshold30;
  const meetsScore = finalScore >= threshold30;
  const eligible = meetsScore && gatePass !== false;
  const status: 'eligible' | 'ineligible' | 'unknown' = gatePass === undefined ? (meetsScore ? 'unknown' : 'ineligible') : eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm chuẩn ${entry.name} (thi TN THPT 2026): tổng 3 môn + ưu tiên + điểm thưởng (nếu có) >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    meetsScore ? 'Đạt/vượt điểm chuẩn đã công bố năm 2026.' : 'Chưa đạt điểm chuẩn đã công bố năm 2026.',
    gatePass === false ? `Không đạt điều kiện phụ: ${gateLabel}.` : gatePass === true ? `Đạt điều kiện phụ: ${gateLabel}.` : `Chưa xác định điều kiện phụ: ${gateLabel}.`,
  ];

  explanation.push({
    id: 'bmtu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: bmtuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bmtu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)'
      : 'Mức điểm ưu tiên KV/ĐT (khung quốc gia hiện hành)',
    evidence: bmtuExactFormulaEvidence.evidence,
  });
  if (context.hsgAwardLevel) {
    explanation.push({
      id: 'bmtu-exact-hsg-bonus',
      label: 'Điểm thưởng HSG',
      output: hsgBonus30,
      scale: 30,
      formula: 'Bảng điểm thưởng HSG theo cấp/giải (mục 7 đề án)',
      evidence: bmtuHsgBonusEvidence.evidence,
    });
  }
  explanation.push({
    id: 'bmtu-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng thô 3 môn + Điểm ưu tiên + Điểm thưởng HSG (nếu có)',
    evidence: bmtuExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bmtu-exact-threshold',
    label: `Điểm chuẩn — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: bmtuFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'bmtu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'bmtu',
    year: BMTU_METHOD.year,
    methodId: BMTU_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...bmtuExactFormulaEvidence.evidence, ...bmtuFieldThresholdEvidence.evidence],
  };
}
