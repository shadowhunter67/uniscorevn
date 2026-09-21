import { findRecentCutoffComparisons } from '../../core/cutoffComparison';
import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext, withProgramCutoffComparison } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { uteudnCutoffs2026 } from './data/cutoffs';
import { evaluateUteudnCombinedExactAdmission, evaluateUteudnThptExamAdmission } from './evaluate';
import { uteudnAdmissionMethods } from './methods';

type UteudnComparisonContext = ThresholdOnlyEvaluationContext & { programCode?: string };

function buildContext(selection: Omit<ComparisonSelection, 'id'>): UteudnComparisonContext {
  return { subjectContext: getSubjectContext(selection.context?.combinationId), programCode: selection.programId };
}

/** Có chọn ngành → nhánh exact THPT + học bạ, kèm so với điểm chuẩn 2026 của ngành; chưa chọn ngành → giữ
 * baseline chung 15-20/30. */
export const uteudnComparisonAdapter: SchoolComparisonAdapter<UteudnComparisonContext> = {
  schoolId: 'uteudn',
  methodId: uteudnAdmissionMethods[0].id,
  methodName: uteudnAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    if (!context.programCode) return { evaluation: evaluateUteudnThptExamAdmission(profile, context) };
    const evaluation = evaluateUteudnCombinedExactAdmission(profile, context);
    const programCode = context.programCode;
    return withProgramCutoffComparison({
      evaluation,
      selectedProgramId: programCode,
      missingProgramLabel: 'Chọn ngành UTE để so với đúng mốc điểm chuẩn.',
      getCutoffComparisons: () => {
        if (!evaluation.score) return undefined;
        return findRecentCutoffComparisons({
          records: uteudnCutoffs2026.filter((cutoff) => cutoff.programId === programCode),
          targetYear: evaluation.year,
          applicantScore: evaluation.score.value,
          applicantScale: evaluation.score.scale,
          selection: { programId: programCode },
        });
      },
    });
  },
};
