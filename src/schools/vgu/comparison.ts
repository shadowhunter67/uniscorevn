import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateVguThptExamAdmission, evaluateVguThptExamExactAdmission } from './evaluate';
import { vguAdmissionMethods } from './methods';

type VguComparisonContext = ThresholdOnlyEvaluationContext & { programCode?: string };

function buildContext(selection: Omit<ComparisonSelection, 'id'>): VguComparisonContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), programCode: selection.programId };
}

/** Có chọn ngành → nhánh exact PT5 (điểm sàn theo ngành); chưa chọn ngành → giữ baseline chung 17-22/30. */
export const vguComparisonAdapter: SchoolComparisonAdapter<VguComparisonContext> = {
  schoolId: 'vgu',
  methodId: vguAdmissionMethods[0].id,
  methodName: vguAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateVguThptExamExactAdmission(profile, context) };
    return { evaluation: evaluateVguThptExamAdmission(profile, context) };
  },
};
