import type { ApplicantProfile } from '../core/applicantProfile';
import type { AdmissionEvaluation } from '../core/admissionEvaluation';
import { evaluateComparisonSelections } from '../compare/evaluateApplicantAcrossSchools';
import type { ComparisonSelection } from '../compare/comparisonSelection';
import { assessCompetitiveness, type CompetitivenessAssessment } from '../evaluation/competitiveness/competitiveness';
import { schoolRegistry } from '../schools';
import type { FieldId } from '../taxonomy/fields';
import { getMajorsForSchoolField, getSchoolIdsForField } from '../taxonomy/taxonomyQueries';

export interface FieldMatch {
  schoolId: string;
  schoolName: string;
  shortName: string;
  programId: string;
  programName: string;
  evaluation: AdmissionEvaluation;
  competitiveness: CompetitivenessAssessment;
}

export interface FieldRecommendationResult {
  /** Trường/ngành có band xác định (không phải insufficient-data), nhóm theo mức cạnh tranh. */
  groups: {
    thuSuc: FieldMatch[];
    vuaSuc: FieldMatch[];
    anToanHon: FieldMatch[];
  };
  /** LUÔN hiển thị, không ẩn — trường/ngành thuộc field nhưng chưa đủ dữ liệu để đánh giá cạnh
   * tranh (thiếu điểm chuẩn comparable, hoặc hồ sơ chưa đủ input cho phương thức của trường đó). */
  insufficientData: FieldMatch[];
}

/**
 * "Với điểm này, học {field} ở đâu?" — CHỈ chạy trên các trường đã có dữ liệu ngành thật
 * (`getSchoolIdsForField`, hiện là 11 trường trong `programCatalogBySchool`) — không đoán/mở rộng
 * sang trường chưa có taxonomy. Dùng lại đúng orchestration generic đã có cho `/compare`
 * (`evaluateComparisonSelections`) — không tự viết lại logic per-school.
 */
export function recommendSchoolsForField(profile: ApplicantProfile, fieldId: FieldId): FieldRecommendationResult {
  const schoolIds = getSchoolIdsForField(fieldId);
  const selections: ComparisonSelection[] = [];
  for (const schoolId of schoolIds) {
    const majors = getMajorsForSchoolField(schoolId, fieldId);
    for (const major of majors) {
      selections.push({ id: `${schoolId}:${major.programId}`, schoolId, programId: major.programId, context: {} });
    }
  }

  const summaries = evaluateComparisonSelections(profile, selections);
  const programNameById = new Map(selections.map((selection) => [selection.id, selection]));

  const matches: FieldMatch[] = summaries.map((summary) => {
    const selection = programNameById.get(summary.selectionId ?? '');
    const school = schoolRegistry[summary.schoolId];
    const majors = getMajorsForSchoolField(summary.schoolId, fieldId);
    const program = majors.find((major) => major.programId === selection?.programId);
    const competitiveness = assessCompetitiveness({
      evaluation: summary.evaluation,
      comparisons: summary.cutoffComparisons ?? [],
      currentYear: summary.evaluation.year,
    });
    return {
      schoolId: summary.schoolId,
      schoolName: school?.name ?? summary.schoolName,
      shortName: school?.shortName ?? summary.shortName,
      programId: selection?.programId ?? '',
      programName: program?.name ?? '',
      evaluation: summary.evaluation,
      competitiveness,
    };
  });

  const groups: FieldRecommendationResult['groups'] = { thuSuc: [], vuaSuc: [], anToanHon: [] };
  const insufficientData: FieldMatch[] = [];

  for (const match of matches) {
    switch (match.competitiveness.band) {
      case 'low':
      case 'hard':
        groups.thuSuc.push(match);
        break;
      case 'borderline':
      case 'competitive':
        groups.vuaSuc.push(match);
        break;
      case 'safer':
        groups.anToanHon.push(match);
        break;
      case 'insufficient-data':
        insufficientData.push(match);
        break;
    }
  }

  return { groups, insufficientData };
}
