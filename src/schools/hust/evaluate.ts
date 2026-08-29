import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUST_THPT_THRESHOLD } from './eligibility';
import { hustAdmissionMethods } from './methods';

export function evaluateHustThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hust',
    schoolShortName: 'HUST',
    method: hustAdmissionMethods[0],
    profile,
    context,
    threshold: HUST_THPT_THRESHOLD,
    evidenceSourceId: 'hust-threshold-2026',
  });
}
