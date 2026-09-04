import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateTrungVuongThptExamAdmission } from './evaluate';
import { TRUNGVUONG_FIELD_THRESHOLDS_2025 } from './thresholds';
import { trungvuongAdmissionMethods } from './methods';

interface TrungVuongComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): TrungVuongComparisonContext {
  const fieldCode = selection.programId ?? TRUNGVUONG_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const trungvuongComparisonAdapter: SchoolComparisonAdapter<TrungVuongComparisonContext> = {
  schoolId: 'trungvuong',
  methodId: trungvuongAdmissionMethods[0].id,
  methodName: trungvuongAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateTrungVuongThptExamAdmission(profile, context) };
  },
};
