import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import type { ThptSubjectContext } from '../thptThresholdOnly';
import { huceAdmissionMethods } from './methods';
import { getHuceProgramThreshold, type HuceMethodId } from './thresholds';
import { calculateHuceEffectivePriority30, lookupHuceStandardPriority30 } from './priority';
import { huceThptExamExactThresholdEvidence } from './evidence';

export interface HuceEvaluationContext {
  methodId?: HuceMethodId;
  programId?: string;
  subjectContext?: ThptSubjectContext;
  externalScore?: number;
}

const methodById = Object.fromEntries(huceAdmissionMethods.map((method) => [method.id, method]));

function sumThpt(profile: ApplicantProfile, subjects: readonly SubjectId[]) {
  let total = 0;
  const missing: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  return missing.length > 0 ? { missing } : { total: Math.round(total * 100) / 100, missing };
}

function averageTranscriptSubject(profile: ApplicantProfile, subjectId: SubjectId): number | undefined {
  const scores = [
    profile.transcript?.grade10?.[subjectId],
    profile.transcript?.grade11?.[subjectId],
    profile.transcript?.grade12?.[subjectId],
  ];
  if (scores.some((score) => score === undefined)) return undefined;
  return (scores[0]! + scores[1]! + scores[2]!) / 3;
}

function sumTranscript(profile: ApplicantProfile, subjects: readonly SubjectId[]) {
  let total = 0;
  const missing: SubjectId[] = [];
  for (const subjectId of subjects) {
    const average = averageTranscriptSubject(profile, subjectId);
    if (average === undefined) missing.push(subjectId);
    else total += average;
  }
  return missing.length > 0 ? { missing } : { total: Math.round(total * 100) / 100, missing };
}

function result(params: {
  methodId: HuceMethodId;
  status: 'eligible' | 'ineligible' | 'unknown';
  reasons: string[];
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
}): AdmissionEvaluation {
  const method = methodById[params.methodId] ?? huceAdmissionMethods[0];
  const gapRequirements =
    method.knowledgeGaps?.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })) ?? [];
  return {
    schoolId: 'huce',
    year: 2026,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status: params.status, reasons: params.reasons },
    missingInputs: params.missingInputs ?? [],
    missingRules: method.knowledgeGaps?.map((gap) => gap.label) ?? [],
    missingRequirements: [...(params.missingRequirements ?? []), ...gapRequirements],
    explanation: params.explanation ?? [],
    evidence: [{ sourceId: 'huce-threshold-conversion-2026', location: 'PDF 227/TB-HDTSDH, program threshold table', verification: 'verified', effectiveYear: 2026 }],
  };
}

function thresholdFor(methodId: HuceMethodId, program: NonNullable<ReturnType<typeof getHuceProgramThreshold>>) {
  switch (methodId) {
    case 'huce-thpt-exam-2026':
      return { value: program.thptMin30, scale: 30, label: 'TN THPT' };
    case 'huce-transcript-2026':
      return { value: program.transcriptMin30, scale: 30, label: 'Hoc ba' };
    case 'huce-tsa-2026':
      return { value: program.tsaMin100, scale: 100, label: 'TSA' };
    case 'huce-spt-2026':
      return { value: program.sptMin30, scale: 30, label: 'SPT' };
    case 'huce-vsat-2026':
      return { value: program.vsatMin450, scale: 450, label: 'V-SAT' };
  }
}

function scoreFor(profile: ApplicantProfile, context: HuceEvaluationContext, methodId: HuceMethodId) {
  if (methodId === 'huce-thpt-exam-2026' || methodId === 'huce-transcript-2026') {
    if (!context.subjectContext) {
      return {
        missingRequirements: [{ kind: 'school-context' as const, code: 'huce-subject-combination', label: 'Select a HUCE subject combination.' }],
        reasons: ['HUCE needs a selected subject combination before this threshold can be checked.'],
      };
    }
    const score = methodId === 'huce-thpt-exam-2026' ? sumThpt(profile, context.subjectContext.subjects) : sumTranscript(profile, context.subjectContext.subjects);
    if (score.missing.length > 0) {
      const inputKind = methodId === 'huce-thpt-exam-2026' ? 'THPT' : 'transcript grade 10/11/12';
      return {
        missingInputs: [`Missing ${inputKind} scores for the selected HUCE subject combination.`],
        missingRequirements: score.missing.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `huce-${methodId}-${subjectId}`,
          label: `${inputKind} score for ${SUBJECT_LABELS[subjectId]}.`,
        })),
        reasons: ['HUCE needs all three subject scores before this threshold can be checked.'],
      };
    }
    return { total: score.total };
  }

  if (context.externalScore === undefined) {
    return {
      missingInputs: ['Missing external exam score for the selected HUCE method.'],
      missingRequirements: [{ kind: 'profile-input' as const, code: `huce-${methodId}-external-score`, label: 'External exam score for HUCE threshold checking.' }],
      reasons: ['HUCE needs the selected external exam score before this threshold can be checked.'],
    };
  }
  return { total: context.externalScore };
}

const HUCE_EXACT_METHOD = huceAdmissionMethods[5];

export interface HuceThptExamExactEvaluationContext {
  programId: string;
  subjectContext?: ThptSubjectContext;
}

/** HUCE 2026 — THPT-exam method, exact branch across all 51 programs. Eligible iff the raw
 * 3-subject total meets the program's published threshold (`thresholds.ts`). The reference score
 * (raw + priority, judgment call) is informational only, since the notice doesn't state whether
 * priority is included in the floor. */
