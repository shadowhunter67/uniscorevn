import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateLtvuniThptExamAdmission, type LtvuniThptExamEvaluationContext } from './evaluate';
import { ltvuniAdmissionMethods } from './methods';

/** LTVUni chưa có cutoff comparison ở `/compare` — giữ hành vi đơn giản như các trường khác cùng
 * lớp. Adapter dùng phương thức thi TN THPT, `group` mặc định `'standard'`. */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): LtvuniThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'standard' };
}

export const ltvuniComparisonAdapter: SchoolComparisonAdapter<LtvuniThptExamEvaluationContext> = {
  schoolId: 'ltvuni',
  methodId: ltvuniAdmissionMethods[0].id,
  methodName: ltvuniAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateLtvuniThptExamAdmission(profile, context) };
  },
};
