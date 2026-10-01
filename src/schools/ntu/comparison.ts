import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateNtuThptExamAdmission, type NtuEvaluationContext } from './evaluate';
import { NTU_PROGRAM_THRESHOLDS_2026 } from './thresholds';
import { ntuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): NtuEvaluationContext {
  return { programCode: selection.programId ?? NTU_PROGRAM_THRESHOLDS_2026[0]?.code };
}

export const ntuComparisonAdapter: SchoolComparisonAdapter<NtuEvaluationContext> = {
  schoolId: 'ntu',
  methodId: ntuAdmissionMethods[0].id,
  methodName: ntuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateNtuThptExamAdmission(profile, context) };
  },
};
