import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateMduThptExamAdmission, evaluateMduThptExamExactAdmission, type MduThptExamExactEvaluationContext } from './evaluate';
import { mduAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): MduThptExamExactEvaluationContext {
  return {
    programCode: selection.programId,
    subjectContext: getSubjectContext(selection.context?.combinationId),
  };
}

export const mduComparisonAdapter: SchoolComparisonAdapter<MduThptExamExactEvaluationContext> = {
  schoolId: 'mdu',
  methodId: mduAdmissionMethods[0].id,
  methodName: mduAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateMduThptExamExactAdmission(profile, context) };
    return { evaluation: evaluateMduThptExamAdmission(profile, context) };
  },
};
