import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDthuThptExamAdmission, type DthuThptExamEvaluationContext } from './evaluate';
import { dthuAdmissionMethods } from './methods';

/** DTHU chưa có cutoff comparison ở `/compare` — giữ hành vi đơn giản như TDMU/VWA/HAU/CTUMP/TBU.
 * Adapter dùng phương thức thi TN THPT, `group` mặc định `'standard'` (mapping ngành->nhóm còn là
 * knowledge gap). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): DthuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'standard' };
}

export const dthuComparisonAdapter: SchoolComparisonAdapter<DthuThptExamEvaluationContext> = {
  schoolId: 'dthu',
  methodId: dthuAdmissionMethods[0].id,
  methodName: dthuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDthuThptExamAdmission(profile, context) };
  },
};
