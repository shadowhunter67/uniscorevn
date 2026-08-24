import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHupThptExamAdmission, type HupThptExamEvaluationContext } from './evaluate';
import { hupAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HupThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hupComparisonAdapter: SchoolComparisonAdapter<HupThptExamEvaluationContext> = {
  schoolId: 'hup',
  methodId: hupAdmissionMethods[0].id,
  methodName: hupAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHupThptExamAdmission(profile, context) };
  },
};
