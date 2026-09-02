import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { HucThptExamEvaluationContext } from './evaluate';
import { evaluateHucThptExamAdmission } from './evaluate';
import { hucAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HucThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const hucComparisonAdapter: SchoolComparisonAdapter<HucThptExamEvaluationContext> = {
  schoolId: 'huc',
  methodId: hucAdmissionMethods[0].id,
  methodName: hucAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateHucThptExamAdmission(profile, context) };
  },
};
