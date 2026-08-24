import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { APD_THPT_THRESHOLD } from './eligibility';
import { apdAdmissionMethods } from './methods';

export function evaluateApdThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'apd',
    schoolShortName: 'APD',
    method: apdAdmissionMethods[0],
    profile,
    context,
    threshold: APD_THPT_THRESHOLD,
    evidenceSourceId: 'apd-admission-2026',
  });
}
