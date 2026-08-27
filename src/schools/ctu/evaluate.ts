import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { ctuAdmissionMethods } from './methods';
import { ctuKnowledgeGaps } from './knowledgeGaps';
import { checkCtuBaselineCondition, checkCtuAltPathEligibility, type CtuAcademicRank, type CtuProgramGroup } from './eligibility';

export interface CtuSubjectContext {
  combinationId?: string;
  subjects: readonly SubjectId[];
}

function sumSubjectTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; scores: number[]; missingSubjects: SubjectId[] } {
  let total = 0;
  const scores: number[] = [];
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else {
      total += score;
      scores.push(score);
    }
  }
  if (missingSubjects.length > 0) return { scores, missingSubjects };
  return { total30: Math.round(total * 100) / 100, scores, missingSubjects };
}

function buildGapExtras(method: (typeof ctuAdmissionMethods)[number]): { missingRules: string[]; missingRequirements: MissingRequirement[] } {
  const gaps = method.knowledgeGaps ?? ctuKnowledgeGaps;
  return {
    missingRules: gaps.map((gap) => gap.label),
    missingRequirements: gaps.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })),
  };
}

export interface CtuThptExamEvaluationContext {
  subjectContext?: CtuSubjectContext;
}

/** Phương thức 2: Xét điểm thi TN THPT 2026 — chỉ kiểm tra được điều kiện 1 (điều kiện CẦN, mọi
 * ngành/mọi nhóm giống nhau). Điều kiện 2 (điểm sàn theo mã xét tuyển) PDF-gated — KHÔNG kết luận
 * `eligible`, chỉ `ineligible` (điều kiện 1 fail) hoặc `unknown`. */
