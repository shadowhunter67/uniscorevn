import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HumpThptExamEvaluationContext } from './evaluate';
import { evaluateHumpThptExamAdmission } from './evaluate';
import { humpAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HumpThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const humpComparisonAdapter: SchoolComparisonAdapter<HumpThptExamEvaluationContext> = {
  schoolId: 'hump',
  methodId: humpAdmissionMethods[0].id,
  methodName: humpAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHumpThptExamAdmission(profile, context) };
  },
};
