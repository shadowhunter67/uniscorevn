import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { TDU_THPT_THRESHOLD } from './eligibility';
import { tduAdmissionMethods } from './methods';

export function evaluateTduThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'tdu',
    schoolShortName: 'TDU',
    method: tduAdmissionMethods[0],
    profile,
    context,
    threshold: TDU_THPT_THRESHOLD,
    evidenceSourceId: 'tdu-admission-info-2026',
  });
}
