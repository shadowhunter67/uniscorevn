import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateHuitThptExamAdmission, evaluateHuitThptExamProgramExactAdmission, type HuitProgramEvaluationContext, type HuitThptExamEvaluationContext } from './evaluate';
import { huitAdmissionMethods } from './methods';

type HuitComparisonContext = HuitThptExamEvaluationContext & HuitProgramEvaluationContext;

/** Có chọn ngành → nhánh kiểm tra ngưỡng thi TN THPT theo ngành (39 ngành); chưa chọn ngành → baseline nhóm
 * `standard` như trước. HUIT chưa có điểm chuẩn để so ở `/compare`. */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): HuitComparisonContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), thresholdGroup: 'standard', programCode: selection.programId };
}

export const huitComparisonAdapter: SchoolComparisonAdapter<HuitComparisonContext> = {
  schoolId: 'huit',
  methodId: huitAdmissionMethods[0].id,
  methodName: huitAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateHuitThptExamProgramExactAdmission(profile, context) };
    return { evaluation: evaluateHuitThptExamAdmission(profile, context) };
  },
};
