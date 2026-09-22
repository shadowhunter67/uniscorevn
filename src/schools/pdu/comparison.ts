import type { SchoolComparisonAdapter, SchoolComparisonResult } from '../../compare/schoolComparisonAdapter';
import { getSubjectContext } from '../../compare/schoolComparisonAdapter';
import type { ComparisonSelection } from '../../compare/comparisonSelection';
import { evaluatePduThptExamAdmission } from './evaluate';
import { PDU_FIELD_THRESHOLDS_2026 } from './thresholds';
import { pduAdmissionMethods } from './methods';

interface PduComparisonContext {
  fieldCode?: string;
  subjectContext?: ReturnType<typeof getSubjectContext>;
}

function buildContext(selection: Omit<ComparisonSelection, 'id'>): PduComparisonContext {
  const fieldCode = selection.programId ?? PDU_FIELD_THRESHOLDS_2026[0]?.code;
  return { fieldCode, subjectContext: getSubjectContext(selection.context?.combinationId) };
}

export const pduComparisonAdapter: SchoolComparisonAdapter<PduComparisonContext> = {
  schoolId: 'pdu',
  methodId: pduAdmissionMethods[0].id,
  methodName: pduAdmissionMethods[0].name,
  buildContext,
  evaluate(profile, context): SchoolComparisonResult {
    return { evaluation: evaluatePduThptExamAdmission(profile, context) };
  },
};
