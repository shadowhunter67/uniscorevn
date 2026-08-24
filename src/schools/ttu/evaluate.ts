import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TTU_THPT_THRESHOLD } from './eligibility';
import { ttuAdmissionMethods } from './methods';

export function evaluateTtuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ttu',
    schoolShortName: 'TTU',
    method: ttuAdmissionMethods[0],
    profile,
    context,
    threshold: TTU_THPT_THRESHOLD,
    evidenceSourceId: 'ttu-floor-score-2026',
  });
}
