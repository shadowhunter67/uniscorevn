import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateStuThptExamAdmission } from './evaluate';
import { STU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { stuAdmissionMethods } from './methods';

interface StuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): StuComparisonContext {
  const fieldCode = selection.programId ?? STU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const stuComparisonAdapter: SchoolComparisonAdapter<StuComparisonContext> = {
  schoolId: 'stu',
  methodId: stuAdmissionMethods[0].id,
  methodName: stuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateStuThptExamAdmission(profile, context) };
  },
};
