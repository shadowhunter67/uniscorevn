import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { ulsaAdmissionMethods } from './methods';
import { ULSA_CAMPUS_LABELS, ULSA_PROGRAM_BY_CODE, type UlsaProgram } from './thresholds';
import { lookupUlsaStandardPriority30, calculateUlsaEffectivePriority30 } from './priority';
import { ulsaThptExamFormulaEvidence, ulsaPriorityEvidence, ulsaThresholdEvidence } from './evidence';

export interface UlsaSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface UlsaEvaluationContext {
  programCode?: string;
  subjectContext?: UlsaSubjectContext;
}

function partialResult(methodId: string, year: number, reason: string, missingRequirements: MissingRequirement[] = []): AdmissionEvaluation {
  return {
    schoolId: 'ulsa',
    year,
    methodId,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  };
}

function resolveProgramAndCombination(context: UlsaEvaluationContext): { program?: UlsaProgram; combinationError?: MissingRequirement } {
  if (!context.programCode) return {};
  const program = ULSA_PROGRAM_BY_CODE.get(context.programCode);
  if (!program) return {};
  if (context.subjectContext?.combinationId && !program.combinationIds.includes(context.subjectContext.combinationId)) {
    return {
      program,
      combinationError: {
        kind: 'school-context',
        code: 'ulsa-subject-combination',
        label: `Tổ hợp đã chọn không thuộc danh sách tổ hợp xét tuyển (nhánh thi TN THPT) đã công bố của chương trình ${program.name} (${program.combinationIds.join(', ')}).`,
      },
    };
  }
  return { program };
}

/**
 * ULSA 2026 — Phương thức 100 (xét kết quả thi TN THPT, "PT gốc"). Điểm xét tuyển = tổng thô 3 môn
 * theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên KV/ĐT theo khung quốc gia. So với điểm trúng
 * tuyển CHÍNH THỨC theo từng chương trình đào tạo VÀ từng địa điểm đào tạo (Thông báo
 * 2752/TB-HĐTSĐH2026, 11/8/2026: 28 chương trình DLX Hà Nội + 14 chương trình DLS TP.HCM).
 */
export function evaluateUlsaThptExamAdmission(profile: ApplicantProfile, context: UlsaEvaluationContext = {}): AdmissionEvaluation {
  const method = ulsaAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ulsa-program', label: 'Chọn chương trình đào tạo ULSA (kèm địa điểm đào tạo DLX Hà Nội / DLS TP.HCM) để tính Điểm xét tuyển.' });
    return partialResult(method.id, method.year, 'Cần chọn ngành ULSA để tính Điểm xét tuyển.', missingRequirements);
  }
  const { program, combinationError } = resolveProgramAndCombination(context);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'ulsa-program', label: `Chương trình "${context.programCode}" chưa mô hình hoá cho ULSA.` });
    return partialResult(method.id, method.year, `Chương trình "${context.programCode}" chưa mô hình hoá cho ULSA.`, missingRequirements);
  }
  if (combinationError) {
    missingRequirements.push(combinationError);
    return partialResult(method.id, method.year, combinationError.label, missingRequirements);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'ulsa-subject-combination', label: `Chọn tổ hợp xét tuyển cho chương trình ${program.name}.` });
    return partialResult(method.id, method.year, `Cần chọn tổ hợp xét tuyển cho chương trình ${program.name}.`, missingRequirements);
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
        code: `ulsa-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp đã chọn.`,
      }))
    );
    return partialResult(method.id, method.year, 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển ULSA.', missingRequirements);
  }
  const raw30 = round2(total);

  const standardPriority30 = lookupUlsaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUlsaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, raw30 + priority.effectivePriority30));

  const threshold30 = program.threshold30;
  const eligible = finalScore >= threshold30;

  const reasons: string[] = [
    `Điểm trúng tuyển ULSA 2026 (Phương thức 100 — thi TN THPT, ${program.name}, mã ngành ${program.maNganh}, ${ULSA_CAMPUS_LABELS[program.campus]}): ${threshold30}/30 — Điểm xét tuyển của bạn = ${finalScore}/30.`,
    eligible
      ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 2752/TB-HĐTSĐH2026).'
      : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026 (Thông báo 2752/TB-HĐTSĐH2026).',
  ];

  explanation.push({
    id: 'ulsa-thpt-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
    evidence: ulsaThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ulsa-thpt-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Quy chế tuyển sinh hiện hành, Điều 7 Thông tư 06/2026/TT-BGDĐT)',
    evidence: ulsaPriorityEvidence.evidence,
  });
  explanation.push({
    id: 'ulsa-thpt-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn theo tổ hợp + Điểm ưu tiên',
    evidence: ulsaThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ulsa-thpt-threshold',
    label: `Điểm trúng tuyển — ${program.name} (${program.maNganh}, ${ULSA_CAMPUS_LABELS[program.campus]})`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: ulsaThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ulsa-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ulsa',
    year: method.year,
    methodId: method.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...ulsaThptExamFormulaEvidence.evidence, ...ulsaThresholdEvidence.evidence],
  };
}
