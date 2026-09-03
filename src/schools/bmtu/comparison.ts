import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateBmtuThptExamAdmission, type BmtuEvaluationContext } from './evaluate';
import { BMTU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { bmtuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): BmtuEvaluationContext {
  const fieldCode = selection.programId ?? BMTU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const bmtuComparisonAdapter: SchoolComparisonAdapter<BmtuEvaluationContext> = {
  schoolId: 'bmtu',
  methodId: bmtuAdmissionMethods[0].id,
  methodName: bmtuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateBmtuThptExamAdmission(profile, context) };
  },
};
