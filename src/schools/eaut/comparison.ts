import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { EautTranscriptEvaluationContext } from './evaluate';
import { evaluateEautTranscriptAdmission } from './evaluate';
import { eautAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): EautTranscriptEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const eautComparisonAdapter: SchoolComparisonAdapter<EautTranscriptEvaluationContext> = {
  schoolId: 'eaut',
  methodId: eautAdmissionMethods[0].id,
  methodName: eautAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateEautTranscriptAdmission(profile, context) };
  },
};
