import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TBDU_THPT_THRESHOLD } from './eligibility';
import { tbduAdmissionMethods } from './methods';

export function evaluateTbduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tbdu',
    schoolShortName: 'TBDU',
    method: tbduAdmissionMethods[0],
    profile,
    context,
    threshold: TBDU_THPT_THRESHOLD,
    evidenceSourceId: 'tbdu-admission-info-2026',
  });
}
