import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHcmupesAdmission, type HcmupesEvaluationContext } from './evaluate';
import { hcmupesAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HcmupesEvaluationContext {
  return { pairId: selection.context?.hcmupesPairId, talentScore10: selection.context?.hcmupesTalentScore10 };
}

export const hcmupesComparisonAdapter: SchoolComparisonAdapter<HcmupesEvaluationContext> = {
  schoolId: 'hcmupes',
  methodId: hcmupesAdmissionMethods[0].id,
  methodName: hcmupesAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHcmupesAdmission(profile, context) };
  },
};
