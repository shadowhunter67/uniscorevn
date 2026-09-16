import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDutThptExamAdmission } from './evaluate';
import { DUT_FIELD_THRESHOLDS_2026 } from './thresholds';
import { dutAdmissionMethods } from './methods';

interface DutComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DutComparisonContext {
  const fieldCode = selection.programId ?? DUT_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dutComparisonAdapter: SchoolComparisonAdapter<DutComparisonContext> = {
  schoolId: 'dut',
  methodId: dutAdmissionMethods[0].id,
  methodName: dutAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDutThptExamAdmission(profile, context) };
  },
};
