import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateVkuThptExamAdmission } from './evaluate';
import { vkuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThresholdOnlyEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vkuComparisonAdapter: SchoolComparisonAdapter<ThresholdOnlyEvaluationContext> = {
  schoolId: 'vku',
  methodId: vkuAdmissionMethods[0].id,
  methodName: vkuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVkuThptExamAdmission(profile, context) };
  },
};
