import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateEiuProgramExactAdmission, evaluateEiuThptExamAdmission, type EiuProgramExactContext, type EiuThptExamEvaluationContext } from './evaluate';
import { eiuAdmissionMethods } from './methods';

type EiuComparisonContext = EiuThptExamEvaluationContext & EiuProgramExactContext;

/** Có chọn ngành → nhánh exact theo ngành (thi TN THPT, hoặc học bạ 6 học kỳ nếu selection chọn phương thức học bạ);
 * chưa chọn ngành → giữ baseline thi TN THPT `program: 'standard'` như trước. EIU chưa có điểm chuẩn để so ở `/compare`. */
function buildContext(selection: Omit<ComparisonSelection, 'id'>): EiuComparisonContext {
  return {
    subjectContext: getSubjectContext(selection.context?.combinationId),
    program: 'standard',
    programCode: selection.programId,
    pathway: selection.methodId === 'eiu-transcript-2026' ? 'transcript' : 'thpt',
  };
}

export const eiuComparisonAdapter: SchoolComparisonAdapter<EiuComparisonContext> = {
  schoolId: 'eiu',
  methodId: eiuAdmissionMethods[0].id,
  methodName: eiuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (context.programCode) return { evaluation: evaluateEiuProgramExactAdmission(profile, context) };
    return { evaluation: evaluateEiuThptExamAdmission(profile, context) };
  },
};
