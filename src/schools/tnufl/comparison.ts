import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTnuflThptExamAdmission } from './evaluate';
import { TNUFL_FIELD_THRESHOLDS_2026 } from './thresholds';
import { tnuflAdmissionMethods } from './methods';

interface TnuflComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TnuflComparisonContext {
  const fieldCode = selection.programId ?? TNUFL_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tnuflComparisonAdapter: SchoolComparisonAdapter<TnuflComparisonContext> = {
  schoolId: 'tnufl',
  methodId: tnuflAdmissionMethods[0].id,
  methodName: tnuflAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTnuflThptExamAdmission(profile, context) };
  },
};
