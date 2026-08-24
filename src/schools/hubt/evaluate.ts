import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUBT_THPT_THRESHOLD } from './eligibility';
import { hubtAdmissionMethods } from './methods';

export function evaluateHubtThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hubt',
    schoolShortName: 'HUBT',
    method: hubtAdmissionMethods[0],
    profile,
    context,
    threshold: HUBT_THPT_THRESHOLD,
    evidenceSourceId: 'hubt-admission-portal-2026',
  });
}
