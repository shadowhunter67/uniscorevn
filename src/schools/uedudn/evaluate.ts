import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UEDUDN_THPT_THRESHOLD } from './eligibility';
import { uedudnAdmissionMethods } from './methods';

export function evaluateUedudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uedudn',
    schoolShortName: 'UED',
    method: uedudnAdmissionMethods[0],
    profile,
    context,
    threshold: UEDUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uedudn-quality-threshold-2026',
  });
}
