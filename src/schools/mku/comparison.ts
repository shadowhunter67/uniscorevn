import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateMkuThptExamAdmission } from './evaluate';
import { MKU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { mkuAdmissionMethods } from './methods';

interface MkuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): MkuComparisonContext {
  const fieldCode = selection.programId ?? MKU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const mkuComparisonAdapter: SchoolComparisonAdapter<MkuComparisonContext> = {
  schoolId: 'mku',
  methodId: mkuAdmissionMethods[0].id,
  methodName: mkuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateMkuThptExamAdmission(profile, context) };
  },
};
