import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateUkhThptExamAdmission } from './evaluate';
import { UKH_FIELD_THRESHOLDS_2026 } from './thresholds';
import { ukhAdmissionMethods } from './methods';

interface UkhComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UkhComparisonContext {
  const fieldCode = selection.programId ?? UKH_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const ukhComparisonAdapter: SchoolComparisonAdapter<UkhComparisonContext> = {
  schoolId: 'ukh',
  methodId: ukhAdmissionMethods[0].id,
  methodName: ukhAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUkhThptExamAdmission(profile, context) };
  },
};
