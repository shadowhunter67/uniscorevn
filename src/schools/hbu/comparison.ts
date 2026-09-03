import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHbuThptExamAdmission } from './evaluate';
import { HBU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { hbuAdmissionMethods } from './methods';

interface HbuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HbuComparisonContext {
  const fieldCode = selection.programId ?? HBU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hbuComparisonAdapter: SchoolComparisonAdapter<HbuComparisonContext> = {
  schoolId: 'hbu',
  methodId: hbuAdmissionMethods[0].id,
  methodName: hbuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHbuThptExamAdmission(profile, context) };
  },
};
