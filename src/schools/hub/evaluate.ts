import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { hubAdmissionMethods } from './methods';
import { hubKnowledgeGaps } from './knowledgeGaps';
import {
  checkHubStandardThreshold,
  checkHubLawThptExamThreshold,
  checkHubEliteIeltsRequirement,
  checkHubStandardComprehensiveVsat2026Eligibility,
  checkHubLawComprehensiveVsat2026Eligibility,
  type HubAcademicRank,
  type HubProgramGroup,
} from './eligibility';

export interface HubSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
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

function buildGapExtras(method: (typeof hubAdmissionMethods)[number]): { missingRules: string[]; missingRequirements: MissingRequirement[] } {
  const gaps = method.knowledgeGaps ?? hubKnowledgeGaps;
  return {
    missingRules: gaps.map((gap) => gap.label),
    missingRequirements: gaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };
}

export interface HubThptExamEvaluationContext {
  group?: HubProgramGroup;
  subjectContext?: HubSubjectContext;
  /** Chỉ dùng cho nhóm `law` — mã khu vực ưu tiên (vd 'KV3'). */
  priorityZone?: string;
  /** Chỉ dùng cho nhóm `finance-banking-elite` — điểm IELTS thí sinh cung cấp. */
  ielts?: number;
}

/** Phương thức 1: Xét kết quả thi TN THPT 2026. */
export function evaluateHubThptExamAdmission(profile: ApplicantProfile, context: HubThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = hubAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HubProgramGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras(method);

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `hub-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp HUB.`,
        }))
      );
    }
  } else {
    missingRequirements.push({ kind: 'school-context', code: 'hub-subject-combination', label: 'Chọn tổ hợp môn xét tuyển HUB.' });
  }

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (group === 'law') {
    if (context.priorityZone === undefined) {
      missingRequirements.push({ kind: 'profile-input', code: 'hub-priority-zone', label: 'Khu vực ưu tiên tuyển sinh (ngưỡng khối Luật chỉ xác định được cho khu vực 3).' });
    }
    if (total30 !== undefined) {
      const result = checkHubLawThptExamThreshold({
        totalScore30: total30,
        combinationId: context.subjectContext?.combinationId,
        mathScore: profile.thpt?.scores?.math,
        literatureScore: profile.thpt?.scores?.literature,
        priorityZone: context.priorityZone,
      });
      reasons.push(result.requiredText);
      explanation.push({ id: 'hub-thpt-exam-law-threshold', label: 'Ngưỡng đảm bảo chất lượng HUB 2026 — khối Luật (Phương thức 1)', output: total30, scale: 30, formula: result.requiredText });
      status = context.priorityZone === 'KV3' ? (result.pass ? 'eligible' : 'ineligible') : 'unknown';
    }
  } else {
    if (total30 !== undefined) {
      const result = checkHubStandardThreshold(total30);
      let pass = result.pass;
      reasons.push(result.requiredText);
      explanation.push({ id: 'hub-thpt-exam-threshold', label: 'Ngưỡng đảm bảo chất lượng HUB 2026 (Phương thức 1)', output: total30, scale: 30, formula: result.requiredText });

      if (group === 'finance-banking-elite') {
        const ieltsResult = checkHubEliteIeltsRequirement(context.ielts);
        reasons.push(ieltsResult.requiredText);
        if (context.ielts === undefined) {
          missingRequirements.push({ kind: 'profile-input', code: 'hub-elite-ielts', label: 'Điểm chứng chỉ IELTS (điều kiện riêng Elite Class).' });
          status = 'unknown';
        } else {
          pass = pass && ieltsResult.pass;
          status = pass ? 'eligible' : 'ineligible';
        }
      } else {
        status = pass ? 'eligible' : 'ineligible';
      }
    }
  }

  return {
    schoolId: 'hub',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra ngưỡng HUB.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

export interface HubComprehensiveVsatEvaluationContext {
  group?: HubProgramGroup;
  subjectContext?: HubSubjectContext;
  academicRank10?: HubAcademicRank;
  academicRank11?: HubAcademicRank;
  academicRank12?: HubAcademicRank;
  /** Chỉ dùng cho nhóm `law` — mã khu vực ưu tiên, cho điều kiện thay thế (a) giống Phương thức 1. */
  priorityZone?: string;
  /** Chỉ dùng cho nhóm `law` — điểm xét tốt nghiệp THPT (thang 10), điều kiện thay thế (c). */
  graduationScore10?: number;
  /** Chỉ dùng cho nhóm `finance-banking-elite`. */
  ielts?: number;
}

/** Phương thức Tổng hợp/V-SAT dùng CHUNG điều kiện ngưỡng (nguồn không phân biệt 2 phương thức ở
 * mục ngưỡng đảm bảo chất lượng — chỉ khác nhau ở cách quy đổi điểm trúng tuyển, vốn đã bị chặn bởi
 * Phụ lục I/II, xem `methods.ts`). Thí sinh tốt nghiệp THPT trước 2026 dùng khái niệm "tổng điểm
 * xét tuyển" chưa định nghĩa rõ trong nguồn — trả `unknown`, KHÔNG suy đoán
 * (`hub-comprehensive-vsat-pre2026-graduate-not-modeled`). */
function evaluateHubComprehensiveVsatFamilyAdmission(
  method: (typeof hubAdmissionMethods)[number],
  profile: ApplicantProfile,
  context: HubComprehensiveVsatEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const group: HubProgramGroup = context.group ?? 'standard';
  const gapExtras = buildGapExtras(method);

  let total30: number | undefined;
  if (context.subjectContext) {
    const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    total30 = total;
    if (missingSubjects.length > 0) missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT để đối chiếu điều kiện.');
  }

  const graduationYear = profile.graduationYear;
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (graduationYear === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hub-graduation-year', label: 'Năm tốt nghiệp THPT (điều kiện ngưỡng HUB khác nhau giữa thí sinh 2026 và trước 2026).' });
    reasons.push('Cần biết năm tốt nghiệp THPT để xác định điều kiện ngưỡng HUB áp dụng.');
  } else if (graduationYear < 2026) {
    reasons.push(
      'Thí sinh tốt nghiệp THPT trước năm 2026 dùng khái niệm "tổng điểm xét tuyển" — nguồn chưa định nghĩa rõ cách tính độc lập với bảng quy đổi (Phụ lục II), UniscoreVN chưa model điều kiện này để tránh suy đoán công thức.'
    );
  } else {
    if (group === 'law') {
      const result = checkHubLawComprehensiveVsat2026Eligibility({
        totalScore30: total30,
        combinationId: context.subjectContext?.combinationId,
        mathScore: profile.thpt?.scores?.math,
        literatureScore: profile.thpt?.scores?.literature,
        priorityZone: context.priorityZone,
        academicRank12: context.academicRank12,
        graduationScore10: context.graduationScore10,
      });
      reasons.push(result.requiredText);
      explanation.push({ id: `${method.id}-law-threshold`, label: `Ngưỡng đảm bảo chất lượng HUB 2026 — khối Luật (${method.name})`, output: total30 ?? context.graduationScore10 ?? 0, scale: 30, formula: result.requiredText });

      const hasAnyPathInfo =
        (context.priorityZone !== undefined && total30 !== undefined) ||
        (context.academicRank12 !== undefined && total30 !== undefined) ||
        context.graduationScore10 !== undefined;
      status = hasAnyPathInfo ? (result.pass ? 'eligible' : 'ineligible') : 'unknown';
      if (!hasAnyPathInfo) {
        missingRequirements.push({ kind: 'profile-input', code: 'hub-law-comprehensive-vsat-path-input', label: 'Cần ít nhất 1 trong 3 điều kiện: khu vực + tổng điểm, hoặc học lực lớp 12 + tổng điểm, hoặc điểm xét tốt nghiệp THPT.' });
      }
    } else {
      const result = checkHubStandardComprehensiveVsat2026Eligibility({
        academicRank10: context.academicRank10,
        academicRank11: context.academicRank11,
        academicRank12: context.academicRank12,
        totalScore30: total30,
      });
      let pass = result.pass;
      reasons.push(result.requiredText);
      explanation.push({ id: `${method.id}-threshold`, label: `Ngưỡng đảm bảo chất lượng HUB 2026 (${method.name})`, output: total30 ?? 0, scale: 30, formula: result.requiredText });

      const ranksKnown = [context.academicRank10, context.academicRank11, context.academicRank12].every((rank) => rank !== undefined);
      const hasEnoughInfo = ranksKnown && total30 !== undefined;

      if (group === 'finance-banking-elite') {
        const ieltsResult = checkHubEliteIeltsRequirement(context.ielts);
        reasons.push(ieltsResult.requiredText);
        if (!hasEnoughInfo || context.ielts === undefined) {
          if (context.ielts === undefined) missingRequirements.push({ kind: 'profile-input', code: 'hub-elite-ielts', label: 'Điểm chứng chỉ IELTS (điều kiện riêng Elite Class).' });
          status = 'unknown';
        } else {
          pass = pass && ieltsResult.pass;
          status = pass ? 'eligible' : 'ineligible';
        }
      } else {
        status = hasEnoughInfo ? (pass ? 'eligible' : 'ineligible') : 'unknown';
      }

      if (!ranksKnown) missingRequirements.push({ kind: 'profile-input', code: 'hub-academic-rank-10-11-12', label: 'Xếp loại học lực cả năm lớp 10, 11 và 12 (khá/giỏi).' });
    }
  }

  return {
    schoolId: 'hub',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần nhập đủ điểm/xếp loại học lực để kiểm tra ngưỡng HUB.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

/** Phương thức Tổng hợp. */
export function evaluateHubComprehensiveAdmission(profile: ApplicantProfile, context: HubComprehensiveVsatEvaluationContext = {}): AdmissionEvaluation {
  return evaluateHubComprehensiveVsatFamilyAdmission(hubAdmissionMethods[1], profile, context);
}

/** Phương thức V-SAT. */
export function evaluateHubVsatAdmission(profile: ApplicantProfile, context: HubComprehensiveVsatEvaluationContext = {}): AdmissionEvaluation {
  return evaluateHubComprehensiveVsatFamilyAdmission(hubAdmissionMethods[2], profile, context);
}

import { round2 } from '../../core/round2';
import { calculateHubEffectivePriority30, lookupHubStandardPriority30 } from './priority';
import { hubLawFormulaEvidence, hubLawThresholdEvidence } from './evidence';

const HUB_LAW_EXACT_METHOD = hubAdmissionMethods[3];

export interface HubLawExactEvaluationContext {
  subjectContext?: HubSubjectContext;
}

function hubLawExactPartial(input: { missingInputs: string[]; missingRequirements: MissingRequirement[]; explanation: CalculationStep[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'hub',
    year: HUB_LAW_EXACT_METHOD.year,
    methodId: HUB_LAW_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs,
    missingRules: [],
    missingRequirements: input.missingRequirements,
    explanation: input.explanation,
    evidence: [],
  };
}

/**
 * HUB 2026 — Phương thức 1 (thi TN THPT), khối Luật, thí sinh khu vực 3, tính đủ Điểm xét tuyển
 * (thang 30): ĐXT = round2((M1 + M2 + M3) + Điểm ưu tiên). Ngưỡng 20/30 so với (tổng thô + điểm
 * ưu tiên), kèm điều kiện Toán/Ngữ văn theo tổ hợp.
 */
export function evaluateHubLawThptExamExactAdmission(profile: ApplicantProfile, context: HubLawExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const region = profile.priority?.region;
  if (region !== undefined && region !== 'KV3') {
    missingRequirements.push({ kind: 'official-rule', code: 'hub-law-non-kv3-threshold-unknown', label: 'HUB chỉ công bố ngưỡng khối Luật (20/30) cho thí sinh khu vực 3; ngưỡng khu vực khác chưa có nguồn.' });
    return hubLawExactPartial({ missingInputs: [], missingRequirements, explanation, reason: 'Nhánh exact khối Luật HUB chỉ áp dụng cho thí sinh khu vực 3.' });
  }
  if (region === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'hub-priority-zone', label: 'Khu vực ưu tiên tuyển sinh (nhánh exact khối Luật HUB chỉ xác định được cho khu vực 3).' });
    return hubLawExactPartial({ missingInputs: ['Chưa có khu vực ưu tiên.'], missingRequirements, explanation, reason: 'Cần biết khu vực ưu tiên để áp ngưỡng khối Luật HUB.' });
  }

  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'hub-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển khối Luật HUB (A00/A01/D07 hoặc C01/C02/D01).' });
    return hubLawExactPartial({ missingInputs: ['Chọn tổ hợp 3 môn.'], missingRequirements, explanation, reason: 'Cần chọn tổ hợp để tính điểm.' });
  }

  const { total30, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(...missingSubjects.map((s) => ({ kind: 'profile-input' as const, code: `hub-thpt-${s}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[s]} cho tổ hợp HUB.` })));
    return hubLawExactPartial({ missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT theo tổ hợp HUB.'], missingRequirements, explanation, reason: 'Cần đủ điểm 3 môn để tính điểm xét tuyển.' });
  }
  const raw30 = total30 as number;

  const combinationId = context.subjectContext.combinationId;
  const HUB_LAW_COMBOS = ['A00', 'A01', 'D07', 'C01', 'C02', 'D01'];
  const HUB_LAW_MATH_VAN_COMBOS = ['C01', 'C02', 'D01'];
  if (combinationId === undefined || !HUB_LAW_COMBOS.includes(combinationId)) {
    missingRequirements.push({ kind: 'school-context', code: 'hub-law-combination', label: 'Chọn tổ hợp khối Luật HUB: A00/A01/D07 (Toán ≥ 6) hoặc C01/C02/D01 (Toán ≥ 6 và Ngữ văn ≥ 6).' });
    return hubLawExactPartial({ missingInputs: ['Chọn tổ hợp khối Luật HUB.'], missingRequirements, explanation, reason: 'Nhánh exact khối Luật HUB chỉ áp dụng cho các tổ hợp A00/A01/D07/C01/C02/D01.' });
  }
  const needsLiterature = HUB_LAW_MATH_VAN_COMBOS.includes(combinationId);
  if (profile.thpt?.scores?.math === undefined || (needsLiterature && profile.thpt?.scores?.literature === undefined)) {
    if (profile.thpt?.scores?.math === undefined) missingRequirements.push({ kind: 'profile-input', code: 'hub-thpt-math', label: 'Điểm thi TN THPT môn Toán (điều kiện tối thiểu ≥ 6 khối Luật HUB).' });
    if (needsLiterature && profile.thpt?.scores?.literature === undefined) missingRequirements.push({ kind: 'profile-input', code: 'hub-thpt-literature', label: 'Điểm thi TN THPT môn Ngữ văn (điều kiện tối thiểu ≥ 6 tổ hợp có Văn).' });
    return hubLawExactPartial({ missingInputs: ['Chưa đủ điểm môn điều kiện.'], missingRequirements, explanation, reason: 'Cần điểm Toán (và Ngữ văn nếu tổ hợp có Văn) để kiểm tra điều kiện tối thiểu khối Luật HUB.' });
  }

  const standardPriority30 = lookupHubStandardPriority30(region, profile.priority?.category);
  const priority = calculateHubEffectivePriority30({ academicScore30: raw30, standardPriority30 });
  const scoreForThreshold = round2(raw30 + priority.effectivePriority30);
  const finalScore = scoreForThreshold;

  const thresholdCheck = checkHubLawThptExamThreshold({
    totalScore30: scoreForThreshold,
    combinationId,
    mathScore: profile.thpt?.scores?.math,
    literatureScore: profile.thpt?.scores?.literature,
    priorityZone: 'KV3',
  });

  const eligibilityStatus: 'eligible' | 'ineligible' = thresholdCheck.pass ? 'eligible' : 'ineligible';
  const eligibilityReason = `${thresholdCheck.requiredText} — điểm xét tuyển ${scoreForThreshold}/30. Điểm chuẩn trúng tuyển thực tế có thể cao hơn.`;

  explanation.push({ id: 'hub-law-exact-threshold', label: 'Ngưỡng đảm bảo chất lượng — khối Luật (KV3)', output: scoreForThreshold, scale: 30, formula: eligibilityReason, evidence: hubLawThresholdEvidence.evidence });
  explanation.push({ id: 'hub-law-exact-academic', label: 'Điểm thi (tổng thô 3 môn)', output: raw30, scale: 30, formula: 'M1 + M2 + M3', evidence: hubLawFormulaEvidence.evidence });
  explanation.push({
    id: 'hub-law-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 06/2026)',
    evidence: hubLawFormulaEvidence.evidence,
  });
  explanation.push({ id: 'hub-law-exact-final', label: 'Điểm xét tuyển', output: finalScore, scale: 30, formula: 'Tổng điểm 3 môn + Điểm ưu tiên', evidence: hubLawFormulaEvidence.evidence });

  return {
    schoolId: 'hub',
    year: HUB_LAW_EXACT_METHOD.year,
    methodId: HUB_LAW_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligibilityStatus, reasons: [eligibilityReason] },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...hubLawThresholdEvidence.evidence, ...hubLawFormulaEvidence.evidence],
  };
}
