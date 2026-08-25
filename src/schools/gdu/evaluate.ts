import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { GDU_THPT_THRESHOLD } from './eligibility';
import { gduAdmissionMethods } from './methods';

export function evaluateGduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'gdu',
    schoolShortName: 'GDU',
    method: gduAdmissionMethods[0],
    profile,
    context,
    threshold: GDU_THPT_THRESHOLD,
    evidenceSourceId: 'gdu-quality-threshold-2026',
  });
}
