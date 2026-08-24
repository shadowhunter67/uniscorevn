import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { VGU_THPT_THRESHOLD } from './eligibility';
import { vguAdmissionMethods } from './methods';

export function evaluateVguThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'vgu',
    schoolShortName: 'VGU',
    method: vguAdmissionMethods[0],
    profile,
    context,
    threshold: VGU_THPT_THRESHOLD,
    evidenceSourceId: 'vgu-floor-score-press-2026',
  });
}
