import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { napaAdmissionMethods } from './methods';
import {
  isNapaLawOrInspectorProgram,
  NAPA_MODELED_COMBINATIONS_BY_PROGRAM_CODE,
  NAPA_PROGRAM_LABELS,
  NAPA_THPT_EXAM_D01_THRESHOLD_30_BY_PROGRAM_CODE,
} from './thresholds';
import { calculateNapaEffectivePriority30, lookupNapaStandardPriority30 } from './priority';
import { napaThptExamExactEvidence } from './evidence';

const NAPA_EXACT_METHOD = napaAdmissionMethods[0];

export interface NapaThptExamExactEvaluationContext {
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

export function evaluateNapaThptExamExactAdmission(
  profile: ApplicantProfile,
  context: NapaThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'napa',
    year: NAPA_EXACT_METHOD.year,
    methodId: NAPA_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const threshold = context.programCode !== undefined ? NAPA_THPT_EXAM_D01_THRESHOLD_30_BY_PROGRAM_CODE[context.programCode] : undefined;
  if (context.programCode === undefined || threshold === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'napa-program-code', label: 'Chọn ma xét tuyển NAPA.' });
    return partial('Cần chọn ma xét tuyển NAPA để áp dụng điểm trúng tuyển.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'napa-subject-combination', label: 'Chọn tổ hợp D01 cho NAPA.' });
    return partial('Cần chọn tổ hợp D01 để tính điểm xét tuyển NAPA trong phạm vi đã xac minh.');
  }

  const modeledCombos = NAPA_MODELED_COMBINATIONS_BY_PROGRAM_CODE[context.programCode] ?? [];
  if (context.subjectContext.combinationId === undefined || !modeledCombos.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'napa-combination-not-modeled',
      label: 'Batch nay chi hỗ trợ tổ hợp gốc D01 vi điểm trúng tuyển chính thức đã quy đổi về D01.',
    });
    return partial('Tổ hợp đã chọn chưa được hỗ trợ cho NAPA; chỉ tính nhanh tổ hợp gốc D01.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `napa-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp D01.` })));
    return partial('Cần đủ điểm Toán, Ngữ văn va Tiếng Anh để tính điểm xét tuyển NAPA D01.');
  }

  const raw30 = round2(total);
  if (isNapaLawOrInspectorProgram(context.programCode)) {
    const math = profile.thpt?.scores?.math;
    const literature = profile.thpt?.scores?.literature;
    if (math === undefined || literature === undefined || math < 6 || literature < 6) {
      return {
        schoolId: 'napa',
        year: NAPA_EXACT_METHOD.year,
        methodId: NAPA_EXACT_METHOD.id,
        confidence: 'exact-verified',
        eligibility: {
          status: 'ineligible',
          reasons: ['Ngành Luật/Thanh tra của NAPA yeu cau Toán va Ngữ văn trong tổ hợp D01 moi môn tối thiểu 6,0.'],
        },
        score: { value: raw30, scale: 30 },
        missingInputs: [],
        missingRules: [],
        missingRequirements,
        explanation,
        evidence: [...napaThptExamExactEvidence.evidence],
      };
    }
  }

  const standardPriority30 = lookupNapaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateNapaEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(raw30 + priority.effectivePriority30);
  const programLabel = NAPA_PROGRAM_LABELS[context.programCode] ?? context.programCode;
  const eligible = dxt30 >= threshold;

  explanation.push({ id: 'napa-exact-raw', label: 'Tổng điểm 3 môn D01', output: raw30, scale: 30, formula: 'Toán + Ngữ văn + Tiếng Anh', evidence: napaThptExamExactEvidence.evidence });
  explanation.push({ id: 'napa-exact-priority', label: priority.reduced ? 'Điểm ưu tiên đã giam' : 'Điểm ưu tiên', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 - tổng điểm)/7,5] × mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT theo Điều 7 TT 06/2026', evidence: napaThptExamExactEvidence.evidence });
  explanation.push({ id: 'napa-exact-dxt', label: 'Điểm xét tuyển', output: dxt30, scale: 30, formula: 'round2(Toán + Ngữ văn + Tiếng Anh + điểm ưu tiên)', evidence: napaThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'napa-priority-region-category', label: 'Khu vực / đối tượng ưu tiên chưa nhập; điểm đang tính với ưu tiên = 0.' });
  }

  return {
    schoolId: 'napa',
    year: NAPA_EXACT_METHOD.year,
    methodId: NAPA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: eligible ? 'eligible' : 'ineligible',
      reasons: [
        `Điểm trúng tuyển NAPA 2026 (${programLabel}, tổ hợp gốc D01): ${threshold}/30.`,
        `Điểm xét tuyển = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 -> ${eligible ? 'dat' : 'chưa đạt'} ngưỡng.`,
      ],
    },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...napaThptExamExactEvidence.evidence],
  };
}
