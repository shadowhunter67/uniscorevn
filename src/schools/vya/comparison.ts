import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVyaThptExamAdmission } from './evaluate';
import { VYA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vyaAdmissionMethods } from './methods';

interface VyaComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VyaComparisonContext {
  const fieldCode = selection.programId ?? VYA_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

/** Wire method[0] (mã 100, thi TN THPT) vào /compare — method[1] (mã 200, học bạ) chưa có
 * comparisonAdapter riêng, cùng tiền lệ các trường nhiều phương thức khác (vd EIU). */
export const vyaComparisonAdapter: SchoolComparisonAdapter<VyaComparisonContext> = {
  schoolId: 'vya',
  methodId: vyaAdmissionMethods[0].id,
  methodName: vyaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVyaThptExamAdmission(profile, context) };
  },
};
