import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHvuThptExamAdmission } from './evaluate';
import { HVU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { hvuAdmissionMethods } from './methods';

interface HvuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HvuComparisonContext {
  const fieldCode = selection.programId ?? HVU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hvuComparisonAdapter: SchoolComparisonAdapter<HvuComparisonContext> = {
  schoolId: 'hvu',
  methodId: hvuAdmissionMethods[0].id,
  methodName: hvuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHvuThptExamAdmission(profile, context) };
  },
};
