import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThptSubjectContext } from '../thptThresholdOnly';
import { convertVnuulisExamScore, convertVnuulisTranscriptScore } from './conversion';
import { vnuulisAdmissionMethods, type VnuulisMethodId } from './methods';

export type VnuulisProgramTrack = 'regular' | 'international-partnership';

export interface VnuulisEvaluationContext {
  methodId?: VnuulisMethodId;
  programTrack?: VnuulisProgramTrack;
  subjectContext?: ThptSubjectContext;
}

const methodById = Object.fromEntries(vnuulisAdmissionMethods.map((method) => [method.id, method]));
const METHOD_IDS = new Set(vnuulisAdmissionMethods.map((method) => method.id));

const THRESHOLD_LOCATION = 'Official VNU-ULIS 2026 quality-assurance input threshold notice';

function examThresholdFor(track: VnuulisProgramTrack): number {
  return track === 'international-partnership' ? 15 : 19;
}

const TRANSCRIPT_THRESHOLD_INTERNATIONAL_PARTNERSHIP = 18;

function buildResult(params: {
  methodId: VnuulisMethodId;
  status: 'eligible' | 'ineligible' | 'unknown';
  reasons: string[];
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
}): AdmissionEvaluation {
  const method = methodById[params.methodId] ?? vnuulisAdmissionMethods[0];
  const gapRequirements = method.knowledgeGaps?.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })) ?? [];
  return {
    schoolId: 'vnuulis',
    year: 2026,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status: params.status, reasons: params.reasons },
    missingInputs: params.missingInputs ?? [],
    missingRules: method.knowledgeGaps?.map((gap) => gap.label) ?? [],
    missingRequirements: [...(params.missingRequirements ?? []), ...gapRequirements],
    explanation: params.explanation ?? [],
    evidence: [
      {
        sourceId: 'vnuulis-threshold-notice-2026',
        location: THRESHOLD_LOCATION,
        verification: 'verified',
        effectiveYear: 2026,
      },
    ],
  };
}

