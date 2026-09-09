import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHuphThptExamAdmission } from './evaluate';
import { HUPH_PROGRAMS } from './thresholds';
import { huphAdmissionMethods } from './methods';

interface HuphComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HuphComparisonContext {
  const programCode = selection.programId ?? HUPH_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const huphComparisonAdapter: SchoolComparisonAdapter<HuphComparisonContext> = {
  schoolId: 'huph',
  methodId: huphAdmissionMethods[0].id,
  methodName: huphAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHuphThptExamAdmission(profile, context) };
  },
};
