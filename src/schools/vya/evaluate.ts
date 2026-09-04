import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vyaAdmissionMethods } from './methods';
import { VYA_FIELD_THRESHOLD_BY_CODE, type VyaFieldThreshold } from './thresholds';
import { lookupVyaStandardPriority30, calculateVyaEffectivePriority30 } from './priority';
import { calculateVyaCertificateBonus30, calculateVyaBonus30 } from './bonus';
import { vyaFormulaEvidence, vyaFieldThresholdEvidence, vyaBonusEvidence } from './evidence';

export interface VyaSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function readThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

/** ĐTB môn = (Điểm cả năm lớp 10 + lớp 11 + lớp 12)/3 — chỉ tính khi ĐỦ cả 3 năm cho môn đó
 * (Quyết định 218/QĐ-HVTTNVN mục 2, phương thức 2). */
function readTranscriptAverageTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const g10 = profile.transcript?.grade10?.[subjectId];
    const g11 = profile.transcript?.grade11?.[subjectId];
    const g12 = profile.transcript?.grade12?.[subjectId];
    if (g10 === undefined || g11 === undefined || g12 === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    total += (g10 + g11 + g12) / 3;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

function vyaPartial(methodId: string, year: number, input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vya',
    year,
    methodId,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

export interface VyaEvaluationContext {
  fieldCode?: string;
  subjectContext?: VyaSubjectContext;
}

function evaluateVyaByMode(
  profile: ApplicantProfile,
  context: VyaEvaluationContext,
  mode: {
    methodId: string;
    year: number;
    fieldContextCode: string;
    subjectContextCode: string;
    scoreLabel: string;
    scoreFormulaLabel: string;
    getThreshold: (entry: VyaFieldThreshold) => number | undefined;
    readTotal: (profile: ApplicantProfile, subjects: readonly SubjectId[]) => { total30?: number; missingSubjects: SubjectId[] };
    missingSubjectCodePrefix: string;
  }
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: mode.fieldContextCode, label: 'Chọn ngành VYA để tra điểm trúng tuyển và tính Điểm xét.' });
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: 'Cần chọn ngành VYA để áp điểm trúng tuyển và tính Điểm xét.' });
  }
  const entry: VyaFieldThreshold | undefined = VYA_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: mode.fieldContextCode, label: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển VYA 2026 (chưa mô hình hoá).` });
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: `Ngành "${context.fieldCode}" không có trong bảng điểm trúng tuyển VYA 2026 (chưa mô hình hoá).` });
  }
  const threshold30 = mode.getThreshold(entry);
  if (threshold30 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: mode.fieldContextCode, label: `${entry.name} không xét phương thức này tại VYA năm 2026 ("Không xét").` });
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: `${entry.name} không xét phương thức này tại VYA năm 2026.` });
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: mode.subjectContextCode, label: `Chọn tổ hợp xét tuyển cho ${entry.name}.` });
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: `Cần chọn tổ hợp xét tuyển cho ${entry.name}.` });
  }
  if (!context.subjectContext.combinationId || !entry.combinationIds.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: mode.subjectContextCode,
      label: `Tổ hợp đã chọn không nằm trong danh sách tổ hợp chính thức của ${entry.name} (${entry.combinationIds.join(', ')}).`,
    });
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: `Tổ hợp đã chọn không thuộc danh sách tổ hợp chính thức của ${entry.name}.` });
  }

  const { total30, missingSubjects } = mode.readTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `${mode.missingSubjectCodePrefix}-${subjectId}`,
        label: `${mode.scoreLabel} môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return vyaPartial(mode.methodId, mode.year, { missingRequirements, reason: `Cần đủ dữ liệu để tính Điểm xét VYA (${mode.scoreLabel}).` });
  }
  const raw30 = total30 as number;

  const certificateBonus30 = calculateVyaCertificateBonus30(profile.certificates);
  const bonus30 = calculateVyaBonus30({ certificateBonus30 });
  const standardPriority30 = lookupVyaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVyaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + bonus30 + priority.effectivePriority30));

  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (${mode.scoreFormulaLabel}, VYA 2026): tổng 3 môn + điểm cộng + điểm ưu tiên KV/ĐT >= ${threshold30}/30 — tổng của bạn = ${finalScore}/30.`,
    eligible ? 'Đạt/vượt điểm trúng tuyển chính thức đã công bố năm 2026.' : 'Chưa đạt điểm trúng tuyển chính thức đã công bố năm 2026.',
  ];

  explanation.push({
    id: `${mode.methodId}-raw`,
    label: `${mode.scoreLabel} (thô)`,
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: vyaFormulaEvidence.evidence,
  });
  if (bonus30 > 0) {
    explanation.push({
      id: `${mode.methodId}-bonus`,
      label: 'Điểm cộng (chứng chỉ IELTS)',
      output: bonus30,
      scale: 30,
      formula: 'Bảng điểm khuyến khích IELTS (Quyết định 218/QĐ-HVTTNVN, mục 5.2.2), trần 3,0/30',
      evidence: vyaBonusEvidence.evidence,
    });
  }
  explanation.push({
    id: `${mode.methodId}-priority`,
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT (Điều 7 Quy chế tuyển sinh VYA)'
      : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Quy chế tuyển sinh VYA)',
    evidence: vyaFormulaEvidence.evidence,
  });
  explanation.push({
    id: `${mode.methodId}-final`,
    label: 'Điểm xét (đã cộng điểm cộng/ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: `${mode.scoreLabel} + Điểm cộng + Điểm ưu tiên`,
    evidence: vyaFormulaEvidence.evidence,
  });
  explanation.push({
    id: `${mode.methodId}-threshold`,
    label: `Điểm trúng tuyển 2026 — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vyaFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vya-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vya',
    year: mode.year,
    methodId: mode.methodId,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vyaFormulaEvidence.evidence, ...vyaFieldThresholdEvidence.evidence, ...(bonus30 > 0 ? vyaBonusEvidence.evidence : [])],
  };
}

