import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { VnuedThptExamEvaluationContext } from './evaluate';
import { evaluateVnuedThptExamAdmission } from './evaluate';
import { vnuedAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuedThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuedComparisonAdapter: SchoolComparisonAdapter<VnuedThptExamEvaluationContext> = {
  schoolId: 'vnued',
  methodId: vnuedAdmissionMethods[0].id,
  methodName: vnuedAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuedThptExamAdmission(profile, context) };
  },
};
