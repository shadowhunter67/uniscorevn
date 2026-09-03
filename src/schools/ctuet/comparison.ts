import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateCtuetThptExamAdmission } from './evaluate';
import { CTUET_FIELD_THRESHOLDS_2025 } from './thresholds';
import { ctuetAdmissionMethods } from './methods';

interface CtuetComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): CtuetComparisonContext {
  const fieldCode = selection.programId ?? CTUET_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const ctuetComparisonAdapter: SchoolComparisonAdapter<CtuetComparisonContext> = {
  schoolId: 'ctuet',
  methodId: ctuetAdmissionMethods[0].id,
  methodName: ctuetAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateCtuetThptExamAdmission(profile, context) };
  },
};
