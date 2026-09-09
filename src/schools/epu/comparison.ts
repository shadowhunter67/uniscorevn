import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateEpuThptExamAdmission } from './evaluate';
import { EPU_PROGRAMS } from './thresholds';
import { epuAdmissionMethods } from './methods';

interface EpuComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): EpuComparisonContext {
  const programCode = selection.programId ?? EPU_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const epuComparisonAdapter: SchoolComparisonAdapter<EpuComparisonContext> = {
  schoolId: 'epu',
  methodId: epuAdmissionMethods[0].id,
  methodName: epuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateEpuThptExamAdmission(profile, context) };
  },
};
