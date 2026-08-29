import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HnmuThptExamEvaluationContext } from './evaluate';
import { evaluateHnmuThptExamAdmission } from './evaluate';
import { hnmuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HnmuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hnmuComparisonAdapter: SchoolComparisonAdapter<HnmuThptExamEvaluationContext> = {
  schoolId: 'hnmu',
  methodId: hnmuAdmissionMethods[0].id,
  methodName: hnmuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHnmuThptExamAdmission(profile, context) };
  },
};
