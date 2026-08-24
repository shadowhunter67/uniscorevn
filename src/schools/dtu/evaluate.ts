import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DTU_THPT_THRESHOLD } from './eligibility';
import { dtuAdmissionMethods } from './methods';

export function evaluateDtuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dtu',
    schoolShortName: 'DTU',
    method: dtuAdmissionMethods[0],
    profile,
    context,
    threshold: DTU_THPT_THRESHOLD,
    evidenceSourceId: 'dtu-admission-info-2026',
  });
}
