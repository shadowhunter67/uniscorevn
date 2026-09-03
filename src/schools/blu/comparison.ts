import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateBluThptExamAdmission } from './evaluate';
import { BLU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { bluAdmissionMethods } from './methods';

interface BluComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): BluComparisonContext {
  const fieldCode = selection.programId ?? BLU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const bluComparisonAdapter: SchoolComparisonAdapter<BluComparisonContext> = {
  schoolId: 'blu',
  methodId: bluAdmissionMethods[0].id,
  methodName: bluAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateBluThptExamAdmission(profile, context) };
  },
};
