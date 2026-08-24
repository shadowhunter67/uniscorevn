import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TNU_THPT_THRESHOLD } from './eligibility';
import { tnuAdmissionMethods } from './methods';

export function evaluateTnuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tnu',
    schoolShortName: 'TNU',
    method: tnuAdmissionMethods[0],
    profile,
    context,
    threshold: TNU_THPT_THRESHOLD,
    evidenceSourceId: 'tnu-threshold-notice-2026',
  });
}
