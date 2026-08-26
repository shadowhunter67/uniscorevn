import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateCtumpThptExamAdmission, type CtumpThptExamEvaluationContext } from './evaluate';
import { ctumpAdmissionMethods } from './methods';

/** CTUMP chưa có cutoff comparison ở `/compare` — giữ hành vi đơn giản như TDMU/VWA/HAU. Adapter
 * dùng phương thức thi TN THPT, `group` mặc định `'tier15'` (ngưỡng thấp nhất trong 4 nhóm; mapping
 * ngành->nhóm còn là knowledge gap). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): CtumpThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'tier15' };
}

export const ctumpComparisonAdapter: SchoolComparisonAdapter<CtumpThptExamEvaluationContext> = {
  schoolId: 'ctump',
  methodId: ctumpAdmissionMethods[0].id,
  methodName: ctumpAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateCtumpThptExamAdmission(profile, context) };
  },
};
