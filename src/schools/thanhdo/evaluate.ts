import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { THANHDO_THPT_THRESHOLD } from './eligibility';
import { thanhdoAdmissionMethods } from './methods';

export function evaluateThanhdoThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'thanhdo',
    schoolShortName: 'ThanhDo',
    method: thanhdoAdmissionMethods[0],
    profile,
    context,
    threshold: THANHDO_THPT_THRESHOLD,
    evidenceSourceId: 'thanhdo-cutoff-2026',
  });
}
