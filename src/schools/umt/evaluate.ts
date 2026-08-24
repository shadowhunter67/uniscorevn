import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UMT_THPT_THRESHOLD } from './eligibility';
import { umtAdmissionMethods } from './methods';

export function evaluateUmtAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'umt',
    schoolShortName: 'UMT',
    method: umtAdmissionMethods[0],
    profile,
    context,
    threshold: UMT_THPT_THRESHOLD,
    evidenceSourceId: 'umt-threshold-2026',
  });
}
