import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTumpThptExamAdmission } from './evaluate';
import { TUMP_FIELD_THRESHOLDS_2025 } from './thresholds';
import { tumpAdmissionMethods } from './methods';

interface TumpComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TumpComparisonContext {
  const fieldCode = selection.programId ?? TUMP_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const tumpComparisonAdapter: SchoolComparisonAdapter<TumpComparisonContext> = {
  schoolId: 'tump',
  methodId: tumpAdmissionMethods[0].id,
  methodName: tumpAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTumpThptExamAdmission(profile, context) };
  },
};
