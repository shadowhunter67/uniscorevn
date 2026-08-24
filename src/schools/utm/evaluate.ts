import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTM_THPT_THRESHOLD } from './eligibility';
import { utmAdmissionMethods } from './methods';

export function evaluateUtmAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'utm',
    schoolShortName: 'UTM',
    method: utmAdmissionMethods[0],
    profile,
    context,
    threshold: UTM_THPT_THRESHOLD,
    evidenceSourceId: 'utm-threshold-2026',
  });
}
