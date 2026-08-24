import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVmuThptExamAdmission, type VmuThptExamEvaluationContext } from './evaluate';
import { vmuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VmuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vmuComparisonAdapter: SchoolComparisonAdapter<VmuThptExamEvaluationContext> = {
  schoolId: 'vmu',
  methodId: vmuAdmissionMethods[0].id,
  methodName: vmuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVmuThptExamAdmission(profile, context) };
  },
};
