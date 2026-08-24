import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TTN_THPT_THRESHOLD } from './eligibility';
import { ttnAdmissionMethods } from './methods';

export function evaluateTtnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ttn',
    schoolShortName: 'TTN',
    method: ttnAdmissionMethods[0],
    profile,
    context,
    threshold: TTN_THPT_THRESHOLD,
    evidenceSourceId: 'ttn-threshold-notice-2026',
  });
}
