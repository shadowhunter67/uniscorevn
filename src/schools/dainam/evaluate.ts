import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DAINAM_THPT_THRESHOLD } from './eligibility';
import { dainamAdmissionMethods } from './methods';

export function evaluateDainamThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dainam',
    schoolShortName: 'DNU',
    method: dainamAdmissionMethods[0],
    profile,
    context,
    threshold: DAINAM_THPT_THRESHOLD,
    evidenceSourceId: 'dainam-admission-portal-2026',
  });
}
