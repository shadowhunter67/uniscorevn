import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVmuVinhThptExamAdmission } from './evaluate';
import { VMUVINH_PROGRAMS } from './thresholds';
import { vmuvinhAdmissionMethods } from './methods';

interface VmuVinhComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VmuVinhComparisonContext {
  const programCode = selection.programId ?? VMUVINH_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const vmuvinhComparisonAdapter: SchoolComparisonAdapter<VmuVinhComparisonContext> = {
  schoolId: 'vmuvinh',
  methodId: vmuvinhAdmissionMethods[0].id,
  methodName: vmuvinhAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVmuVinhThptExamAdmission(profile, context) };
  },
};