export function evaluateCtuThptExamAdmission(profile: ApplicantProfile, context: CtuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ctuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const gapExtras = buildGapExtras(method);

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ctu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển CTU.' });
  } else {
    const { total30, scores, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `ctu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp CTU.`,
        }))
      );
    }
    if (total30 !== undefined) {
      const result = checkCtuBaselineCondition(total30, scores);
      reasons.push(result.requiredText);
      explanation.push({ id: 'ctu-thpt-exam-baseline', label: 'Điều kiện 1 — ngưỡng đầu vào CTU 2026 (Phương thức 2)', output: total30, scale: 30, formula: result.requiredText });
      status = result.pass === false ? 'ineligible' : 'unknown';
    }
  }

  return {
    schoolId: 'ctu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn tổ hợp môn và nhập đủ điểm để kiểm tra điều kiện 1 của CTU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

export interface CtuAltPathEvaluationContext {
  group?: CtuProgramGroup;
  subjectContext?: CtuSubjectContext;
  academicRank12?: CtuAcademicRank;
  graduationScore10?: number;
}

/** Phương thức 3 (học bạ)/4 (V-SAT) — điều kiện thay thế qua học lực lớp 12 + điểm thi TN THPT
 * 2026/điểm xét tốt nghiệp THPT, CHỈ áp dụng nhóm `law`/`teacher` (mục 2.2.3/2.2.4). Nhóm
 * `standard` không có đường thay thế trong nguồn — trả `unknown` (cần bảng quy đổi hocba/V-SAT). */
function evaluateCtuAltPathAdmission(method: (typeof ctuAdmissionMethods)[number], profile: ApplicantProfile, context: CtuAltPathEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const gapExtras = buildGapExtras(method);
  const group = context.group;

  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';
  const reasons: string[] = [];

  if (group === undefined) {
    missingRequirements.push({ kind: 'school-context', code: 'ctu-program-group', label: 'Chọn nhóm ngành CTU (pháp luật/sư phạm/khác) để xét điều kiện thay thế.' });
    reasons.push('Điều kiện thay thế (học lực + điểm) chỉ áp dụng nhóm pháp luật/sư phạm — cần biết nhóm ngành để kiểm tra.');
  } else if (group === 'standard') {
    reasons.push('Nhóm ngành khác (không phải pháp luật/sư phạm) không có đường thay thế công bố — cần bảng quy đổi điểm học bạ/V-SAT (chưa đọc được) để kiểm tra điều kiện 2.2.2.');
  } else {
    let total30: number | undefined;
    if (context.subjectContext) {
      const { total30: total, missingSubjects } = sumSubjectTotal(profile, context.subjectContext.subjects);
      total30 = total;
      if (missingSubjects.length > 0) missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT 2026 để đối chiếu điều kiện thay thế.');
    }
    if (context.academicRank12 === undefined) {
      missingRequirements.push({ kind: 'profile-input', code: 'ctu-academic-rank-12', label: 'Xếp loại học lực cả năm lớp 12 (điều kiện thay thế).' });
    }
    if (total30 === undefined && context.graduationScore10 === undefined) {
      missingRequirements.push({ kind: 'profile-input', code: 'ctu-alt-path-score', label: 'Tổng điểm 3 môn thi TN THPT 2026 hoặc điểm xét tốt nghiệp THPT.' });
    }

    const result = checkCtuAltPathEligibility({ totalScore30: total30, academicRank12: context.academicRank12, graduationScore10: context.graduationScore10 }, group);
    reasons.push(result.requiredText);
    explanation.push({
      id: `${method.id}-alt-path`,
      label: `Điều kiện thay thế CTU 2026 (${method.name})`,
      output: total30 ?? context.graduationScore10 ?? 0,
      scale: total30 !== undefined ? 30 : 10,
      formula: result.requiredText,
    });

    if (result.pass === false) status = 'ineligible';
    else if (result.pass === true) {
      if (group === 'law') {
        status = 'unknown';
        reasons.push('Nhóm pháp luật còn điều kiện tổ hợp môn (Văn/Toán+Văn) dùng điểm V-SAT/học bạ quy đổi — chưa có bảng quy đổi, không thể kết luận eligible chắc chắn.');
      } else {
        status = 'eligible';
      }
    }
  }

  return {
    schoolId: 'ctu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons: reasons.length > 0 ? reasons : ['Cần chọn nhóm ngành và nhập đủ thông tin để kiểm tra điều kiện thay thế CTU.'] },
    missingInputs,
    missingRules: gapExtras.missingRules,
    missingRequirements: [...missingRequirements, ...gapExtras.missingRequirements],
    explanation,
    evidence: [],
  };
}

import { round2 } from '../../core/round2';
import { CTU_COMBOS, CTU_THRESHOLD_BY_CODE, type CtuProgramThreshold } from './thresholds';
import { calculateCtuEffectivePriority30, lookupCtuStandardPriority30 } from './priority';
import { ctuThptExamFormulaEvidence, ctuPerMajorThresholdEvidence, ctuLawComboThptEvidence } from './evidence';
import { CTU_BASELINE_THRESHOLD_30, CTU_SUBJECT_MIN_10 } from './eligibility';

const CTU_THPT_EXACT_METHOD = ctuAdmissionMethods[3];

export interface CtuThptExamExactEvaluationContext {
  /** Mã xét tuyển CTU (vd '7480101', '7380101H'). */
  programCode?: string;
  /** Mã tổ hợp xét tuyển (vd 'A00') — phải thuộc danh sách tổ hợp của mã ngành. */
  combinationId?: string;
}

function ctuThptExactPartial(input: {
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
  reason: string;
}): AdmissionEvaluation {
  return {
    schoolId: 'ctu',
    year: CTU_THPT_EXACT_METHOD.year,
    methodId: CTU_THPT_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: input.missingInputs ?? [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: input.explanation ?? [],
    evidence: [],
  };
}

function checkCtuLawComboThpt(
  combinationId: string,
  scores: { math?: number; literature?: number }
): { pass: boolean | undefined; requiredText: string } {
  if (combinationId === 'C00') {
    if (scores.literature === undefined) return { pass: undefined, requiredText: 'Tổ hợp C00 (nhóm pháp luật): cần điểm Ngữ văn ≥ 6,0.' };
    return { pass: scores.literature >= 6, requiredText: 'Tổ hợp C00 (nhóm pháp luật): Ngữ văn ≥ 6,0.' };
  }
  if (scores.math === undefined || scores.literature === undefined) {
    return { pass: undefined, requiredText: 'Nhóm pháp luật (tổ hợp ngoài C00): cần điểm Toán + Ngữ văn ≥ 12,0.' };
  }
  return { pass: round2(scores.math + scores.literature) >= 12, requiredText: 'Nhóm pháp luật (tổ hợp ngoài C00): Toán + Ngữ văn ≥ 12,0.' };
}

/**
 * CTU 2026 — Phương thức 2 (xét điểm thi TN THPT), tính đủ Điểm xét tuyển (thang 30) theo mã xét
 * tuyển. ĐXT = round2(tổng thô 3 môn tổ hợp + điểm ưu tiên KV/ĐT). Điểm sàn ĐKXT (điều kiện 1 + 2)
 * so với TỔNG THÔ theo đúng văn bản; điểm chuẩn trúng tuyển thực tế cao hơn.
 */
export function evaluateCtuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: CtuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.programCode) {
    missingRequirements.push({ kind: 'school-context', code: 'ctu-program-code', label: 'Chọn mã xét tuyển CTU để tra điểm sàn theo ngành.' });
    return ctuThptExactPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển CTU để áp điểm sàn và tính Điểm xét tuyển.' });
  }

  const entry: CtuProgramThreshold | undefined = CTU_THRESHOLD_BY_CODE.get(context.programCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'ctu-program-code', label: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn CTU 2026.` });
    return ctuThptExactPartial({ missingRequirements, reason: `Mã xét tuyển "${context.programCode}" không có trong bảng điểm sàn CTU 2026.` });
  }

  if (!entry.modellable) {
    return ctuThptExactPartial({
      reason: `Ngành ${entry.name} (${entry.code}) ngoài phạm vi tính chính xác của CTU: ${entry.specialCondition ?? 'có điều kiện năng khiếu/đặc biệt riêng'}.`,
      missingRequirements: [{ kind: 'official-rule', code: 'ctu-program-out-of-scope', label: `Ngành ${entry.name} có điều kiện năng khiếu/đặc biệt — không model điểm ở nhánh exact.` }],
    });
  }

  const { combinationId } = context;
  if (!combinationId || !entry.thptCombos.includes(combinationId) || !(combinationId in CTU_COMBOS)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'ctu-subject-combination',
      label: `Chọn tổ hợp xét tuyển cho ngành ${entry.name} (${entry.thptCombos.join(', ')}).`,
    });
    return ctuThptExactPartial({ missingRequirements, reason: `Cần chọn tổ hợp xét tuyển hợp lệ cho ngành ${entry.name}.` });
  }

  const subjects = CTU_COMBOS[combinationId];
  const { total30, missingSubjects } = sumSubjectTotal(profile, subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ctu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp ${combinationId}.`,
      }))
    );
    return ctuThptExactPartial({
      missingInputs: ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'],
      missingRequirements,
      reason: 'Cần đủ điểm 3 môn thi TN THPT để tính Điểm xét tuyển CTU.',
    });
  }

  const raw30 = total30 as number;
  const subjectScores = subjects.map((subjectId) => profile.thpt?.scores?.[subjectId] as number);

  // Điều kiện 1: tổng ≥ 15 và không môn nào ≤ 1,0
  const noSubjectTooLow = subjectScores.every((score) => score > CTU_SUBJECT_MIN_10);
  const cond1Pass = raw30 >= CTU_BASELINE_THRESHOLD_30 && noSubjectTooLow;

  // Điều kiện 2: tổng thô ≥ điểm sàn theo mã xét tuyển
  const cond2Pass = raw30 >= entry.threshold30;

  // Nhóm pháp luật: điều kiện tổ hợp môn (điểm thi thô)
  const mathScore = profile.thpt?.scores?.math;
  const literatureScore = profile.thpt?.scores?.literature;
  const lawCombo = entry.group === 'law' ? checkCtuLawComboThpt(combinationId, { math: mathScore, literature: literatureScore }) : undefined;

  // Điểm ưu tiên
  const standardPriority30 = lookupCtuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateCtuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const finalScore = round2(raw30 + priority.effectivePriority30);

  const reasons: string[] = [];
  reasons.push(
    `Điểm sàn ĐKXT ngành ${entry.name} (${entry.code}): tổng 3 môn thô ≥ ${entry.threshold30}/30 VÀ tổng ≥ 15/30 VÀ không môn nào ≤ 1,0 — tổng của bạn ${raw30}/30.`
  );
  if (lawCombo) reasons.push(lawCombo.requiredText);
  reasons.push(`Điểm xét tuyển = tổng thô + điểm ưu tiên = ${raw30} + ${priority.effectivePriority30} = ${finalScore}/30. Điểm sàn ĐKXT so với tổng THÔ; điểm chuẩn trúng tuyển thực tế cao hơn và có cộng điểm ưu tiên.`);

  const eligible = cond1Pass && cond2Pass && (lawCombo ? lawCombo.pass === true : true);
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';
  if (!cond1Pass) reasons.push(raw30 < CTU_BASELINE_THRESHOLD_30 ? 'Không đạt: tổng 3 môn < 15,0/30.' : 'Không đạt: có môn ≤ 1,0 điểm.');
  else if (!cond2Pass) reasons.push(`Không đạt: tổng ${raw30} < điểm sàn ngành ${entry.threshold30}/30.`);
  else if (lawCombo && lawCombo.pass === false) reasons.push('Không đạt: chưa thỏa điều kiện tổ hợp môn nhóm pháp luật.');

  explanation.push({
    id: 'ctu-thpt-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: `${subjects.map((s) => SUBJECT_LABELS[s]).join(' + ')} (tổ hợp ${combinationId})`,
    evidence: ctuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctu-thpt-exact-threshold',
    label: `Điểm sàn ĐKXT — ${entry.name}`,
    output: entry.threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: [...ctuPerMajorThresholdEvidence.evidence, ...(lawCombo ? ctuLawComboThptEvidence.evidence : [])],
  });
  explanation.push({
    id: 'ctu-thpt-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức điểm ưu tiên KV/ĐT' : 'Mức điểm ưu tiên KV/ĐT (Điều 7 Thông tư 08/2022/TT-BGDĐT)',
    evidence: ctuThptExamFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ctu-thpt-exact-final',
    label: 'Điểm xét tuyển',
    output: finalScore,
    scale: 30,
    formula: 'Tổng điểm 3 môn (thô) + Điểm ưu tiên',
    evidence: ctuThptExamFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'ctu-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét tuyển đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'ctu',
    year: CTU_THPT_EXACT_METHOD.year,
    methodId: CTU_THPT_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [
      ...ctuThptExamFormulaEvidence.evidence,
      ...ctuPerMajorThresholdEvidence.evidence,
      ...(lawCombo ? ctuLawComboThptEvidence.evidence : []),
    ],
  };
}

/** Phương thức 3 (học bạ). */
export function evaluateCtuTranscriptAdmission(profile: ApplicantProfile, context: CtuAltPathEvaluationContext = {}): AdmissionEvaluation {
  return evaluateCtuAltPathAdmission(ctuAdmissionMethods[1], profile, context);
}

/** Phương thức 4 (V-SAT). */
export function evaluateCtuVsatAdmission(profile: ApplicantProfile, context: CtuAltPathEvaluationContext = {}): AdmissionEvaluation {
  return evaluateCtuAltPathAdmission(ctuAdmissionMethods[2], profile, context);
}
