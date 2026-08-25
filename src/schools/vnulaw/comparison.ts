import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnulawThptExamAdmission, type VnulawThptExamEvaluationContext } from './evaluate';
import { vnulawAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnulawThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnulawComparisonAdapter: SchoolComparisonAdapter<VnulawThptExamEvaluationContext> = {
  schoolId: 'vnulaw',
  methodId: vnulawAdmissionMethods[0].id,
  methodName: vnulawAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnulawThptExamAdmission(profile, context) };
  },
};
