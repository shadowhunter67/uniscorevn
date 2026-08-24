import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { NTUHN_THPT_THRESHOLD } from './eligibility';
import { ntuhnAdmissionMethods } from './methods';

export function evaluateNtuhnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'ntuhn',
    schoolShortName: 'NTU-HN',
    method: ntuhnAdmissionMethods[0],
    profile,
    context,
    threshold: NTUHN_THPT_THRESHOLD,
    evidenceSourceId: 'ntuhn-admission-score-2026',
  });
}
