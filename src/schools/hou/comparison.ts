import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HouThptExamEvaluationContext } from './evaluate';
import { evaluateHouThptExamAdmission } from './evaluate';
import { houAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HouThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const houComparisonAdapter: SchoolComparisonAdapter<HouThptExamEvaluationContext> = {
  schoolId: 'hou',
  methodId: houAdmissionMethods[0].id,
  methodName: houAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHouThptExamAdmission(profile, context) };
  },
};
