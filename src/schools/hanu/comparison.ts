import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHanuThptExamAdmission, type HanuThptExamEvaluationContext } from './evaluate';
import { hanuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HanuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hanuComparisonAdapter: SchoolComparisonAdapter<HanuThptExamEvaluationContext> = {
  schoolId: 'hanu',
  methodId: hanuAdmissionMethods[0].id,
  methodName: hanuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHanuThptExamAdmission(profile, context) };
  },
};
