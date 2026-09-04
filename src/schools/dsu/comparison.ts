import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDsuThptExamAdmission } from './evaluate';
import { DSU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { dsuAdmissionMethods } from './methods';

interface DsuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DsuComparisonContext {
  const fieldCode = selection.programId ?? DSU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dsuComparisonAdapter: SchoolComparisonAdapter<DsuComparisonContext> = {
  schoolId: 'dsu',
  methodId: dsuAdmissionMethods[0].id,
  methodName: dsuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDsuThptExamAdmission(profile, context) };
  },
};
