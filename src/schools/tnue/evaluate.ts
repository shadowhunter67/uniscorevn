import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TNUE_THPT_THRESHOLD } from './eligibility';
import { tnueAdmissionMethods } from './methods';

export function evaluateTnueThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tnue',
    schoolShortName: 'TNUE',
    method: tnueAdmissionMethods[0],
    profile,
    context,
    threshold: TNUE_THPT_THRESHOLD,
    evidenceSourceId: 'tnue-threshold-2026',
  });
}
