import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { vnulawAdmissionMethods } from './methods';
import { VNULAW_TOTAL_MIN30, VNULAW_MATH_OR_LITERATURE_MIN10, VNULAW_THPT_THRESHOLD_TEXT } from './eligibility';

export type VnulawThptExamEvaluationContext = ThresholdOnlyEvaluationContext;

const evidenceSourceId = 'vnulaw-admission-notice-2026';

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

export function evaluateVnulawThptExamAdmission(profile: ApplicantProfile, context: VnulawThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vnulawAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({
    kind: 'official-rule' as const,
    code: gap.id,
    label: gap.label,
  }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'vnulaw-subject-combination',
      label: 'Chon to hop mon xet tuyen VNU-Luat (A01/A07/C01/C02/C03/C04/D01/D03/D14/D15).',
    });
    reasons.push('Can chon to hop mon xet tuyen truoc khi kiem tra nguong dau vao VNU-Luat.');
  } else {
    const { subjects } = context.subjectContext;
    const { total30, missingSubjects } = sumThptTotal(profile, subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chua du diem 3 mon thi TN THPT trong to hop da chon cho VNU-Luat.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vnulaw-thpt-${subjectId}`,
          label: `Diem thi TN THPT mon ${SUBJECT_LABELS[subjectId]} cho to hop VNU-Luat.`,
        }))
      );
      reasons.push('Can du diem 3 mon trong to hop de kiem tra nguong VNU-Luat.');
    }

    if (total30 !== undefined) {
      explanation.push({
        id: 'vnulaw-thpt-total-threshold',
        label: 'Nguong dau vao VNU-Luat 2026 (thi TN THPT) - tong 3 mon',
        output: total30,
        scale: 30,
        formula: VNULAW_THPT_THRESHOLD_TEXT,
        evidence: [{ sourceId: evidenceSourceId, location: 'Thong tin tuyen sinh 2026 - VNU-UL', verification: 'verified', effectiveYear: 2026 }],
      });

      const pivotSubjects = subjects.filter((subjectId): subjectId is 'math' | 'literature' => subjectId === 'math' || subjectId === 'literature');
      const pivotScores = pivotSubjects.map((subjectId) => ({ subjectId, score: profile.thpt?.scores?.[subjectId] }));
      const belowPivotFloor = pivotScores.filter(
        (entry): entry is { subjectId: 'math' | 'literature'; score: number } => entry.score !== undefined && entry.score < VNULAW_MATH_OR_LITERATURE_MIN10
      );

      if (pivotScores.length > 0 && pivotScores.every((entry) => entry.score !== undefined)) {
        explanation.push({
          id: 'vnulaw-math-or-literature-floor',
          label: 'Dieu kien diem Toan/Ngu van toi thieu 06/10',
          formula: VNULAW_THPT_THRESHOLD_TEXT,
          evidence: [{ sourceId: evidenceSourceId, location: 'Thong tin tuyen sinh 2026 - VNU-UL', verification: 'verified', effectiveYear: 2026 }],
        });
      }

      if (total30 < VNULAW_TOTAL_MIN30) {
        status = 'ineligible';
        reasons.push(`Tong ${total30}/30 thap hon nguong toi thieu VNU-Luat cong bo (${VNULAW_TOTAL_MIN30}/30, tuong duong 60% diem danh gia toi da).`);
      } else if (pivotScores.length > 0 && belowPivotFloor.length > 0) {
        status = 'ineligible';
        reasons.push(
          `Diem mon ${belowPivotFloor.map((entry) => `${SUBJECT_LABELS[entry.subjectId]} (${entry.score})`).join(', ')} thap hon nguong toi thieu ${VNULAW_MATH_OR_LITERATURE_MIN10}/10 ma VNU-Luat yeu cau cho mon Toan/Ngu van trong to hop xet tuyen.`
        );
      } else {
        status = 'eligible';
        reasons.push(`Tong ${total30}/30 dat nguong toi thieu (${VNULAW_TOTAL_MIN30}/30) va diem Toan/Ngu van trong to hop dat toi thieu ${VNULAW_MATH_OR_LITERATURE_MIN10}/10.`);
      }
    }
  }

  return {
    schoolId: 'vnulaw',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thong tin tuyen sinh 2026 - VNU-UL', verification: 'verified', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}