export function evaluateHuceThptExamExactAdmission(profile: ApplicantProfile, context: HuceThptExamExactEvaluationContext): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'huce',
    year: HUCE_EXACT_METHOD.year,
    methodId: HUCE_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getHuceProgramThreshold(context.programId);
  if (!program || program.thptMin30 === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'huce-program-out-of-scope', label: 'Select a HUCE program/campus with a published THPT-exam threshold.' });
    return partial('Selected HUCE program is not in the exact-branch scope (no published THPT-exam threshold).');
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'huce-subject-combination', label: 'Select a HUCE subject combination.' });
    return partial('Select a subject combination before computing the HUCE admission score.');
  }
  const subjects = context.subjectContext.subjects;

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `huce-thpt-exact-${s}`, label: `THPT-exam score for ${SUBJECT_LABELS[s]}.` })));
    return partial('All three THPT-exam subject scores are needed to compute the HUCE admission score.', ['Missing THPT scores for the selected subject combination.']);
  }

  const raw30 = round2(total);
  const threshold = program.thptMin30;
  const eligible = raw30 >= threshold;

  const standardPriority30 = lookupHuceStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateHuceEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const referenceScore30 = round2(raw30 + priority.effectivePriority30);

  const reasons = [
    `HUCE 2026 THPT-exam threshold for ${program.programCode} (${program.name}): raw total ≥ ${threshold}/30.`,
    `Raw total = ${raw30}/30 → ${eligible ? 'meets' : 'does not meet'} the threshold. Reference score (raw + priority) = ${referenceScore30}/30.`,
  ];

  explanation.push({ id: 'huce-exact-raw', label: 'Raw 3-subject THPT total', output: raw30, scale: 30, formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '), evidence: huceThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'huce-exact-priority', label: priority.reduced ? 'Priority points (reduced, reference only)' : 'Priority points (reference only)', output: priority.effectivePriority30, scale: 30, formula: priority.reduced ? '[(30 − raw total)/7.5] × standard priority (Dieu 7 TT 06/2026)' : 'Standard priority (Dieu 7 TT 06/2026)', evidence: huceThptExamExactThresholdEvidence.evidence });
  explanation.push({ id: 'huce-exact-reference', label: 'Reference score (not used for the threshold check)', output: referenceScore30, scale: 30, formula: 'round2(raw total + priority)', evidence: huceThptExamExactThresholdEvidence.evidence });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'huce-priority-region-category', label: 'Priority region/category (not supplied — reference score currently uses priority = 0).' });
  }

  return {
    schoolId: 'huce',
    year: HUCE_EXACT_METHOD.year,
    methodId: HUCE_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: referenceScore30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...huceThptExamExactThresholdEvidence.evidence],
  };
}

export function evaluateHuceAdmission(profile: ApplicantProfile, context: HuceEvaluationContext = {}): AdmissionEvaluation {
  const methodId = context.methodId ?? 'huce-thpt-exam-2026';
  if (!methodById[methodId]) {
    return result({
      methodId: 'huce-thpt-exam-2026',
      status: 'unknown',
      reasons: ['Select a supported HUCE 2026 admission method.'],
      missingRequirements: [{ kind: 'school-context', code: 'huce-method', label: 'Select a supported HUCE method.' }],
    });
  }

  const program = getHuceProgramThreshold(context.programId);
  if (!program) {
    return result({
      methodId,
      status: 'unknown',
      reasons: ['Select a HUCE program/campus to apply the published program threshold.'],
      missingRequirements: [{ kind: 'school-context', code: 'huce-program', label: 'Select a HUCE program/campus.' }],
    });
  }

  const threshold = thresholdFor(methodId, program);
  if (threshold.value === undefined) {
    return result({
      methodId,
      status: 'unknown',
      reasons: [`HUCE does not admit ${program.programId} by ${threshold.label} in the published threshold table.`],
      missingRequirements: [{ kind: 'unsupported', code: 'huce-method-not-open-for-program', label: `${threshold.label} is not open for this HUCE program.` }],
    });
  }

  const score = scoreFor(profile, context, methodId);
  if (score.total === undefined) {
    return result({
      methodId,
      status: 'unknown',
      reasons: score.reasons ?? [],
      missingInputs: score.missingInputs,
      missingRequirements: score.missingRequirements,
    });
  }

  const explanation: CalculationStep[] = [
    {
      id: 'huce-threshold-check',
      label: `HUCE 2026 ${threshold.label} threshold for ${program.programCode}`,
      output: score.total,
      scale: threshold.scale,
      formula: `Compare available ${threshold.label} score with the published minimum threshold for ${program.programCode}.`,
      evidence: [{ sourceId: 'huce-threshold-conversion-2026', location: `PDF page ${program.page}, ${program.programCode} row`, verification: 'verified', effectiveYear: 2026 }],
    },
  ];

  if (score.total < threshold.value) {
    return result({
      methodId,
      status: 'ineligible',
      reasons: [`Score ${score.total}/${threshold.scale} is below HUCE ${program.programCode}'s ${threshold.label} threshold of ${threshold.value}/${threshold.scale}.`],
      explanation,
    });
  }

  return result({
    methodId,
    status: 'eligible',
    reasons: [
      `Score ${score.total}/${threshold.scale} meets HUCE ${program.programCode}'s ${threshold.label} threshold of ${threshold.value}/${threshold.scale}.`,
      'This is a threshold eligibility result only; UniScoreVN has not fully modeled HUCE bonus, priority, and subject-combination scope.',
    ],
    explanation,
  });
}
