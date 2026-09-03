import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateThanglongThptExamAdmission } from './evaluate';
import { THANGLONG_FIELD_THRESHOLDS_2025 } from './thresholds';
import { thanglongAdmissionMethods } from './methods';

interface ThanglongComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): ThanglongComparisonContext {
  const fieldCode = selection.programId ?? THANGLONG_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const thanglongComparisonAdapter: SchoolComparisonAdapter<ThanglongComparisonContext> = {
  schoolId: 'thanglong',
  methodId: thanglongAdmissionMethods[0].id,
  methodName: thanglongAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateThanglongThptExamAdmission(profile, context) };
  },
};
