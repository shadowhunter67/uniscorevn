import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { BVU_TRANSCRIPT_THRESHOLD } from './eligibility';
import { bvuAdmissionMethods } from './methods';
import { BVU_THPT_GROUP_LABELS, BVU_THPT_THRESHOLD_30, type BvuThptProgramGroup } from './thresholds';
import { bvuThptExactFormulaEvidence } from './evidence';

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
        evidence: [{ sourceId: 'bvu-diem-trung-tuyen-2026', location: 'Bảng ngưỡng theo nhóm ngành (học bạ), bài đăng 10/08/2026', verification: 'verified', effectiveYear: 2026 }],
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
    evidence: [{ sourceId: 'bvu-diem-trung-tuyen-2026', location: 'Bảng ngưỡng theo nhóm ngành (học bạ), bài đăng 10/08/2026', verification: 'verified', effectiveYear: 2026 }],
  };
}

const BVU_EXACT_METHOD = bvuAdmissionMethods[1];

export interface BvuThptExamEvaluationContext {
  group?: BvuThptProgramGroup;
  subjectContext?: BvuSubjectContext;
}

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: round2(total), missingSubjects };
}

/**
 * BVU 2026 — nhánh exact, phương thức xét điểm thi TN THPT (khác phương thức học bạ ở trên). Bài
 * đăng 10/08/2026 xác nhận rõ ngưỡng theo nhóm ngành và KHÔNG cộng điểm ưu tiên khu vực/đối tượng
 * — model đơn giản: tổng thô 3 môn so trực tiếp với ngưỡng, không priority/bonus.
 */
export function evaluateBvuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: BvuThptExamEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: BvuThptProgramGroup = context.group ?? 'standard';

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'bvu',
    year: BVU_EXACT_METHOD.year,
    methodId: BVU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'bvu-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển BVU.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển BVU.');
  }

  const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `bvu-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp BVU.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = total30 as number;
  const threshold = BVU_THPT_THRESHOLD_30[group];
  const groupLabel = BVU_THPT_GROUP_LABELS[group];
  const eligible = raw30 >= threshold;

  const reasons = [
    `Ngưỡng đầu vào BVU 2026 (thi TN THPT) - ${groupLabel}: tổng điểm 3 môn (KHÔNG cộng điểm ưu tiên khu vực/đối tượng) ≥ ${threshold}/30.`,
    `Tổng điểm 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng ${groupLabel}.`,
  ];

  explanation.push({
    id: 'bvu-exact-raw',
    label: 'Tổng điểm 3 môn thi (dùng trực tiếp để so ngưỡng, không cộng ưu tiên)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: bvuThptExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'bvu-exact-threshold',
    label: `Ngưỡng ${groupLabel}`,
    output: threshold,
    scale: 30,
    formula: `Ngưỡng đầu vào ${groupLabel} theo bảng công bố 10/08/2026`,
    evidence: bvuThptExactFormulaEvidence.evidence,
  });

  return {
    schoolId: 'bvu',
    year: BVU_EXACT_METHOD.year,
    methodId: BVU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: bvuThptExactFormulaEvidence.evidence,
  };
}
