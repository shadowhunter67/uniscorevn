import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTnutThptExamAdmission } from './evaluate';
import { TNUT_FIELD_THRESHOLDS_2025 } from './thresholds';
import { tnutAdmissionMethods } from './methods';

interface TnutComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TnutComparisonContext {
  const fieldCode = selection.programId ?? TNUT_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tnutComparisonAdapter: SchoolComparisonAdapter<TnutComparisonContext> = {
  schoolId: 'tnut',
  methodId: tnutAdmissionMethods[0].id,
  methodName: tnutAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTnutThptExamAdmission(profile, context) };
  },
};
