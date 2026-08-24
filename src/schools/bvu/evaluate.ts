import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { BVU_TRANSCRIPT_THRESHOLD } from './eligibility';
import { bvuAdmissionMethods } from './methods';

export interface BvuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

export interface BvuTranscriptEvaluationContext {
  subjectContext?: BvuSubjectContext;
}

/** Tong diem trung binh lop 12 cua 3 mon trong to hop (thang 30) — chi tinh khi DU ca 3 mon lop 12,
 * khong suy doan mon thieu. BVU cong bo phuong phap nay cho phuong thuc hoc ba 2026 (khac phuong
 * phap trung binh 3 nam ma mot so truong khac dung, vd TDMU). */
function sumGrade12Total(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.transcript?.grade12?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

export function evaluateBvuTranscriptAdmission(profile: ApplicantProfile, context: BvuTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const method = bvuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'bvu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển BVU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào BVU.');
  } else {
    const { total30, missingSubjects } = sumGrade12Total(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm học bạ lớp 12 trong tổ hợp đã chọn cho BVU.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `bvu-transcript-${subjectId}`,
          label: `Điểm học bạ lớp 12 môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp BVU.`,
        }))
      );
      reasons.push('Cần đủ điểm học bạ lớp 12 của 3 môn trong tổ hợp để kiểm tra ngưỡng BVU.');
    }

    if (total30 !== undefined) {
      explanation.push({
        id: 'bvu-transcript-threshold',
        label: 'Ngưỡng đầu vào BVU 2026 (học bạ)',
        output: total30,
        scale: 30,
        formula: BVU_TRANSCRIPT_THRESHOLD.requiredText,
        evidence: [{ sourceId: 'bvu-admission-2026', location: 'Ngưỡng điểm sàn học bạ 2026', verification: 'verified', effectiveYear: 2026 }],
      });

      if (total30 < BVU_TRANSCRIPT_THRESHOLD.min30) {
        status = 'ineligible';
        reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng thấp nhất đã công bố (${BVU_TRANSCRIPT_THRESHOLD.min30}/30).`);
      } else {
        status = 'unknown';
        reasons.push(
          `Tổng ${total30}/30 đạt từ ngưỡng thấp nhất, nhưng ngưỡng thay đổi theo ngành (${BVU_TRANSCRIPT_THRESHOLD.requiredText}); cần chọn/import bảng ngành để kết luận chắc chắn.`
        );
      }
    }
  }

  const gaps = method.knowledgeGaps ?? [];
  return {
    schoolId: 'bvu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm học bạ lớp 12 để kiểm tra ngưỡng BVU.'] },
    missingInputs,
    missingRules: gaps.map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...gaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [{ sourceId: 'bvu-admission-2026', location: 'Ngưỡng điểm sàn học bạ 2026', verification: 'verified', effectiveYear: 2026 }],
  };
}
