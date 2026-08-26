import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateUshAdmission, type UshEvaluationContext } from './evaluate';
import { ushAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UshEvaluationContext {
  return { pairId: selection.context?.ushPairId, talentScore10: selection.context?.ushTalentScore10 };
}

export const ushComparisonAdapter: SchoolComparisonAdapter<UshEvaluationContext> = {
  schoolId: 'ush',
  methodId: ushAdmissionMethods[0].id,
  methodName: ushAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateUshAdmission(profile, context) };
  },
};
