import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { CmcuThptExamEvaluationContext } from './evaluate';
import { evaluateCmcuThptExamAdmission } from './evaluate';
import { cmcuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): CmcuThptExamEvaluationContext {
  const combo = getSubjectContext(selection.context?.combinationId);
  if (!combo || combo.subjects.length < 3) return {};
  const [mainSubjectId, other1, other2] = combo.subjects;
  return { mainSubjectId, otherSubjectIds: [other1, other2] };
}

export const cmcuComparisonAdapter: SchoolComparisonAdapter<CmcuThptExamEvaluationContext> = {
  schoolId: 'cmcu',
  methodId: cmcuAdmissionMethods[0].id,
  methodName: cmcuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateCmcuThptExamAdmission(profile, context) };
  },
};
