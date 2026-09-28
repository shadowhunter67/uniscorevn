import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnuhsbThptExamAdmission } from './evaluate';
import { VNUHSB_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vnuhsbAdmissionMethods } from './methods';

interface VnuhsbComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnuhsbComparisonContext {
  const fieldCode = selection.programId ?? VNUHSB_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnuhsbComparisonAdapter: SchoolComparisonAdapter<VnuhsbComparisonContext> = {
  schoolId: 'vnuhsb',
  methodId: vnuhsbAdmissionMethods[0].id,
  methodName: vnuhsbAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnuhsbThptExamAdmission(profile, context) };
  },
};
