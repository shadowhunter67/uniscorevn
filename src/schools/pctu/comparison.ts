import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePctuThptExamExactAdmission } from './evaluate';
import { PCTU_FIELD_THRESHOLDS_2025 } from './thresholds';
import { pctuAdmissionMethods } from './methods';

interface PctuComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PctuComparisonContext {
  const fieldCode = selection.programId ?? PCTU_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pctuComparisonAdapter: SchoolComparisonAdapter<PctuComparisonContext> = {
  schoolId: 'pctu',
  methodId: pctuAdmissionMethods[0].id,
  methodName: pctuAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePctuThptExamExactAdmission(profile, context) };
  },
};
