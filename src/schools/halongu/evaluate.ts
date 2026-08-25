import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HALONGU_THPT_THRESHOLD } from './eligibility';
import { halonguAdmissionMethods } from './methods';

export function evaluateHalonguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'halongu',
    schoolShortName: 'HALONGU',
    method: halonguAdmissionMethods[0],
    profile,
    context,
    threshold: HALONGU_THPT_THRESHOLD,
    evidenceSourceId: 'halongu-quality-threshold-2026',
  });
}
