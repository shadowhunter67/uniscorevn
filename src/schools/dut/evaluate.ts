import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { DUT_THPT_THRESHOLD } from './eligibility';
import { dutAdmissionMethods } from './methods';

export function evaluateDutThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'dut',
    schoolShortName: 'DUT',
    method: dutAdmissionMethods[0],
    profile,
    context,
    threshold: DUT_THPT_THRESHOLD,
    evidenceSourceId: 'dut-quality-threshold-2026',
  });
}
