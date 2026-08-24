import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VKU_THPT_THRESHOLD } from './eligibility';
import { vkuAdmissionMethods } from './methods';

export function evaluateVkuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vku',
    schoolShortName: 'VKU',
    method: vkuAdmissionMethods[0],
    profile,
    context,
    threshold: VKU_THPT_THRESHOLD,
    evidenceSourceId: 'vku-quality-threshold-2026',
  });
}
