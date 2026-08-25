import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TUAF_THPT_THRESHOLD } from './eligibility';
import { tuafAdmissionMethods } from './methods';

export function evaluateTuafThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tuaf',
    schoolShortName: 'TUAF',
    method: tuafAdmissionMethods[0],
    profile,
    context,
    threshold: TUAF_THPT_THRESHOLD,
    evidenceSourceId: 'tuaf-admission-info-2026',
  });
}
