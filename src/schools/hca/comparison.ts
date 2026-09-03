import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHcaThptExamAdmission, type HcaEvaluationContext } from './evaluate';
import { HCA_MAJOR_THRESHOLDS_2025 } from './thresholds';
import { hcaAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HcaEvaluationContext {
  const majorCode = selection.programId ?? HCA_MAJOR_THRESHOLDS_2025[0]?.code;
  return { majorCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hcaComparisonAdapter: SchoolComparisonAdapter<HcaEvaluationContext> = {
  schoolId: 'hca',
  methodId: hcaAdmissionMethods[0].id,
  methodName: hcaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHcaThptExamAdmission(profile, context) };
  },
};
