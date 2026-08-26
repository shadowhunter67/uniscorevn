import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePyuThptExamAdmission, type PyuThptExamEvaluationContext } from './evaluate';
import { pyuAdmissionMethods } from './methods';

/** PYU chưa có mapping ngành->nhóm ở `/compare` — dùng `group` mặc định `'tierChung'` (ngưỡng thấp
 * hơn trong 2 nhóm), giống cách CTUMP/VWA/HAU xử lý khi thiếu mapping. */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): PyuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'tierChung' };
}

export const pyuComparisonAdapter: SchoolComparisonAdapter<PyuThptExamEvaluationContext> = {
  schoolId: 'pyu',
  methodId: pyuAdmissionMethods[0].id,
  methodName: pyuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePyuThptExamAdmission(profile, context) };
  },
};
