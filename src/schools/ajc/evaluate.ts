import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { ajcAdmissionMethods } from './methods';
import { getAjcProgramGroupThreshold, type AjcProgramGroupId } from './thresholds';
import { calculateAjcEffectivePriority30, lookupAjcStandardPriority30 } from './priority';
import { ajcExactFormulaEvidence } from './evidence';

export interface AjcThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: AjcProgramGroupId;
}

const evidenceSourceId = 'ajc-threshold-notice-2026';

function readSubjectScores(profile: ApplicantProfile, subjects: readonly SubjectId[]): { scores: Partial<Record<SubjectId, number>>; missingSubjects: SubjectId[] } {
  const scores: Partial<Record<SubjectId, number>> = {};
  const missingSubjects: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else scores[subjectId] = score;
  }
  return { scores, missingSubjects };
}

export function evaluateAjcThptExamAdmission(profile: ApplicantProfile, context: AjcThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = ajcAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ajc-subject-combination', label: 'Chọn tổ hợp môn xét tuyển AJC.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào AJC.');
  } else if (!context.programGroupId) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'ajc-program-group',
      label: 'Chọn nhóm ngành AJC (Báo chí - Xuất bản, hoặc Lý luận/Lịch sử/Truyền thông/Quảng cáo/Quan hệ quốc tế).',
    });
    reasons.push('Cần chọn nhóm ngành để áp đúng ngưỡng (thang điểm khác nhau giữa 2 nhóm).');
  } else {
    const threshold = getAjcProgramGroupThreshold(context.programGroupId);
    if (!threshold) {
      missingRequirements.push({ kind: 'official-rule', code: 'ajc-program-group-not-found', label: `Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.` });
      reasons.push(`Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.`);
    } else {
      const { scores, missingSubjects } = readSubjectScores(profile, context.subjectContext.subjects);

      if (threshold.scale === 40 && !context.subjectContext.subjects.includes('literature')) {
        missingRequirements.push({
          kind: 'school-context',
          code: 'ajc-baochi-requires-literature',
          label: 'Nhóm Báo chí - Xuất bản yêu cầu tổ hợp có môn Ngữ văn (nhân hệ số 2).',
        });
        reasons.push('Nhóm Báo chí - Xuất bản chỉ áp dụng cho tổ hợp có môn Ngữ văn (Văn nhân hệ số 2, thang 40).');
      } else if (missingSubjects.length > 0) {
        missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho AJC.');
        missingRequirements.push(
          ...missingSubjects.map((subjectId) => ({
            kind: 'profile-input' as const,
            code: `ajc-thpt-${subjectId}`,
            label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp AJC.`,
          }))
        );
        reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng AJC.');
      } else {
        const rawSum = context.subjectContext.subjects.reduce((sum, subjectId) => sum + (scores[subjectId] ?? 0), 0);
        const literatureBonus = threshold.scale === 40 ? (scores.literature ?? 0) : 0;
        const total = Math.round((rawSum + literatureBonus) * 100) / 100;

        explanation.push({
          id: 'ajc-thpt-group-threshold',
          label: `Ngưỡng AJC 2026 - ${threshold.groupName}`,
          output: total,
          scale: threshold.scale,
          formula:
            threshold.scale === 40
              ? `Tổng điểm 3 môn (Ngữ văn nhân hệ số 2) phải đạt tối thiểu ${threshold.minScore}/40 cho ${threshold.groupName}.`
              : `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.minScore}/30 cho ${threshold.groupName}.`,
          evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo 293/TB-HVBCTT-ĐT ngày 10/07/2026', verification: 'official-source-available', effectiveYear: 2026 }],
        });

        if (total < threshold.minScore) {
          status = 'ineligible';
          reasons.push(`Tổng ${total}/${threshold.scale} thấp hơn ngưỡng ${threshold.groupName} đã công bố (${threshold.minScore}/${threshold.scale}).`);
        } else {
          status = 'eligible';
          reasons.push(`Tổng ${total}/${threshold.scale} đạt ngưỡng ${threshold.groupName} đã công bố (${threshold.minScore}/${threshold.scale}).`);
        }
      }
    }
  }

  return {
    schoolId: 'ajc',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo 293/TB-HVBCTT-ĐT ngày 10/07/2026', verification: 'official-source-available', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}

const AJC_EXACT_METHOD = ajcAdmissionMethods[1];

export interface AjcThptExamExactEvaluationContext extends ThresholdOnlyEvaluationContext {
  programGroupId?: AjcProgramGroupId;
}

/**
 * AJC 2026 — nhánh exact. Nhóm Báo chí-Xuất bản (thang 40, Văn hệ số 2): Điểm xét tuyển = Tổng
 * điểm 3 môn (đã nhân hệ số) + [(Điểm cộng + Điểm ưu tiên)×4/3]. Nhóm Lý luận/Lịch sử/Truyền
 * thông-Quảng cáo-Quan hệ quốc tế (thang 30): Điểm xét tuyển = Tổng điểm 3 môn + Điểm cộng + Điểm
 * ưu tiên. Điểm cộng KHÔNG model (chưa có bảng cụ thể từ AJC, hiếm — giải HSG quốc gia/SAT), mặc
 * định 0. Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call, xem `priority.ts`).
 */
export function evaluateAjcThptExamExactAdmission(profile: ApplicantProfile, context: AjcThptExamExactEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string): AdmissionEvaluation => ({
    schoolId: 'ajc',
    year: AJC_EXACT_METHOD.year,
    methodId: AJC_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'ajc-exact-subject-combination', label: 'Chọn tổ hợp môn xét tuyển AJC.' });
    return partial('Cần chọn tổ hợp môn để tính điểm xét tuyển AJC.');
  }
  if (!context.programGroupId) {
    missingRequirements.push({ kind: 'school-context', code: 'ajc-exact-program-group', label: 'Chọn nhóm ngành AJC (Báo chí - Xuất bản, hoặc Lý luận/Lịch sử/Truyền thông/Quảng cáo/Quan hệ quốc tế).' });
    return partial('Cần chọn nhóm ngành để tính điểm xét tuyển AJC.');
  }
  const threshold = getAjcProgramGroupThreshold(context.programGroupId);
  if (!threshold) {
    missingRequirements.push({ kind: 'official-rule', code: 'ajc-exact-program-group-not-found', label: `Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.` });
    return partial(`Nhóm ngành ${context.programGroupId} không có trong bảng ngưỡng AJC đã xác nhận.`);
  }
  if (threshold.scale === 40 && !context.subjectContext.subjects.includes('literature')) {
    missingRequirements.push({ kind: 'school-context', code: 'ajc-exact-baochi-requires-literature', label: 'Nhóm Báo chí - Xuất bản yêu cầu tổ hợp có môn Ngữ văn (nhân hệ số 2).' });
    return partial('Nhóm Báo chí - Xuất bản chỉ áp dụng cho tổ hợp có môn Ngữ văn (Văn nhân hệ số 2, thang 40).');
  }

  const { scores, missingSubjects } = readSubjectScores(profile, context.subjectContext.subjects);
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `ajc-exact-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp AJC.`,
      }))
    );
    return partial('Cần đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.');
  }

  const rawSum = context.subjectContext.subjects.reduce((sum, subjectId) => sum + (scores[subjectId] ?? 0), 0);
  const literatureBonus = threshold.scale === 40 ? (scores.literature ?? 0) : 0;
  const raw = round2(rawSum + literatureBonus);

  const standardPriority30 = lookupAjcStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateAjcEffectivePriority30({ rawTotalOnScale: raw, scale: threshold.scale, standardPriority30 });
  const priorityAdd = threshold.scale === 40 ? round2((priority.effectivePriority30 * 4) / 3) : priority.effectivePriority30;
  const total = round2(Math.min(threshold.scale, raw + priorityAdd));
  const eligible = total >= threshold.minScore;

  const reasons = [
    `Ngưỡng AJC 2026 - ${threshold.groupName}: điểm xét tuyển (đã gồm điểm ưu tiên${threshold.scale === 40 ? ', nhân hệ số 4/3' : ''}, chưa gồm điểm cộng - chưa model) ≥ ${threshold.minScore}/${threshold.scale}.`,
    `Tổng điểm thô = ${raw}/${threshold.scale}, điểm ưu tiên cộng vào = ${priorityAdd}/${threshold.scale} → tổng = ${total}/${threshold.scale} → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'ajc-exact-raw',
    label: `Điểm xét tuyển thô - ${threshold.groupName}`,
    output: raw,
    scale: threshold.scale,
    formula:
      threshold.scale === 40
        ? 'Tổng điểm 3 môn (Ngữ văn nhân hệ số 2)'
        : 'Tổng điểm 3 môn thi TN THPT',
    evidence: ajcExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ajc-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priorityAdd,
    scale: threshold.scale,
    formula: threshold.scale === 40 ? 'Điểm ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call) × 4/3' : 'Điểm ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: ajcExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'ajc-exact-total',
    label: `Tổng điểm dùng để so ngưỡng ${threshold.groupName} (đã gồm ưu tiên, chưa gồm điểm cộng)`,
    output: total,
    scale: threshold.scale,
    formula: 'round2(điểm xét tuyển thô + điểm ưu tiên đã quy đổi)',
    evidence: ajcExactFormulaEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'ajc-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'ajc',
    year: AJC_EXACT_METHOD.year,
    methodId: AJC_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total, scale: threshold.scale },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: ajcExactFormulaEvidence.evidence,
  };
}
