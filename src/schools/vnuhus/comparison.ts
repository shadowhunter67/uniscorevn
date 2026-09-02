import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { VnuhusThptExamEvaluationContext } from './evaluate';
import { evaluateVnuhusThptExamAdmission } from './evaluate';
import { vnuhusAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuhusThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuhusComparisonAdapter: SchoolComparisonAdapter<VnuhusThptExamEvaluationContext> = {
  schoolId: 'vnuhus',
  methodId: vnuhusAdmissionMethods[0].id,
  methodName: vnuhusAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuhusThptExamAdmission(profile, context) };
  },
};
