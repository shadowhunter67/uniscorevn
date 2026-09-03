import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHluvThptExamAdmission } from './evaluate';
import { HLUV_FIELD_THRESHOLDS_2025 } from './thresholds';
import { hluvAdmissionMethods } from './methods';

interface HluvComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HluvComparisonContext {
  const fieldCode = selection.programId ?? HLUV_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hluvComparisonAdapter: SchoolComparisonAdapter<HluvComparisonContext> = {
  schoolId: 'hluv',
  methodId: hluvAdmissionMethods[0].id,
  methodName: hluvAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHluvThptExamAdmission(profile, context) };
  },
};
