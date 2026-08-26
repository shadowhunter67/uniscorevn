import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVwaThptExamAdmission, type VwaThptExamEvaluationContext } from './evaluate';
import { vwaAdmissionMethods } from './methods';

/** VWA chưa có cutoff comparison ở `/compare` (chỉ ngưỡng đăng ký xét tuyển) — giữ hành vi đơn
 * giản như TDMU/CTU. Adapter dùng phương thức thi TN THPT, `group` mặc định `'standard'` (mapping
 * ngành->nhóm còn là knowledge gap, xem `vwa-program-mapping-not-imported`). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): VwaThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'standard' };
}

export const vwaComparisonAdapter: SchoolComparisonAdapter<VwaThptExamEvaluationContext> = {
  schoolId: 'vwa',
  methodId: vwaAdmissionMethods[0].id,
  methodName: vwaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVwaThptExamAdmission(profile, context) };
  },
};
