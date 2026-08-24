import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUEEDU_THPT_THRESHOLD } from './eligibility';
import { hueeduAdmissionMethods } from './methods';

export function evaluateHueeduAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hueedu',
    schoolShortName: 'HUED',
    method: hueeduAdmissionMethods[0],
    profile,
    context,
    threshold: HUEEDU_THPT_THRESHOLD,
    evidenceSourceId: 'hueedu-hueu-threshold-appendix-2026',
  });
}
