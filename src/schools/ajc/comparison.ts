import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateAjcThptExamAdmission, type AjcThptExamEvaluationContext } from './evaluate';
import { ajcAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): AjcThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const ajcComparisonAdapter: SchoolComparisonAdapter<AjcThptExamEvaluationContext> = {
  schoolId: 'ajc',
  methodId: ajcAdmissionMethods[0].id,
  methodName: ajcAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateAjcThptExamAdmission(profile, context) };
  },
};
