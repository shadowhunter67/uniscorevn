import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTEUDN_THPT_THRESHOLD } from './eligibility';
import { uteudnAdmissionMethods } from './methods';

export function evaluateUteudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uteudn',
    schoolShortName: 'UTE',
    method: uteudnAdmissionMethods[0],
    profile,
    context,
    threshold: UTEUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uteudn-quality-threshold-2026',
  });
}
