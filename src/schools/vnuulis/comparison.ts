import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVnuulisAdmission, type VnuulisEvaluationContext } from './evaluate';
import { vnuulisAdmissionMethods } from './methods';

function isVnuulisMethodId(value: string | undefined): value is VnuulisEvaluationContext['methodId'] {
  return vnuulisAdmissionMethods.some((method) => method.id === value);
}

export const vnuulisComparisonAdapter: SchoolComparisonAdapter<VnuulisEvaluationContext> = {
  schoolId: 'vnuulis',
  methodId: 'vnuulis-thpt-exam-2026',
  methodName: 'THPT exam threshold eligibility (language subject coefficient 2)',
  buildContext(selection) {
    return {
      methodId: isVnuulisMethodId(selection.methodId) ? selection.methodId : 'vnuulis-thpt-exam-2026',
      subjectContext: getSubjectContext(selection.context?.combinationId),
    };
  },
  evaluate(profile: ApplicantProfile, context: VnuulisEvaluationContext): SchoolComparisonResult {
    return { evaluation: evaluateVnuulisAdmission(profile, context) };
  },
};
