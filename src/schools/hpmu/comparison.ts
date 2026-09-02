import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HpmuThptExamEvaluationContext } from './evaluate';
import { evaluateHpmuThptExamAdmission } from './evaluate';
import { hpmuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HpmuThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hpmuComparisonAdapter: SchoolComparisonAdapter<HpmuThptExamEvaluationContext> = {
  schoolId: 'hpmu',
  methodId: hpmuAdmissionMethods[0].id,
  methodName: hpmuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHpmuThptExamAdmission(profile, context) };
  },
};
