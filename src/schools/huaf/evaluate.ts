import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { HUAF_TRANSCRIPT_THPT_COREQUISITE_THRESHOLD } from './eligibility';
import { huafAdmissionMethods } from './methods';

export function evaluateHuafAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'huaf',
    schoolShortName: 'HUAF',
    method: huafAdmissionMethods[0],
    profile,
    context,
    threshold: HUAF_TRANSCRIPT_THPT_COREQUISITE_THRESHOLD,
    evidenceSourceId: 'huaf-official-admission-info-2026',
  });
}
