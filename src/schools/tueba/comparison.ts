import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTuebaThptExamAdmission } from './evaluate';
import { TUEBA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { tuebaAdmissionMethods } from './methods';

interface TuebaComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TuebaComparisonContext {
  const fieldCode = selection.programId ?? TUEBA_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tuebaComparisonAdapter: SchoolComparisonAdapter<TuebaComparisonContext> = {
  schoolId: 'tueba',
  methodId: tuebaAdmissionMethods[0].id,
  methodName: tuebaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTuebaThptExamAdmission(profile, context) };
  },
};
