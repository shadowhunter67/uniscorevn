import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHtuThptExamAdmission } from './evaluate';
import { HTU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { htuAdmissionMethods } from './methods';

interface HtuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HtuComparisonContext {
  const fieldCode = selection.programId ?? HTU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const htuComparisonAdapter: SchoolComparisonAdapter<HtuComparisonContext> = {
  schoolId: 'htu',
  methodId: htuAdmissionMethods[0].id,
  methodName: htuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHtuThptExamAdmission(profile, context) };
  },
};
