import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnuisThptExamAdmission } from './evaluate';
import { VNUIS_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vnuisAdmissionMethods } from './methods';

interface VnuisComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuisComparisonContext {
  const fieldCode = selection.programId ?? VNUIS_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuisComparisonAdapter: SchoolComparisonAdapter<VnuisComparisonContext> = {
  schoolId: 'vnuis',
  methodId: vnuisAdmissionMethods[0].id,
  methodName: vnuisAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuisThptExamAdmission(profile, context) };
  },
};