const VYA_THPT_METHOD = vyaAdmissionMethods[0];
const VYA_TRANSCRIPT_METHOD = vyaAdmissionMethods[1];

/** Mã 100 — xét kết quả thi TN THPT 2026. Điểm xét = tổng thô 3 môn theo tổ hợp (không hệ số) +
 * điểm ưu tiên KV/ĐT. So với điểm trúng tuyển CHÍNH THỨC 2026 theo NGÀNH đã chọn. */
export function evaluateVyaThptExamAdmission(profile: ApplicantProfile, context: VyaEvaluationContext = {}): AdmissionEvaluation {
  return evaluateVyaByMode(profile, context, {
    methodId: VYA_THPT_METHOD.id,
    year: VYA_THPT_METHOD.year,
    fieldContextCode: 'vya-field',
    subjectContextCode: 'vya-subject-combination',
    scoreLabel: 'Tổng điểm 3 môn thi',
    scoreFormulaLabel: 'mã 100, thi TN THPT',
    getThreshold: (entry) => entry.threshold100,
    readTotal: readThptTotal,
    missingSubjectCodePrefix: 'vya-thpt',
  });
}

/** Mã 200 — xét học bạ THPT lớp 10/11/12. Điểm xét = tổng ĐTB 3 môn (mỗi môn trung bình 3 năm) +
 * điểm ưu tiên KV/ĐT. Luật/Quan hệ công chúng không có threshold200 ("Không xét"). */
export function evaluateVyaTranscriptAdmission(profile: ApplicantProfile, context: VyaEvaluationContext = {}): AdmissionEvaluation {
  return evaluateVyaByMode(profile, context, {
    methodId: VYA_TRANSCRIPT_METHOD.id,
    year: VYA_TRANSCRIPT_METHOD.year,
    fieldContextCode: 'vya-transcript-field',
    subjectContextCode: 'vya-transcript-subject-combination',
    scoreLabel: 'Tổng ĐTB 3 môn (lớp 10/11/12)',
    scoreFormulaLabel: 'mã 200, học bạ',
    getThreshold: (entry) => entry.threshold200,
    readTotal: readTranscriptAverageTotal,
    missingSubjectCodePrefix: 'vya-transcript',
  });
}
