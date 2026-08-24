import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TGU_THPT_THRESHOLD } from './eligibility';
import { tguAdmissionMethods } from './methods';

export function evaluateTguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tgu',
    schoolShortName: 'TGU',
    method: tguAdmissionMethods[0],
    profile,
    context,
    threshold: TGU_THPT_THRESHOLD,
    evidenceSourceId: 'tgu-admission-info-2026',
  });
}
