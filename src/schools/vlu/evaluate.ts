import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { sumCombinationAveragesAcrossSemesters, TRANSCRIPT_SEMESTER_LABELS } from '../../core/transcriptSemesters';
import { vluAdmissionMethods } from './methods';
import { vluKnowledgeGaps } from './knowledgeGaps';
import { vluTranscriptFormulaEvidence, vluTranscriptThresholdEvidence } from './evidence';
import {
  checkVluThptExamThreshold,
  checkVluTranscriptOrCombinedEligibility,
  checkVluTranscriptThreshold,
  type VluAcademicRank,
  type VluThresholdGroup,
} from './eligibility';
import { inferVluThresholdGroup } from './programs';

export interface VluSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

/**
 * Nhóm ngưỡng dùng cho một lần đánh giá. Thứ tự ưu tiên: `thresholdGroup` caller truyền thẳng (giữ
 * nguyên hành vi cũ, không breaking) → suy từ `programId` qua danh mục 64 ngành (`programs.ts`) →
 * `'standard'`.
 *
 * Vì sao vẫn fallback `'standard'` ở ĐÂY (trong khi `inferVluThresholdGroup` cố tình trả `undefined`
 * cho mã lạ): caller cũ gọi hàm này KHÔNG truyền gì cả và trước batch này cũng nhận `'standard'` —
 * đổi thành lỗi sẽ là breaking change ngoài phạm vi. Mã ngành SAI thì khác: nếu caller có truyền
 * `programId` mà không tra được, `resolveThresholdGroup` báo lại qua `unknownProgramId` để evaluator
 * gắn `missingRequirement`, KHÔNG âm thầm hạ ngưỡng.
 */
function resolveThresholdGroup(context: { thresholdGroup?: VluThresholdGroup; programId?: string }): {
  group: VluThresholdGroup;
  unknownProgramId: boolean;
} {
  if (context.thresholdGroup) return { group: context.thresholdGroup, unknownProgramId: false };
  if (context.programId === undefined) return { group: 'standard', unknownProgramId: false };
  const inferred = inferVluThresholdGroup(context.programId);
  return inferred ? { group: inferred, unknownProgramId: false } : { group: 'standard', unknownProgramId: true };
}

function sumSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
  let total = 0;
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}

export interface VluThptExamEvaluationContext {
  thresholdGroup?: VluThresholdGroup;
  /** Mã ngành trong danh mục 64 ngành Chương trình tiêu chuẩn (`programs.ts`) — dùng để tự suy
   * `thresholdGroup` khi caller không truyền thẳng. */
  programId?: string;
  subjectContext?: VluSubjectContext;
}

/** Dùng chung cho cả 3 phương thức khi `programId` không tra được trong danh mục đã import. */
function unknownProgramRequirement(programId: string | undefined): MissingRequirement {
  return {
    kind: 'school-context',
    code: 'vlu-program-unknown',
    label: `Mã ngành "${programId}" không có trong danh mục 64 ngành Chương trình tiêu chuẩn đã import — có thể là ngành Chương trình Global Elite (ngưỡng cao hơn hẳn, chưa import) hoặc mã sai. Đang tạm áp ngưỡng nhóm tiêu chuẩn.`,
  };
}

