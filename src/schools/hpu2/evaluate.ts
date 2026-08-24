import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HPU2_THPT_THRESHOLD } from './eligibility';
import { hpu2AdmissionMethods } from './methods';

export function evaluateHpu2ThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hpu2',
    schoolShortName: 'HPU2',
    method: hpu2AdmissionMethods[0],
    profile,
    context,
    threshold: HPU2_THPT_THRESHOLD,
    evidenceSourceId: 'hpu2-admission-info-2026',
  });
}
