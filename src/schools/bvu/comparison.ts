import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { BvuTranscriptEvaluationContext } from './evaluate';
import { evaluateBvuTranscriptAdmission } from './evaluate';
import { bvuAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): BvuTranscriptEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const bvuComparisonAdapter: SchoolComparisonAdapter<BvuTranscriptEvaluationContext> = {
  schoolId: 'bvu',
  methodId: bvuAdmissionMethods[0].id,
  methodName: bvuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateBvuTranscriptAdmission(profile, context) };
  },
};
