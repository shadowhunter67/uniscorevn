import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HCE_THPT_THRESHOLD } from './eligibility';
import { hceAdmissionMethods } from './methods';

export function evaluateHceAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hce',
    schoolShortName: 'HCE',
    method: hceAdmissionMethods[0],
    profile,
    context,
    threshold: HCE_THPT_THRESHOLD,
    evidenceSourceId: 'hce-threshold-2026',
  });
}
