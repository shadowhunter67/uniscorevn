import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { VnusshThptExamEvaluationContext } from './evaluate';
import { evaluateVnusshThptExamAdmission } from './evaluate';
import { vnusshAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnusshThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnusshComparisonAdapter: SchoolComparisonAdapter<VnusshThptExamEvaluationContext> = {
  schoolId: 'vnussh',
  methodId: vnusshAdmissionMethods[0].id,
  methodName: vnusshAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnusshThptExamAdmission(profile, context) };
  },
};
