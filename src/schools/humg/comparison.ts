import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHumgThptExamAdmission, type HumgThptExamEvaluationContext } from './evaluate';
import { humgAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HumgThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const humgComparisonAdapter: SchoolComparisonAdapter<HumgThptExamEvaluationContext> = {
  schoolId: 'humg',
  methodId: humgAdmissionMethods[0].id,
  methodName: humgAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHumgThptExamAdmission(profile, context) };
  },
};
