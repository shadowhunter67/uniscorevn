import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FPTU_THPT_THRESHOLD } from './eligibility';
import { fptuAdmissionMethods } from './methods';

export function evaluateFptuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fptu',
    schoolShortName: 'FPTU',
    method: fptuAdmissionMethods[0],
    profile,
    context,
    threshold: FPTU_THPT_THRESHOLD,
    evidenceSourceId: 'fptu-quality-threshold-2026',
  });
}
