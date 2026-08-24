import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TNUFL_THPT_THRESHOLD } from './eligibility';
import { tnuflAdmissionMethods } from './methods';

export function evaluateTnuflThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tnufl',
    schoolShortName: 'TNUFL',
    method: tnuflAdmissionMethods[0],
    profile,
    context,
    threshold: TNUFL_THPT_THRESHOLD,
    evidenceSourceId: 'tnufl-cutoff-2026',
  });
}
