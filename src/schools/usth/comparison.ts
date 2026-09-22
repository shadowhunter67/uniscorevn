import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateUsthThptExamAdmission } from './evaluate';
import { usthAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThresholdOnlyEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const usthComparisonAdapter: SchoolComparisonAdapter<ThresholdOnlyEvaluationContext> = {
  schoolId: 'usth',
  methodId: usthAdmissionMethods[0].id,
  methodName: usthAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUsthThptExamAdmission(profile, context) };
  },
};
