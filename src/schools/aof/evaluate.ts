import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { AOF_THPT_THRESHOLD } from './eligibility';
import { aofAdmissionMethods } from './methods';

export function evaluateAofThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'aof',
    schoolShortName: 'AOF',
    method: aofAdmissionMethods[0],
    profile,
    context,
    threshold: AOF_THPT_THRESHOLD,
    evidenceSourceId: 'aof-threshold-2026',
  });
}
