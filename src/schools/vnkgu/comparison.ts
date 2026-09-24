import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVnkguThptExamAdmission } from './evaluate';
import { VNKGU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vnkguAdmissionMethods } from './methods';

interface VnkguComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VnkguComparisonContext {
  const fieldCode = selection.programId ?? VNKGU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vnkguComparisonAdapter: SchoolComparisonAdapter<VnkguComparisonContext> = {
  schoolId: 'vnkgu',
  methodId: vnkguAdmissionMethods[0].id,
  methodName: vnkguAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVnkguThptExamAdmission(profile, context) };
  },
};
