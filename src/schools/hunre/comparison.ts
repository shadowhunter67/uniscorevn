import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HunreThptExamEvaluationContext } from './evaluate';
import { evaluateHunreThptExamAdmission } from './evaluate';
import { hunreAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HunreThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hunreComparisonAdapter: SchoolComparisonAdapter<HunreThptExamEvaluationContext> = {
  schoolId: 'hunre',
  methodId: hunreAdmissionMethods[0].id,
  methodName: hunreAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHunreThptExamAdmission(profile, context) };
  },
};
