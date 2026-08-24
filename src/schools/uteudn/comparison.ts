import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateUteudnThptExamAdmission } from './evaluate';
import { uteudnAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThresholdOnlyEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const uteudnComparisonAdapter: SchoolComparisonAdapter<ThresholdOnlyEvaluationContext> = {
  schoolId: 'uteudn',
  methodId: uteudnAdmissionMethods[0].id,
  methodName: uteudnAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUteudnThptExamAdmission(profile, context) };
  },
};