/** Phương thức 1: Xét kết quả thi TN THPT 2026. */
export function evaluateVluThptExamAdmission(profile: ApplicantProfile, context: VluThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = vluAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const { group, unknownProgramId } = resolveThresholdGroup(context);
  if (unknownProgramId) missingRequirements.push(unknownProgramRequirement(context.programId));

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `vlu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp VLU.`,
        }))
      );
    }
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'vlu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển VLU.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];
  if (total30 !== undefined) {
    const result = checkVluThptExamThreshold(total30, group);
    status = result.pass ? 'eligible' : 'ineligible';
    reasons.push(result.requiredText);
    explanation.push({ id: 'vlu-thpt-exam-threshold', label: 'Ngưỡng đảm bảo chất lượng VLU 2026 (Phương thức 1)', output: total30, scale: 30, formula: result.requiredText });
  }

  return {
    schoolId: 'vlu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng VLU.'] },
    missingInputs,
    missingRules: (method.knowledgeGaps ?? vluKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? vluKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

export interface VluTranscriptEvaluationContext {
  thresholdGroup?: VluThresholdGroup;
  /** Mã ngành trong danh mục 64 ngành Chương trình tiêu chuẩn (`programs.ts`) — dùng để tự suy
   * `thresholdGroup` khi caller không truyền thẳng. */
  programId?: string;
  academicRank12?: VluAcademicRank;
  /** Tổng 3 môn thi TN THPT theo tổ hợp xét tuyển (dùng làm điều kiện thay thế cho khối Sức khỏe/Luật). */
  subjectContext?: VluSubjectContext;
  /** Điểm xét tốt nghiệp THPT (thang 10), nếu người dùng tự cung cấp — không có consumer field
   * tương ứng trong `ApplicantProfile` hiện tại nên nhận trực tiếp từ context. */
  graduationScore10?: number;
}

/**
 * Phương thức 2 (học bạ, mã dùng chung): Xét kết quả học tập cấp THPT. Method 3 (kết hợp) dùng
 * chung hàm này ở phần điều kiện bổ sung (giống nhau theo nguồn — chỉ khác nguồn điểm 80% còn
 * lại chưa quy đổi được, xem `vlu-combined-method-conversion-table-unpublished`).
 *
 * Batch "6 học kỳ": ĐIỂM HỌC BẠ theo tổ hợp nay tính được thật (TB 6 học kỳ × 3 môn, đọc từ
 * `transcript.bySemester`) và hiện trong `explanation`. NHƯNG kết quả vẫn `confidence: 'partial'`,
 * KHÔNG trả `score` — vì 2 gap KHÁC vẫn mở và đều score-affecting: danh mục ngành có "môn thi chính
 * nhân hệ số 2" chưa công bố (`vlu-primary-subject-list-unpublished`) và bảng điểm ưu tiên/điểm cộng
 * chưa tìm được (`vlu-priority-bonus-table-not-found`). Đưa ra một con số gọi là "điểm xét tuyển"
 * khi chưa biết ngành nào nhân hệ số 2 sẽ là sai với đúng những ngành đó.
 */
function evaluateVluTranscriptFamilyAdmission(method: (typeof vluAdmissionMethods)[number], profile: ApplicantProfile, context: VluTranscriptEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const { group, unknownProgramId } = resolveThresholdGroup(context);
  if (unknownProgramId) missingRequirements.push(unknownProgramRequirement(context.programId));

  let thptExamTotal30: number | undefined;
  if (context.subjectContext) {
    const { total30, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    thptExamTotal30 = total30;
    if (missingSubjects.length > 0 && group !== 'standard') {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT để đối chiếu điều kiện thay thế (chỉ cần cho khối Sức khỏe/Luật).');
    }
  }

  // Điểm học bạ theo công thức chính thức: TB 6 học kỳ của 3 môn tổ hợp (`transcript.bySemester`).
  // KHÔNG lấy TB cả năm (`grade10/11/12`) thay thế — 2 cách tính ra số khác nhau.
  let transcriptTotal30: number | undefined;
  if (context.subjectContext) {
    const transcriptTotal = sumCombinationAveragesAcrossSemesters(profile.transcript?.bySemester, context.subjectContext.subjects);
    if (transcriptTotal.total30 === undefined) {
      missingInputs.push('Chưa đủ điểm học bạ TỪNG HỌC KỲ (6 học kỳ lớp 10/11/12) cho 3 môn tổ hợp — điểm trung bình cả năm không thay thế được.');
      for (const { subjectId, missingSemesters } of transcriptTotal.missingBySubject) {
        missingRequirements.push({
          kind: 'profile-input',
          code: `vlu-transcript-semester-${subjectId}`,
          label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} còn thiếu ${missingSemesters.length}/6 học kỳ (${missingSemesters.map((key) => TRANSCRIPT_SEMESTER_LABELS[key]).join(', ')}).`,
        });
      }
    } else {
      transcriptTotal30 = transcriptTotal.total30;
      for (const { subjectId, average } of transcriptTotal.subjectAverages ?? []) {
        explanation.push({
          id: `${method.id}-subject-average-${subjectId}`,
          label: `TB 6 học kỳ môn ${SUBJECT_LABELS[subjectId]}`,
          output: average,
          scale: 10,
          formula: '(HK1 lớp 10 + HK2 lớp 10 + HK1 lớp 11 + HK2 lớp 11 + HK1 lớp 12 + HK2 lớp 12) / 6',
          evidence: vluTranscriptFormulaEvidence.evidence,
        });
      }
      explanation.push({
        id: `${method.id}-transcript-total`,
        label: 'Điểm học bạ theo tổ hợp (tổng TB 6 học kỳ của 3 môn)',
        output: transcriptTotal.total30,
        scale: 30,
        formula: vluTranscriptFormulaEvidence.value.description,
        evidence: vluTranscriptFormulaEvidence.evidence,
      });
    }
  }

  if (group !== 'standard' && context.academicRank12 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vlu-academic-rank-12', label: 'Xếp loại học lực lớp 12 (khá/giỏi).' });
  }
  if (group !== 'standard' && thptExamTotal30 === undefined && context.graduationScore10 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'vlu-transcript-alt-score', label: 'Tổng điểm 3 môn thi TN THPT hoặc điểm xét tốt nghiệp THPT (điều kiện thay thế).' });
  }

  const result = checkVluTranscriptOrCombinedEligibility({
    group,
    academicRank12: context.academicRank12,
    thptExamTotal30,
    graduationScore10: context.graduationScore10,
  });

  // Điểm sàn nhận hồ sơ tính TRÊN CHÍNH điểm học bạ (18/20/23/22/19 theo nhóm ngành) — dữ liệu mới
  // đọc được 2026-09-08 từ ảnh bảng điểm sàn. Trước batch này nhóm `standard` bị coi là "không có
  // điều kiện bổ sung nào" ở phương thức học bạ, tức BỎ SÓT một ngưỡng thật.
  const transcriptThreshold = checkVluTranscriptThreshold(transcriptTotal30, group);
  if (transcriptThreshold.known) {
    explanation.push({
      id: `${method.id}-transcript-threshold`,
      label: 'Điểm sàn nhận hồ sơ xét học bạ',
      output: transcriptTotal30 ?? 0,
      scale: 30,
      formula: transcriptThreshold.requiredText,
      evidence: vluTranscriptThresholdEvidence.evidence,
    });
  }

  const hasEnoughInfo = group === 'standard' || (context.academicRank12 !== undefined && (thptExamTotal30 !== undefined || context.graduationScore10 !== undefined));
  const status: 'eligible' | 'ineligible' | 'unknown' =
    transcriptThreshold.known && !transcriptThreshold.pass ? 'ineligible' : hasEnoughInfo ? (result.pass ? 'eligible' : 'ineligible') : 'unknown';
  explanation.push({ id: `${method.id}-threshold`, label: `Ngưỡng đảm bảo chất lượng VLU 2026 (${method.name})`, output: thptExamTotal30 ?? 0, scale: 30, formula: result.requiredText });

  return {
    schoolId: 'vlu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: [transcriptThreshold.requiredText, result.requiredText] },
    missingInputs,
    missingRules: (method.knowledgeGaps ?? vluKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? vluKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [...vluTranscriptFormulaEvidence.evidence],
  };
}

/** Phương thức 2: Xét kết quả học tập cấp THPT (học bạ). */
export function evaluateVluTranscriptAdmission(profile: ApplicantProfile, context: VluTranscriptEvaluationContext = {}): AdmissionEvaluation {
  return evaluateVluTranscriptFamilyAdmission(vluAdmissionMethods[1], profile, context);
}

/** Phương thức 3: Xét tuyển kết hợp học bạ THPT với ĐGNL/ĐGTD/chứng chỉ quốc tế. */
export function evaluateVluCombinedAdmission(profile: ApplicantProfile, context: VluTranscriptEvaluationContext = {}): AdmissionEvaluation {
  return evaluateVluTranscriptFamilyAdmission(vluAdmissionMethods[2], profile, context);
}
