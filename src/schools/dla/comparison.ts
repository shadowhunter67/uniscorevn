import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDlaThptExamAdmission } from './evaluate';
import { DLA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { dlaAdmissionMethods } from './methods';

interface DlaComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DlaComparisonContext {
  const fieldCode = selection.programId ?? DLA_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dlaComparisonAdapter: SchoolComparisonAdapter<DlaComparisonContext> = {
  schoolId: 'dla',
  methodId: dlaAdmissionMethods[0].id,
  methodName: dlaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDlaThptExamAdmission(profile, context) };
  },
};
