import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePntuThptExamAdmission, type PntuThptExamEvaluationContext } from './evaluate';
import { pntuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PntuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pntuComparisonAdapter: SchoolComparisonAdapter<PntuThptExamEvaluationContext> = {
  schoolId: 'pntu',
  methodId: pntuAdmissionMethods[0].id,
  methodName: pntuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePntuThptExamAdmission(profile, context) };
  },
};
