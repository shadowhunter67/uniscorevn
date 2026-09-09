import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVutmThptExamAdmission } from './evaluate';
import { VUTM_PROGRAMS } from './thresholds';
import { vutmAdmissionMethods } from './methods';

interface VutmComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VutmComparisonContext {
  const programCode = selection.programId ?? VUTM_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vutmComparisonAdapter: SchoolComparisonAdapter<VutmComparisonContext> = {
  schoolId: 'vutm',
  methodId: vutmAdmissionMethods[0].id,
  methodName: vutmAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVutmThptExamAdmission(profile, context) };
  },
};
