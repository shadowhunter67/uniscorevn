import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VNUUMP_THPT_THRESHOLD } from './eligibility';
import { vnuumpAdmissionMethods } from './methods';

export function evaluateVnuumpThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vnuump',
    schoolShortName: 'VNU-UMP',
    method: vnuumpAdmissionMethods[0],
    profile,
    context,
    threshold: VNUUMP_THPT_THRESHOLD,
    evidenceSourceId: 'vnuump-admission-notice-2026',
  });
}
