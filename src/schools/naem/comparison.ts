import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateNaemThptExamAdmission } from './evaluate';
import { NAEM_FIELD_THRESHOLDS_2025 } from './thresholds';
import { naemAdmissionMethods } from './methods';

interface NaemComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): NaemComparisonContext {
  const fieldCode = selection.programId ?? NAEM_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const naemComparisonAdapter: SchoolComparisonAdapter<NaemComparisonContext> = {
  schoolId: 'naem',
  methodId: naemAdmissionMethods[0].id,
  methodName: naemAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateNaemThptExamAdmission(profile, context) };
  },
};
