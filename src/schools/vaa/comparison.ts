import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVaaAdmission, type VaaEvaluationContext } from './evaluate';
import { VAA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vaaAdmissionMethods } from './methods';

function isVaaMethodId(value: string | undefined): boolean {
  return vaaAdmissionMethods.some((method) => method.id === value);
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VaaEvaluationContext {
  return {
    fieldCode: selection.programId ?? VAA_FIELD_THRESHOLDS_2026[0]?.code,
    methodId: isVaaMethodId(selection.methodId) ? selection.methodId : vaaAdmissionMethods[0].id,
  };
}

export const vaaComparisonAdapter: SchoolComparisonAdapter<VaaEvaluationContext> = {
  schoolId: 'vaa',
  methodId: vaaAdmissionMethods[0].id,
  methodName: vaaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVaaAdmission(profile, context) };
  },
};
