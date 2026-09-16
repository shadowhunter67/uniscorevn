import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHpu2ThptExamAdmission } from './evaluate';
import { HPU2_FIELD_THRESHOLDS_2026 } from './thresholds';
import { hpu2AdmissionMethods } from './methods';

interface Hpu2ComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): Hpu2ComparisonContext {
  const fieldCode = selection.programId ?? HPU2_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hpu2ComparisonAdapter: SchoolComparisonAdapter<Hpu2ComparisonContext> = {
  schoolId: 'hpu2',
  methodId: hpu2AdmissionMethods[0].id,
  methodName: hpu2AdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHpu2ThptExamAdmission(profile, context) };
  },
};
