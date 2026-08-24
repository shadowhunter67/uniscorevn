import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUL_THPT_THRESHOLD } from './eligibility';
import { hulAdmissionMethods } from './methods';

export function evaluateHulAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hul',
    schoolShortName: 'HUL',
    method: hulAdmissionMethods[0],
    profile,
    context,
    threshold: HUL_THPT_THRESHOLD,
    evidenceSourceId: 'hul-threshold-2026',
  });
}
