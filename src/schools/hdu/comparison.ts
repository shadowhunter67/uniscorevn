import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHduThptExamAdmission, type HduThptExamEvaluationContext } from './evaluate';
import { hduAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HduThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hduComparisonAdapter: SchoolComparisonAdapter<HduThptExamEvaluationContext> = {
  schoolId: 'hdu',
  methodId: hduAdmissionMethods[0].id,
  methodName: hduAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHduThptExamAdmission(profile, context) };
  },
};
