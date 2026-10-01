import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateVaaThptExamAdmission, type VaaEvaluationContext } from './evaluate';
import { VAA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { vaaAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VaaEvaluationContext {
  return { fieldCode: selection.programId ?? VAA_FIELD_THRESHOLDS_2026[0]?.code };
}

export const vaaComparisonAdapter: SchoolComparisonAdapter<VaaEvaluationContext> = {
  schoolId: 'vaa',
  methodId: vaaAdmissionMethods[0].id,
  methodName: vaaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateVaaThptExamAdmission(profile, context) };
  },
};
