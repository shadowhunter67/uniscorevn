import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePyuThptExamAdmission } from './evaluate';
import { PYU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { pyuAdmissionMethods } from './methods';

interface PyuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PyuComparisonContext {
  const fieldCode = selection.programId ?? PYU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pyuComparisonAdapter: SchoolComparisonAdapter<PyuComparisonContext> = {
  schoolId: 'pyu',
  methodId: pyuAdmissionMethods[0].id,
  methodName: pyuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePyuThptExamAdmission(profile, context) };
  },
};
