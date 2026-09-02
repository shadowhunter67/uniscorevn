import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { VnuebThptExamEvaluationContext } from './evaluate';
import { evaluateVnuebThptExamAdmission } from './evaluate';
import { vnuebAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuebThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuebComparisonAdapter: SchoolComparisonAdapter<VnuebThptExamEvaluationContext> = {
  schoolId: 'vnueb',
  methodId: vnuebAdmissionMethods[0].id,
  methodName: vnuebAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuebThptExamAdmission(profile, context) };
  },
};
