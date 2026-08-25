import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FBU_THPT_THRESHOLD } from './eligibility';
import { fbuAdmissionMethods } from './methods';

export function evaluateFbuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fbu',
    schoolShortName: 'FBU',
    method: fbuAdmissionMethods[0],
    profile,
    context,
    threshold: FBU_THPT_THRESHOLD,
    evidenceSourceId: 'fbu-quality-threshold-2026',
  });
}
