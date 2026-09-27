import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateNapaThptExamExactAdmission, type NapaThptExamExactEvaluationContext } from './evaluate';
import { napaAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): NapaThptExamExactEvaluationContext {
  return {
    programCode: selection.context?.programCode,
    subjectContext: getSubjectContext(selection.context?.combinationId),
  };
}

export const napaComparisonAdapter: SchoolComparisonAdapter<NapaThptExamExactEvaluationContext> = {
  schoolId: 'napa',
  methodId: napaAdmissionMethods[0].id,
  methodName: napaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateNapaThptExamExactAdmission(profile, context) };
  },
};
