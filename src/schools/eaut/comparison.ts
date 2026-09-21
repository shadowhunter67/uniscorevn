import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { EautProgramEvaluationContext } from './evaluate';
import { evaluateEautTranscriptAdmission, evaluateEautTranscriptExactAdmission } from './evaluate';
import { eautAdmissionMethods } from './methods';

function buildContext(selection: Omit<ComparisonSelection, 'id'>): EautProgramEvaluationContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), programCode: selection.programId };
}

/** Có chọn ngành → nhánh exact theo ngành (học bạ 6 học kỳ); chưa chọn ngành → giữ baseline chung. */
export const eautComparisonAdapter: SchoolComparisonAdapter<EautProgramEvaluationContext> = {
  schoolId: 'eaut',
  methodId: eautAdmissionMethods[0].id,
  methodName: eautAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateEautTranscriptExactAdmission(profile, context) };
    return { evaluation: evaluateEautTranscriptAdmission(profile, context) };
  },
};
