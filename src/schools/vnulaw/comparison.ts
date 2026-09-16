import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnulawThptExamAdmission } from './evaluate';
import { VNULAW_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vnulawAdmissionMethods } from './methods';

interface VnulawComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnulawComparisonContext {
  const fieldCode = selection.programId ?? VNULAW_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnulawComparisonAdapter: SchoolComparisonAdapter<VnulawComparisonContext> = {
  schoolId: 'vnulaw',
  methodId: vnulawAdmissionMethods[0].id,
  methodName: vnulawAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnulawThptExamAdmission(profile, context) };
  },
};
