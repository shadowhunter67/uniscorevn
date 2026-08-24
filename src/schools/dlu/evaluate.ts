import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DLU_THPT_THRESHOLD } from './eligibility';
import { dluAdmissionMethods } from './methods';

export function evaluateDluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dlu',
    schoolShortName: 'DLU',
    method: dluAdmissionMethods[0],
    profile,
    context,
    threshold: DLU_THPT_THRESHOLD,
    evidenceSourceId: 'dlu-threshold-press-2026',
  });
}
