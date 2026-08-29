import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { PhenikaaThptExamEvaluationContext } from './evaluate';
import { evaluatePhenikaaThptExamAdmission } from './evaluate';
import { phenikaaAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PhenikaaThptExamEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const phenikaaComparisonAdapter: SchoolComparisonAdapter<PhenikaaThptExamEvaluationContext> = {
  schoolId: 'phenikaa',
  methodId: phenikaaAdmissionMethods[0].id,
  methodName: phenikaaAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePhenikaaThptExamAdmission(profile, context) };
  },
};
