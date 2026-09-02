import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { QnuThptExamEvaluationContext } from './evaluate';
import { evaluateQnuThptExamAdmission } from './evaluate';
import { qnuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): QnuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const qnuComparisonAdapter: SchoolComparisonAdapter<QnuThptExamEvaluationContext> = {
  schoolId: 'qnu',
  methodId: qnuAdmissionMethods[0].id,
  methodName: qnuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateQnuThptExamAdmission(profile, context) };
  },
};
