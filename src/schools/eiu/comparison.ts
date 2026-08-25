import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateEiuThptExamAdmission, type EiuThptExamEvaluationContext } from './evaluate';
import { eiuAdmissionMethods } from './methods';

/** EIU chưa có cutoff comparison ở `/compare` (chỉ ngưỡng đăng ký xét tuyển) — giữ hành vi đơn
 * giản như TDMU/CTU/HUB. Adapter dùng phương thức thi TN THPT — input đọc thẳng từ
 * `ApplicantProfile.thpt.scores`, `program` mặc định `'standard'` (ngành Điều dưỡng dùng ngưỡng
 * riêng của Bộ GD&ĐT, chưa model — xem `eiu-nursing-moet-threshold-not-modeled`). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): EiuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), program: 'standard' };
}

export const eiuComparisonAdapter: SchoolComparisonAdapter<EiuThptExamEvaluationContext> = {
  schoolId: 'eiu',
  methodId: eiuAdmissionMethods[0].id,
  methodName: eiuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateEiuThptExamAdmission(profile, context) };
  },
};
