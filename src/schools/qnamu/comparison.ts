import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { QnamuThptExamEvaluationContext } from './evaluate';
import { evaluateQnamuThptExamAdmission } from './evaluate';
import { qnamuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): QnamuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const qnamuComparisonAdapter: SchoolComparisonAdapter<QnamuThptExamEvaluationContext> = {
  schoolId: 'qnamu',
  methodId: qnamuAdmissionMethods[0].id,
  methodName: qnamuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateQnamuThptExamAdmission(profile, context) };
  },
};
