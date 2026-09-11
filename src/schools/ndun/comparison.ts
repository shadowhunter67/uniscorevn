import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateNdunThptExamAdmission } from './evaluate';
import { NDUN_PROGRAMS } from './thresholds';
import { ndunAdmissionMethods } from './methods';

interface NdunComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): NdunComparisonContext {
  const programCode = selection.programId ?? NDUN_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const ndunComparisonAdapter: SchoolComparisonAdapter<NdunComparisonContext> = {
  schoolId: 'ndun',
  methodId: ndunAdmissionMethods[0].id,
  methodName: ndunAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateNdunThptExamAdmission(profile, context) };
  },
};