function evaluateExamMethod(profile: ApplicantProfile, context: VnuulisEvaluationContext): AdmissionEvaluation {
  const track = context.programTrack ?? 'regular';
  if (!context.subjectContext) {
    return buildResult({
      methodId: 'vnuulis-thpt-exam-2026',
      status: 'unknown',
      reasons: ['VNU-ULIS needs a selected subject combination before the THPT threshold can be checked.'],
      missingRequirements: [{ kind: 'school-context', code: 'vnuulis-subject-combination', label: 'Select a VNU-ULIS subject combination.' }],
    });
  }
  if (!context.subjectContext.subjects.includes('english')) {
    return buildResult({
      methodId: 'vnuulis-thpt-exam-2026',
      status: 'unknown',
      reasons: ['Only English-language VNU-ULIS combinations (with English as the coefficient-2 subject) are modeled; other foreign languages are not supported by the shared subject taxonomy.'],
      missingRequirements: [{ kind: 'unsupported', code: 'vnuulis-non-english-language-combination', label: 'Non-English VNU-ULIS language combination is not modeled.' }],
    });
  }

  const converted = convertVnuulisExamScore(profile, context.subjectContext.subjects, 'english');
  if (!('total30' in converted)) {
    return buildResult({
      methodId: 'vnuulis-thpt-exam-2026',
      status: 'unknown',
      reasons: ['VNU-ULIS needs all three THPT subject scores in the selected combination.'],
      missingInputs: ['Missing THPT scores for the selected VNU-ULIS subject combination.'],
      missingRequirements: converted.missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuulis-thpt-${subjectId}`,
        label: `THPT score for ${SUBJECT_LABELS[subjectId]} in the selected VNU-ULIS combination.`,
      })),
    });
  }

  const threshold = examThresholdFor(track);
  const explanation: CalculationStep[] = [
    {
      id: 'vnuulis-exam-conversion',
      label: 'VNU-ULIS 2026 THPT exam-route conversion',
      output: converted.total30,
      scale: 30,
      formula: 'English score counts coefficient 2; total out of 40 is rescaled to /30 (total40 * 0.75).',
      evidence: [{ sourceId: 'vnuulis-admission-notice-2026', location: 'Official 2026 admission announcement, scoring section', verification: 'verified', effectiveYear: 2026 }],
    },
  ];

  if (converted.total30 < threshold) {
    return buildResult({
      methodId: 'vnuulis-thpt-exam-2026',
      status: 'ineligible',
      reasons: [`Converted score ${converted.total30}/30 is below the ${track} threshold ${threshold}/30.`],
      explanation,
    });
  }
  return buildResult({
    methodId: 'vnuulis-thpt-exam-2026',
    status: 'eligible',
    reasons: [
      `Converted score ${converted.total30}/30 meets the ${track} threshold ${threshold}/30.`,
      'This confirms the quality-assurance input threshold only; it is not a final admission-score guarantee (program-level cutoffs may be higher).',
    ],
    explanation,
  });
}

function evaluateTranscriptMethod(profile: ApplicantProfile, context: VnuulisEvaluationContext): AdmissionEvaluation {
  if ((context.programTrack ?? 'regular') !== 'international-partnership') {
    return buildResult({
      methodId: 'vnuulis-transcript-2026',
      status: 'unknown',
      reasons: ['VNU-ULIS transcript-based admission is published for international-partnership programs only; select that track to use this method.'],
      missingRequirements: [{ kind: 'school-context', code: 'vnuulis-program-track', label: 'Select the international-partnership program track for the transcript route.' }],
    });
  }
  if (!context.subjectContext) {
    return buildResult({
      methodId: 'vnuulis-transcript-2026',
      status: 'unknown',
      reasons: ['VNU-ULIS needs a selected subject combination before the transcript threshold can be checked.'],
      missingRequirements: [{ kind: 'school-context', code: 'vnuulis-subject-combination', label: 'Select a VNU-ULIS subject combination.' }],
    });
  }

  const converted = convertVnuulisTranscriptScore(profile, context.subjectContext.subjects);
  if (!('total30' in converted)) {
    return buildResult({
      methodId: 'vnuulis-transcript-2026',
      status: 'unknown',
      reasons: ['VNU-ULIS needs grade 10/11/12 transcript scores for all three combination subjects.'],
      missingInputs: ['Missing transcript averages for the selected VNU-ULIS subject combination.'],
      missingRequirements: converted.missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `vnuulis-transcript-${subjectId}`,
        label: `Grade 10/11/12 transcript score for ${SUBJECT_LABELS[subjectId]}.`,
      })),
    });
  }

  const explanation: CalculationStep[] = [
    {
      id: 'vnuulis-transcript-conversion',
      label: 'VNU-ULIS 2026 transcript-route total (international-partnership programs)',
      output: converted.total30,
      scale: 30,
      formula: 'Sum of the 3-year transcript averages for the three combination subjects, on a /30 scale.',
      evidence: [{ sourceId: 'vnuulis-threshold-notice-2026', location: THRESHOLD_LOCATION, verification: 'verified', effectiveYear: 2026 }],
    },
  ];

  if (converted.total30 < TRANSCRIPT_THRESHOLD_INTERNATIONAL_PARTNERSHIP) {
    return buildResult({
      methodId: 'vnuulis-transcript-2026',
      status: 'ineligible',
      reasons: [`Transcript total ${converted.total30}/30 is below the international-partnership transcript threshold ${TRANSCRIPT_THRESHOLD_INTERNATIONAL_PARTNERSHIP}/30.`],
      explanation,
    });
  }
  return buildResult({
    methodId: 'vnuulis-transcript-2026',
    status: 'eligible',
    reasons: [`Transcript total ${converted.total30}/30 meets the international-partnership transcript threshold ${TRANSCRIPT_THRESHOLD_INTERNATIONAL_PARTNERSHIP}/30.`],
    explanation,
  });
}

export function evaluateVnuulisAdmission(profile: ApplicantProfile, context: VnuulisEvaluationContext = {}): AdmissionEvaluation {
  const methodId = context.methodId ?? 'vnuulis-thpt-exam-2026';
  if (!METHOD_IDS.has(methodId)) {
    return buildResult({
      methodId: 'vnuulis-thpt-exam-2026',
      status: 'unknown',
      reasons: ['Select a supported VNU-ULIS 2026 admission method.'],
      missingRequirements: [{ kind: 'school-context', code: 'vnuulis-method', label: 'Select a supported VNU-ULIS method.' }],
    });
  }

  if (methodId === 'vnuulis-hsa-2026') {
    return buildResult({
      methodId,
      status: 'unknown',
      reasons: ['VNU-ULIS HSA-route eligibility is not executable: the shared applicant profile has no VNU-Hanoi HSA score field.'],
      missingRequirements: [{ kind: 'unsupported', code: 'vnuulis-hsa-route-not-modeled', label: 'VNU-ULIS HSA-route score input is not modeled.' }],
    });
  }

  if (methodId === 'vnuulis-transcript-2026') {
    return evaluateTranscriptMethod(profile, context);
  }

  return evaluateExamMethod(profile, context);
}
