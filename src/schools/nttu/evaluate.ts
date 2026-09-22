import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { nttuAdmissionMethods } from './methods';
import { nttuKnowledgeGaps } from './knowledgeGaps';
import { checkNttuTranscriptEligibility, type NttuAcademicRank, type NttuThresholdGroup } from './eligibility';
import { NTTU_THPT_EXAM_THRESHOLD_30, NTTU_THRESHOLD_GROUP_LABELS } from './eligibility';
import { nttuThptExamThresholdEvidence } from './evidence';

export interface NttuTranscriptEvaluationContext {
  thresholdGroup?: NttuThresholdGroup;
  /** Tổng điểm học bạ theo tổ hợp xét tuyển (thang 30) — người dùng tự cung cấp vì nguồn không nêu
   * rõ công thức tính (xem `nttu-transcript-methodology-unpublished`). */
  transcriptTotal30?: number;
  academicRank12?: NttuAcademicRank;
  /** Tổng 3 môn thi TN THPT (điều kiện thay thế cho nhóm Sức khỏe/Luật). */
  thptExamTotal30?: number;
  graduationScore10?: number;
}

/** Phương thức học bạ (2026). */
export function evaluateNttuTranscriptAdmission(profile: ApplicantProfile, context: NttuTranscriptEvaluationContext = {}): AdmissionEvaluation {
  void profile;
  const method = nttuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: NttuThresholdGroup = context.thresholdGroup ?? 'standard';
  const needsExtra = group !== 'standard';

  if (context.transcriptTotal30 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'nttu-transcript-total-score', label: 'Tổng điểm học bạ theo tổ hợp xét tuyển (thang 30).' });
  }
  if (needsExtra && context.academicRank12 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'nttu-academic-rank-12', label: 'Xếp loại học lực lớp 12 (khá/tốt).' });
  }
  if (needsExtra && context.thptExamTotal30 === undefined && context.graduationScore10 === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'nttu-transcript-alt-score', label: 'Tổng điểm 3 môn thi TN THPT hoặc điểm xét tốt nghiệp THPT (điều kiện thay thế).' });
  }

  const result = checkNttuTranscriptEligibility({
    group,
    transcriptTotal30: context.transcriptTotal30,
    academicRank12: context.academicRank12,
    thptExamTotal30: context.thptExamTotal30,
    graduationScore10: context.graduationScore10,
  });

  const hasEnoughInfo =
    context.transcriptTotal30 !== undefined &&
    (!needsExtra || (context.academicRank12 !== undefined && (context.thptExamTotal30 !== undefined || context.graduationScore10 !== undefined)));
  const status: 'eligible' | 'ineligible' | 'unknown' = hasEnoughInfo ? (result.pass ? 'eligible' : 'ineligible') : 'unknown';

  explanation.push({
    id: `${method.id}-threshold`,
    label: `Ngưỡng điểm sàn NTTU 2026 (${method.name})`,
    output: context.transcriptTotal30 ?? 0,
    scale: 30,
    formula: result.requiredText,
  });

  return {
    schoolId: 'nttu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: [result.requiredText] },
    missingInputs: [],
    missingRules: (method.knowledgeGaps ?? nttuKnowledgeGaps).map((gap) => gap.label),
    missingRequirements: [...missingRequirements, ...(method.knowledgeGaps ?? nttuKnowledgeGaps).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }))],
    explanation,
    evidence: [],
  };
}

const NTTU_EXACT_METHOD = nttuAdmissionMethods[1];

export interface NttuThptExamExactEvaluationContext {
  group?: NttuThresholdGroup;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** NTTU 2026 — thi TN THPT: đủ điều kiện ⟺ TỔNG THÔ 3 môn ≥ điểm chuẩn nhóm ngành. Nguồn không có
 * anchor điểm ưu tiên/điểm cộng — KHÔNG hiển thị điểm ưu tiên kể cả dạng tham khảo (khác precedent
 * QUI/HPU/DNTU nơi nguồn silent nhưng vẫn có context liên quan điểm số). */
export function evaluateNttuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: NttuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'nttu',
    year: NTTU_EXACT_METHOD.year,
    methodId: NTTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (context.group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'nttu-exact-program-group', label: 'Chọn nhóm ngành NTTU.' });
    return partial('Cần chọn nhóm ngành NTTU để áp điểm chuẩn.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'nttu-exact-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển NTTU.' });
    return partial('Cần chọn tổ hợp 3 môn để tính điểm xét NTTU.');
  }

  let total = 0;
  const missing: SubjectId[] = [];
  for (const s of context.subjectContext.subjects) {
    const v = profile.thpt?.scores?.[s];
    if (v === undefined) missing.push(s);
    else total += v;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((s) => ({ kind: 'profile-input' as const, code: `nttu-exact-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp NTTU.` })));
    return partial('Cần đủ điểm 3 môn thi TN THPT để tính điểm xét NTTU.');
  }

  const raw30 = round2(total);
  const threshold = NTTU_THPT_EXAM_THRESHOLD_30[context.group];
  const eligible = raw30 >= threshold;

  const reasons = [
    `Điểm chuẩn NTTU 2026 (thi TN THPT, ${NTTU_THRESHOLD_GROUP_LABELS[context.group]}): tổng thô 3 môn ≥ ${threshold}/30.`,
    `Tổng thô 3 môn = ${raw30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} điểm chuẩn.`,
  ];

  explanation.push({
    id: 'nttu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: context.subjectContext.subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: nttuThptExamThresholdEvidence.evidence,
  });

  return {
    schoolId: 'nttu',
    year: NTTU_EXACT_METHOD.year,
    methodId: NTTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: raw30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...nttuThptExamThresholdEvidence.evidence],
  };
}
