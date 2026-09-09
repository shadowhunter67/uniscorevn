import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateUnetiThptExamAdmission } from './evaluate';
import { UNETI_PROGRAMS } from './thresholds';
import { unetiAdmissionMethods } from './methods';

interface UnetiComparisonContext {
  programCode?: string;
  subjectContext?: { combinationId?: string };
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UnetiComparisonContext {
  const programCode = selection.programId ?? UNETI_PROGRAMS[0]?.code;
  return { programCode, subjectContext: { combinationId: selection.context?.combinationId } };
}

export const unetiComparisonAdapter: SchoolComparisonAdapter<UnetiComparisonContext> = {
  schoolId: 'uneti',
  methodId: unetiAdmissionMethods[0].id,
  methodName: unetiAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUnetiThptExamAdmission(profile, context) };
  },
};
