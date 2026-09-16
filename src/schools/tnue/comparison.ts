import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTnueThptExamAdmission, type TnueThptExamEvaluationContext } from './evaluate';
import { TNUE_FIELD_THRESHOLDS_2026 } from './thresholds';
import { tnueAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TnueThptExamEvaluationContext {
  return { fieldCode: selection.programId ?? TNUE_FIELD_THRESHOLDS_2026[0]?.code };
}

export const tnueComparisonAdapter: SchoolComparisonAdapter<TnueThptExamEvaluationContext> = {
  schoolId: 'tnue',
  methodId: tnueAdmissionMethods[0].id,
  methodName: tnueAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTnueThptExamAdmission(profile, context) };
  },
};
