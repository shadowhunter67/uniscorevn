import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VNUF_THPT_THRESHOLD } from './eligibility';
import { vnufAdmissionMethods } from './methods';

export function evaluateVnufThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vnuf',
    schoolShortName: 'VNUF',
    method: vnufAdmissionMethods[0],
    profile,
    context,
    threshold: VNUF_THPT_THRESHOLD,
    evidenceSourceId: 'vnuf-admission-scheme-2026',
  });
}
