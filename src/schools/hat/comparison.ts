import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHatThptExamAdmission } from './evaluate';
import { HAT_FIELD_THRESHOLDS_2025 } from './thresholds';
import { hatAdmissionMethods } from './methods';

interface HatComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HatComparisonContext {
  const fieldCode = selection.programId ?? HAT_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hatComparisonAdapter: SchoolComparisonAdapter<HatComparisonContext> = {
  schoolId: 'hat',
  methodId: hatAdmissionMethods[0].id,
  methodName: hatAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHatThptExamAdmission(profile, context) };
  },
};
