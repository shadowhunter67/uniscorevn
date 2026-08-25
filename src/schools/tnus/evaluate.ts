import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TNUS_THPT_THRESHOLD } from './eligibility';
import { tnusAdmissionMethods } from './methods';

export function evaluateTnusThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tnus',
    schoolShortName: 'TNUS',
    method: tnusAdmissionMethods[0],
    profile,
    context,
    threshold: TNUS_THPT_THRESHOLD,
    evidenceSourceId: 'tnus-cutoff-2026',
  });
}
