import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHcmunreThptExamAdmission } from './evaluate';
import { HCMUNRE_FIELD_THRESHOLDS_2026 } from './thresholds';
import { hcmunreAdmissionMethods } from './methods';

interface HcmunreComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HcmunreComparisonContext {
  const fieldCode = selection.programId ?? HCMUNRE_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hcmunreComparisonAdapter: SchoolComparisonAdapter<HcmunreComparisonContext> = {
  schoolId: 'hcmunre',
  methodId: hcmunreAdmissionMethods[0].id,
  methodName: hcmunreAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHcmunreThptExamAdmission(profile, context) };
  },
};
