import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { NCTU_THPT_THRESHOLD } from './eligibility';
import { nctuAdmissionMethods } from './methods';

export function evaluateNctuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'nctu',
    schoolShortName: 'NCTU',
    method: nctuAdmissionMethods[0],
    profile,
    context,
    threshold: NCTU_THPT_THRESHOLD,
    evidenceSourceId: 'nctu-threshold-notice-2026',
  });
}
