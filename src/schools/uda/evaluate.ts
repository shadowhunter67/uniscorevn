import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UDA_THPT_THRESHOLD } from './eligibility';
import { udaAdmissionMethods } from './methods';

export function evaluateUdaAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uda',
    schoolShortName: 'UDA',
    method: udaAdmissionMethods[0],
    profile,
    context,
    threshold: UDA_THPT_THRESHOLD,
    evidenceSourceId: 'uda-threshold-2026',
  });
}
