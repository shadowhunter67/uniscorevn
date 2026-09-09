import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateUlsaThptExamAdmission } from './evaluate';
import { ULSA_PROGRAMS } from './thresholds';
import { ulsaAdmissionMethods } from './methods';

interface UlsaComparisonContext {
  programCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UlsaComparisonContext {
  const programCode = selection.programId ?? ULSA_PROGRAMS[0]?.code;
  return { programCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const ulsaComparisonAdapter: SchoolComparisonAdapter<UlsaComparisonContext> = {
  schoolId: 'ulsa',
  methodId: ulsaAdmissionMethods[0].id,
  methodName: ulsaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUlsaThptExamAdmission(profile, context) };
  },
};
