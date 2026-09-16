import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDueudnThptExamAdmission } from './evaluate';
import { DUEUDN_FIELD_THRESHOLDS_2026 } from './thresholds';
import { dueudnAdmissionMethods } from './methods';

interface DueudnComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DueudnComparisonContext {
  const fieldCode = selection.programId ?? DUEUDN_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dueudnComparisonAdapter: SchoolComparisonAdapter<DueudnComparisonContext> = {
  schoolId: 'dueudn',
  methodId: dueudnAdmissionMethods[0].id,
  methodName: dueudnAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDueudnThptExamAdmission(profile, context) };
  },
};
