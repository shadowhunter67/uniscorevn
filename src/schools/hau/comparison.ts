import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHauThptExamAdmission, type HauThptExamEvaluationContext } from './evaluate';
import { hauAdmissionMethods } from './methods';

/** HAU chưa có cutoff comparison ở `/compare` — giữ hành vi đơn giản như TDMU/VWA. Adapter dùng
 * phương thức thi TN THPT, `group` mặc định `'infrastructureEngineering'` (ngưỡng thấp hơn trong
 * 2 nhóm không-năng-khiếu; mapping ngành->nhóm còn là knowledge gap). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): HauThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'infrastructureEngineering' };
}

export const hauComparisonAdapter: SchoolComparisonAdapter<HauThptExamEvaluationContext> = {
  schoolId: 'hau',
  methodId: hauAdmissionMethods[0].id,
  methodName: hauAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHauThptExamAdmission(profile, context) };
  },
};
