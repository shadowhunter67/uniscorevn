import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVttuThptExamAdmission } from './evaluate';
import { VTTU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { vttuAdmissionMethods } from './methods';

interface VttuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VttuComparisonContext {
  const fieldCode = selection.programId ?? VTTU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vttuComparisonAdapter: SchoolComparisonAdapter<VttuComparisonContext> = {
  schoolId: 'vttu',
  methodId: vttuAdmissionMethods[0].id,
  methodName: vttuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVttuThptExamAdmission(profile, context) };
  },
};
