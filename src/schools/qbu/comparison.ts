import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { QbuThptExamEvaluationContext } from './evaluate';
import { evaluateQbuThptExamAdmission } from './evaluate';
import { qbuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): QbuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const qbuComparisonAdapter: SchoolComparisonAdapter<QbuThptExamEvaluationContext> = {
  schoolId: 'qbu',
  methodId: qbuAdmissionMethods[0].id,
  methodName: qbuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateQbuThptExamAdmission(profile, context) };
  },
};
