import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateUteudnCombinedExactAdmission, evaluateUteudnThptExamAdmission } from './evaluate';
import { uteudnAdmissionMethods } from './methods';

type UteudnComparisonContext = ThresholdOnlyEvaluationContext & { programCode?: string };

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UteudnComparisonContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), programCode: selection.programId };
}

/** Có chọn ngành → nhánh exact THPT + học bạ; chưa chọn ngành → giữ baseline chung 15-20/30. */
export const uteudnComparisonAdapter: SchoolComparisonAdapter<UteudnComparisonContext> = {
  schoolId: 'uteudn',
  methodId: uteudnAdmissionMethods[0].id,
  methodName: uteudnAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateUteudnCombinedExactAdmission(profile, context) };
    return { evaluation: evaluateUteudnThptExamAdmission(profile, context) };
  },
};
