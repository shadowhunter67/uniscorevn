import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UHD_THPT_THRESHOLD } from './eligibility';
import { uhdAdmissionMethods } from './methods';

export function evaluateUhdAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uhd',
    schoolShortName: 'UHD',
    method: uhdAdmissionMethods[0],
    profile,
    context,
    threshold: UHD_THPT_THRESHOLD,
    evidenceSourceId: 'uhd-threshold-2026-crosscheck-1',
  });
}
