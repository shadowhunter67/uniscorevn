import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { BDU_THPT_THRESHOLD } from './eligibility';
import { bduAdmissionMethods } from './methods';

export function evaluateBduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'bdu',
    schoolShortName: 'BDU',
    method: bduAdmissionMethods[0],
    profile,
    context,
    threshold: BDU_THPT_THRESHOLD,
    evidenceSourceId: 'bdu-admission-2026',
  });
}
