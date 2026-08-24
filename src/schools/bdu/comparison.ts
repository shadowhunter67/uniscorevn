import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateBduThptExamAdmission } from './evaluate';
import { bduAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThresholdOnlyEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const bduComparisonAdapter: SchoolComparisonAdapter<ThresholdOnlyEvaluationContext> = {
  schoolId: 'bdu',
  methodId: bduAdmissionMethods[0].id,
  methodName: bduAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateBduThptExamAdmission(profile, context) };
  },
};
