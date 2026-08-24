import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HLU_THPT_THRESHOLD } from './eligibility';
import { hluAdmissionMethods } from './methods';

export function evaluateHluThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'hlu',
    schoolShortName: 'HLU',
    method: hluAdmissionMethods[0],
    profile,
    context,
    threshold: HLU_THPT_THRESHOLD,
    evidenceSourceId: 'hlu-quality-threshold-2026',
  });
}
