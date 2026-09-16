import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDhvThptExamAdmission } from './evaluate';
import { DHV_FIELD_THRESHOLDS_2026 } from './thresholds';
import { dhvAdmissionMethods } from './methods';

interface DhvComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DhvComparisonContext {
  const fieldCode = selection.programId ?? DHV_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dhvComparisonAdapter: SchoolComparisonAdapter<DhvComparisonContext> = {
  schoolId: 'dhv',
  methodId: dhvAdmissionMethods[0].id,
  methodName: dhvAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDhvThptExamAdmission(profile, context) };
  },
};
