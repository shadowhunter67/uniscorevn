import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { FPFU_THPT_THRESHOLD } from './eligibility';
import { fpfuAdmissionMethods } from './methods';

export function evaluateFpfuThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'fpfu',
    schoolShortName: 'FPFU',
    method: fpfuAdmissionMethods[0],
    profile,
    context,
    threshold: FPFU_THPT_THRESHOLD,
    evidenceSourceId: 'fpfu-quality-threshold-2026',
  });
}
