import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { evaluateHnueFloorExactAdmission, evaluateHnueThptExamAdmission } from './evaluate';
import { hnueAdmissionMethods } from './methods';

type HnueComparisonContext = ThresholdOnlyEvaluationContext & { programCode?: string };

function buildContext(selection: Omit<ComparisonSelection, 'id'>): HnueComparisonContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), programCode: selection.programId };
}

/** Có chọn ngành → nhánh kiểm tra điểm sàn theo ngành; chưa chọn ngành → giữ baseline chung 18-22/30. */
export const hnueComparisonAdapter: SchoolComparisonAdapter<HnueComparisonContext> = {
  schoolId: 'hnue',
  methodId: hnueAdmissionMethods[0].id,
  methodName: hnueAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateHnueFloorExactAdmission(profile, context) };
    return { evaluation: evaluateHnueThptExamAdmission(profile, context) };
  },
};
