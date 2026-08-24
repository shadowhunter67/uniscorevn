import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UFLSUDN_THPT_THRESHOLD } from './eligibility';
import { uflsudnAdmissionMethods } from './methods';

export function evaluateUflsudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uflsudn',
    schoolShortName: 'UFLS',
    method: uflsudnAdmissionMethods[0],
    profile,
    context,
    threshold: UFLSUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uflsudn-quality-threshold-2026',
  });
}
