import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HdiuThptExamEvaluationContext } from './evaluate';
import { evaluateHdiuThptExamAdmission } from './evaluate';
import { hdiuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HdiuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hdiuComparisonAdapter: SchoolComparisonAdapter<HdiuThptExamEvaluationContext> = {
  schoolId: 'hdiu',
  methodId: hdiuAdmissionMethods[0].id,
  methodName: hdiuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHdiuThptExamAdmission(profile, context) };
  },
};
