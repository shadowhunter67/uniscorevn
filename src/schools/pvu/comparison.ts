import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePvuThptExamAdmission, type PvuThptExamContext } from './evaluate';
import { pvuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PvuThptExamContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pvuComparisonAdapter: SchoolComparisonAdapter<PvuThptExamContext> = {
  schoolId: 'pvu',
  methodId: pvuAdmissionMethods[0].id,
  methodName: pvuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePvuThptExamAdmission(profile, context) };
  },
};
