import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HmuThptExamExactEvaluationContext } from './evaluate';
import { evaluateHmuThptExamExactAdmission } from './evaluate';
import { hmuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HmuThptExamExactEvaluationContext {
  return {
    selectedProgramId: selection.programId,
    subjectContext: getSubjectContext(selection.context?.combinationId),
  };
}

export const hmuComparisonAdapter: SchoolComparisonAdapter<HmuThptExamExactEvaluationContext> = {
  schoolId: 'hmu',
  methodId: hmuAdmissionMethods[0].id,
  methodName: hmuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHmuThptExamExactAdmission(profile, context) };
  },
};
