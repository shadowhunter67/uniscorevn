import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluateDumtpThptExamAdmission } from './evaluate';
import { DUMTP_FIELD_THRESHOLDS_2025 } from './thresholds';
import { dumtpAdmissionMethods } from './methods';

interface DumtpComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): DumtpComparisonContext {
  const fieldCode = selection.programId ?? DUMTP_FIELD_THRESHOLDS_2025[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const dumtpComparisonAdapter: SchoolComparisonAdapter<DumtpComparisonContext> = {
  schoolId: 'dumtp',
  methodId: dumtpAdmissionMethods[0].id,
  methodName: dumtpAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluateDumtpThptExamAdmission(profile, context) };
  },
};
