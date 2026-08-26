import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DHV_THPT_THRESHOLD } from './eligibility';
import { dhvAdmissionMethods } from './methods';

export function evaluateDhvThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dhv',
    schoolShortName: 'DHV',
    method: dhvAdmissionMethods[0],
    profile,
    context,
    threshold: DHV_THPT_THRESHOLD,
    evidenceSourceId: 'dhv-admission-score-2026',
  });
}
