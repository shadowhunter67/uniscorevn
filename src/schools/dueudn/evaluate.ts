import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DUEUDN_THPT_THRESHOLD } from './eligibility';
import { dueudnAdmissionMethods } from './methods';

export function evaluateDueudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dueudn',
    schoolShortName: 'DUE',
    method: dueudnAdmissionMethods[0],
    profile,
    context,
    threshold: DUEUDN_THPT_THRESHOLD,
    evidenceSourceId: 'dueudn-quality-threshold-2026',
  });
}
