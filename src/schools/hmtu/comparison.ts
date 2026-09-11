import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHmtuThptExamAdmission } from './evaluate';
import { HMTU_PROGRAMS } from './thresholds';
import { hmtuAdmissionMethods } from './methods';

interface HmtuComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HmtuComparisonContext {
  const programCode = selection.programId ?? HMTU_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hmtuComparisonAdapter: SchoolComparisonAdapter<HmtuComparisonContext> = {
  schoolId: 'hmtu',
  methodId: hmtuAdmissionMethods[0].id,
  methodName: hmtuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHmtuThptExamAdmission(profile, context) };
  },
};
