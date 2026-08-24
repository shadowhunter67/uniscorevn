import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateApdThptExamAdmission } from './evaluate';
import { apdAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThresholdOnlyEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const apdComparisonAdapter: SchoolComparisonAdapter<ThresholdOnlyEvaluationContext> = {
  schoolId: 'apd',
  methodId: apdAdmissionMethods[0].id,
  methodName: apdAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateApdThptExamAdmission(profile, context) };
  },
};
