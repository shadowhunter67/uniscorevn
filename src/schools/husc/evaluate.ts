import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUSC_THPT_THRESHOLD } from './eligibility';
import { huscAdmissionMethods } from './methods';

export function evaluateHuscAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'husc',
    schoolShortName: 'HUSC',
    method: huscAdmissionMethods[0],
    profile,
    context,
    threshold: HUSC_THPT_THRESHOLD,
    evidenceSourceId: 'husc-threshold-2026',
  });
}
