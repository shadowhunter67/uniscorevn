import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDnuThptExamAdmission } from './evaluate';
import { DNU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { dnuAdmissionMethods } from './methods';

interface DnuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DnuComparisonContext {
  const fieldCode = selection.programId ?? DNU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dnuComparisonAdapter: SchoolComparisonAdapter<DnuComparisonContext> = {
  schoolId: 'dnu',
  methodId: dnuAdmissionMethods[0].id,
  methodName: dnuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDnuThptExamAdmission(profile, context) };
  },
};
