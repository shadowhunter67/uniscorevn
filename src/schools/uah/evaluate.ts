import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UAH_THPT_THRESHOLD } from './eligibility';
import { uahAdmissionMethods } from './methods';

export function evaluateUahThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uah',
    schoolShortName: 'UAH',
    method: uahAdmissionMethods[0],
    profile,
    context,
    threshold: UAH_THPT_THRESHOLD,
    evidenceSourceId: 'uah-floor-score-press-2026',
  });
}
