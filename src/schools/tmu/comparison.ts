import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { TmuThptExamEvaluationContext } from './evaluate';
import { evaluateTmuThptExamAdmission } from './evaluate';
import { tmuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TmuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tmuComparisonAdapter: SchoolComparisonAdapter<TmuThptExamEvaluationContext> = {
  schoolId: 'tmu',
  methodId: tmuAdmissionMethods[0].id,
  methodName: tmuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTmuThptExamAdmission(profile, context) };
  },
};
