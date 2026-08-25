import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VAA_THPT_THRESHOLD } from './eligibility';
import { vaaAdmissionMethods } from './methods';

export function evaluateVaaThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vaa',
    schoolShortName: 'VAA',
    method: vaaAdmissionMethods[0],
    profile,
    context,
    threshold: VAA_THPT_THRESHOLD,
    evidenceSourceId: 'vaa-hocba-notice-2026',
  });
}
