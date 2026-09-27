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
    missingRequirements.push({ kind: 'school-context', code: 'napa-program-code', label: 'Chon ma xet tuyen NAPA.' });
    return partial('Can chon ma xet tuyen NAPA de ap dung diem trung tuyen.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'napa-subject-combination', label: 'Chon to hop D01 cho NAPA.' });
    return partial('Can chon to hop D01 de tinh diem xet tuyen NAPA trong pham vi da xac minh.');
  }

  const modeledCombos = NAPA_MODELED_COMBINATIONS_BY_PROGRAM_CODE[context.programCode] ?? [];
  if (context.subjectContext.combinationId === undefined || !modeledCombos.includes(context.subjectContext.combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'napa-combination-not-modeled',
      label: 'Batch nay chi ho tro to hop goc D01 vi diem trung tuyen chinh thuc da quy doi ve D01.',
    });
    return partial('To hop da chon chua duoc ho tro cho NAPA; chi tinh nhanh to hop goc D01.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `napa-thpt-${s}`, label: `Diem thi TN THPT mon ${SUBJECT_LABELS[s]} cho to hop D01.` })));
    return partial('Can du diem Toan, Ngu van va Tieng Anh de tinh diem xet tuyen NAPA D01.');
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
          reasons: ['Nganh Luat/Thanh tra cua NAPA yeu cau Toan va Ngu van trong to hop D01 moi mon toi thieu 6,0.'],
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

  explanation.push({ id: 'napa-exact-raw', label: 'Tong diem 3 mon D01', output: raw30, scale: 30, formula: 'Toan + Ngu van + Tieng Anh', evidence: napaThptExamExactEvidence.evidence });
  explanation.push({ id: 'napa-exact-priority', label: priority.reduced ? 'Diem uu tien da giam' : 'Diem uu tien', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 - tong diem)/7,5] x muc uu tien KV/DT' : 'Muc uu tien KV/DT theo Dieu 7 TT 06/2026', evidence: napaThptExamExactEvidence.evidence });
  explanation.push({ id: 'napa-exact-dxt', label: 'Diem xet tuyen', output: dxt30, scale: 30, formula: 'round2(Toan + Ngu van + Tieng Anh + diem uu tien)', evidence: napaThptExamExactEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'napa-priority-region-category', label: 'Khu vuc / doi tuong uu tien chua nhap; diem dang tinh voi uu tien = 0.' });
  }

  return {
    schoolId: 'napa',
    year: NAPA_EXACT_METHOD.year,
    methodId: NAPA_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: eligible ? 'eligible' : 'ineligible',
      reasons: [
        `Diem trung tuyen NAPA 2026 (${programLabel}, to hop goc D01): ${threshold}/30.`,
        `Diem xet tuyen = ${raw30} + ${priority.effectivePriority30} = ${dxt30}/30 -> ${eligible ? 'dat' : 'chua dat'} nguong.`,
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
