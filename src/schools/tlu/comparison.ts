import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { TluThptExamEvaluationContext } from './evaluate';
import { evaluateTluThptExamAdmission } from './evaluate';
import { tluAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TluThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tluComparisonAdapter: SchoolComparisonAdapter<TluThptExamEvaluationContext> = {
  schoolId: 'tlu',
  methodId: tluAdmissionMethods[0].id,
  methodName: tluAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTluThptExamAdmission(profile, context) };
  },
};
