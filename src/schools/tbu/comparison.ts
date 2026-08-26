import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTbuThptExamAdmission, type TbuThptExamEvaluationContext } from './evaluate';
import { tbuAdmissionMethods } from './methods';

/** TBU chưa có cutoff comparison ở `/compare` — giữ hành vi đơn giản như TDMU/VWA/HAU/CTUMP.
 * Adapter dùng phương thức thi TN THPT, `group` mặc định `'standard'` (mapping ngành->nhóm còn là
 * knowledge gap). */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): TbuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), group: 'standard' };
}

export const tbuComparisonAdapter: SchoolComparisonAdapter<TbuThptExamEvaluationContext> = {
  schoolId: 'tbu',
  methodId: tbuAdmissionMethods[0].id,
  methodName: tbuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTbuThptExamAdmission(profile, context) };
  },
};
