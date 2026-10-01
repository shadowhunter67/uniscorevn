import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnuvjuThptExamAdmission } from './evaluate';
import { VNUVJU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vnuvjuAdmissionMethods } from './methods';

interface VnuvjuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuvjuComparisonContext {
  const fieldCode = selection.programId ?? VNUVJU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuvjuComparisonAdapter: SchoolComparisonAdapter<VnuvjuComparisonContext> = {
  schoolId: 'vnuvju',
  methodId: vnuvjuAdmissionMethods[0].id,
  methodName: vnuvjuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuvjuThptExamAdmission(profile, context) };
  },
};
