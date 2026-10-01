import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateActvnThptExamAdmission } from './evaluate';
import { ACTVN_FIELD_THRESHOLDS_2026 } from './thresholds';
import { actvnAdmissionMethods } from './methods';

interface ActvnComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ActvnComparisonContext {
  const fieldCode = selection.programId ?? ACTVN_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const actvnComparisonAdapter: SchoolComparisonAdapter<ActvnComparisonContext> = {
  schoolId: 'actvn',
  methodId: actvnAdmissionMethods[0].id,
  methodName: actvnAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateActvnThptExamAdmission(profile, context) };
  },
};
