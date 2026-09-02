import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { VnuuetThptExamEvaluationContext } from './evaluate';
import { evaluateVnuuetThptExamAdmission } from './evaluate';
import { vnuuetAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuuetThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuuetComparisonAdapter: SchoolComparisonAdapter<VnuuetThptExamEvaluationContext> = {
  schoolId: 'vnuuet',
  methodId: vnuuetAdmissionMethods[0].id,
  methodName: vnuuetAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuuetThptExamAdmission(profile, context) };
  },
};
