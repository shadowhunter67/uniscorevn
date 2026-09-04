import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePxuThptExamAdmission } from './evaluate';
import { PXU_PROGRAMS } from './thresholds';
import { pxuAdmissionMethods } from './methods';

interface PxuComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PxuComparisonContext {
  const programCode = selection.programId ?? PXU_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pxuComparisonAdapter: SchoolComparisonAdapter<PxuComparisonContext> = {
  schoolId: 'pxu',
  methodId: pxuAdmissionMethods[0].id,
  methodName: pxuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePxuThptExamAdmission(profile, context) };
  },
};
