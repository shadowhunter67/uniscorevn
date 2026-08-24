import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTT_THPT_THRESHOLD } from './eligibility';
import { uttAdmissionMethods } from './methods';

export function evaluateUttAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'utt',
    schoolShortName: 'UTT',
    method: uttAdmissionMethods[0],
    profile,
    context,
    threshold: UTT_THPT_THRESHOLD,
    evidenceSourceId: 'utt-threshold-2026',
  });
}
