import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVhsThptExamAdmission } from './evaluate';
import { VHS_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vhsAdmissionMethods } from './methods';

interface VhsComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VhsComparisonContext {
  const fieldCode = selection.programId ?? VHS_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vhsComparisonAdapter: SchoolComparisonAdapter<VhsComparisonContext> = {
  schoolId: 'vhs',
  methodId: vhsAdmissionMethods[0].id,
  methodName: vhsAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVhsThptExamAdmission(profile, context) };
  },
};
