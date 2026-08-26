import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { NLU_THPT_THRESHOLD } from './eligibility';
import { nluAdmissionMethods } from './methods';

export function evaluateNluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'nlu',
    schoolShortName: 'NLU',
    method: nluAdmissionMethods[0],
    profile,
    context,
    threshold: NLU_THPT_THRESHOLD,
    evidenceSourceId: 'nlu-floor-score-2026',
  });
}
