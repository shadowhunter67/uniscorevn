import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { TvuThptExamEvaluationContext } from './evaluate';
import { evaluateTvuThptExamAdmission } from './evaluate';
import { tvuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TvuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tvuComparisonAdapter: SchoolComparisonAdapter<TvuThptExamEvaluationContext> = {
  schoolId: 'tvu',
  methodId: tvuAdmissionMethods[0].id,
  methodName: tvuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTvuThptExamAdmission(profile, context) };
  },
};
