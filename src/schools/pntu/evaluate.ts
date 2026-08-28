import type { ApplicantProfile } from '../../core/applicantProfile';
import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import type { ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { pntuAdmissionMethods } from './methods';
import { getPntuProgramThreshold, PNTU_COMBINATION_SUBJECTS, type PntuProgramId } from './thresholds';
import { calculatePntuEffectivePriority30, lookupPntuStandardPriority30 } from './priority';
import { pntuThptExamThresholdEvidence, pntuPriorityReductionFormulaEvidence } from './evidence';

export interface PntuThptExamEvaluationContext extends ThresholdOnlyEvaluationContext {
  programId?: PntuProgramId;
}

const evidenceSourceId = 'pntu-threshold-notice-2026';

function sumThptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[]): { total30?: number; missingSubjects: SubjectId[] } {
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

export function evaluatePntuThptExamAdmission(profile: ApplicantProfile, context: PntuThptExamEvaluationContext = {}): AdmissionEvaluation {
  const method = pntuAdmissionMethods[0];
  const explanation: CalculationStep[] = [];
  const missingInputs: string[] = [];
  const missingRequirements: MissingRequirement[] = [];
  const missingRules = (method.knowledgeGaps ?? []).map((gap) => gap.label);
  const gapRequirements = (method.knowledgeGaps ?? []).map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label }));
  const reasons: string[] = [];
  let status: 'eligible' | 'ineligible' | 'unknown' = 'unknown';

  if (!context.subjectContext) {
    missingRequirements.push({ kind: 'school-context', code: 'pntu-subject-combination', label: 'Chọn tổ hợp môn xét tuyển PNTU.' });
    reasons.push('Cần chọn tổ hợp môn để kiểm tra ngưỡng đầu vào PNTU (mã phương thức 100).');
  } else {
    const { total30, missingSubjects } = sumThptTotal(profile, context.subjectContext.subjects);

    if (missingSubjects.length > 0) {
      missingInputs.push('Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn cho PNTU.');
      missingRequirements.push(
        ...missingSubjects.map((subjectId) => ({
          kind: 'profile-input' as const,
          code: `pntu-thpt-${subjectId}`,
          label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp PNTU.`,
        }))
      );
      reasons.push('Cần đủ điểm 3 môn trong tổ hợp để kiểm tra ngưỡng PNTU.');
    }

    if (total30 !== undefined) {
      if (!context.programId) {
        missingRequirements.push({
          kind: 'school-context',
          code: 'pntu-program',
          label: 'Chọn ngành PNTU (hiện chỉ hỗ trợ Y khoa, Răng - Hàm - Mặt, Tâm lý học đã xác nhận).',
        });
        reasons.push(`Tổng ${total30}/30 đã tính được, nhưng PNTU công bố ngưỡng theo từng ngành nên cần chọn ngành để kết luận.`);
      } else {
        const threshold = getPntuProgramThreshold(context.programId);
        if (!threshold) {
          missingRequirements.push({
            kind: 'official-rule',
            code: 'pntu-program-catalog-partially-imported',
            label: `Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận.`,
          });
          reasons.push(`Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận.`);
        } else {
          explanation.push({
            id: 'pntu-thpt-program-threshold',
            label: `Ngưỡng PNTU 2026 - ${threshold.programName} (${threshold.programId})`,
            output: total30,
            scale: 30,
            formula: `Tổng điểm 3 môn thi TN THPT phải đạt tối thiểu ${threshold.thptMin30}/30 cho ngành ${threshold.programName} (khu vực 3, không nhân hệ số).`,
            evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026', verification: 'official-source-available', effectiveYear: 2026 }],
          });

          if (total30 < threshold.thptMin30) {
            status = 'ineligible';
            reasons.push(`Tổng ${total30}/30 thấp hơn ngưỡng ngành ${threshold.programName} đã công bố (${threshold.thptMin30}/30).`);
          } else {
            status = 'eligible';
            reasons.push(`Tổng ${total30}/30 đạt ngưỡng ngành ${threshold.programName} đã công bố (${threshold.thptMin30}/30).`);
          }
        }
      }
    }
  }

  return {
    schoolId: 'pntu',
    year: method.year,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status, reasons },
    missingInputs,
    missingRules,
    missingRequirements: [...missingRequirements, ...gapRequirements],
    explanation,
    evidence: [{ sourceId: evidenceSourceId, location: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026', verification: 'official-source-available', effectiveYear: 2026 }],
  } satisfies AdmissionEvaluation;
}

const PNTU_EXACT_METHOD = pntuAdmissionMethods[1];

export interface PntuThptExamExactEvaluationContext {
  programId?: PntuProgramId;
  /** Mã tổ hợp môn PNTU (`B00`/`B03`/`B08`/`A00`/`A01`/`D01`/`D07`) — phải nằm trong
   * `combinationIds` của ngành đã chọn (Quyết định 671/QĐ-TĐHYKPNT mục 4). */
  combinationId?: string;
}

/**
 * PNTU 2026 — nhánh exact, phương thức xét kết quả thi TN THPT (mã 100), toàn bộ 14 ngành đã xác
 * nhận (`PNTU_PROGRAM_THRESHOLDS_2026`). Quyết định 671/QĐ-TĐHYKPNT mục 6 xác nhận tổng điểm xét
 * tuyển = tổng 3 môn (thang 30, không hệ số) + điểm cộng (không áp dụng 2026) + điểm ưu tiên (nếu
 * có), so với ngưỡng đảm bảo chất lượng đầu vào — nên điểm ưu tiên được CỘNG vào tổng thô trước
 * khi so ngưỡng (không chỉ hiển thị tham khảo). Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn
 * quốc (judgment call, xem `priority.ts`).
 */
export function evaluatePntuThptExamExactAdmission(
  profile: ApplicantProfile,
  context: PntuThptExamExactEvaluationContext = {}
): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  const partial = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'pntu',
    year: PNTU_EXACT_METHOD.year,
    methodId: PNTU_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  if (!context.programId) {
    missingRequirements.push({ kind: 'school-context', code: 'pntu-exact-program', label: 'Chọn ngành PNTU.' });
    return partial('Cần chọn ngành PNTU để tính ngưỡng đầu vào.');
  }
  const threshold = getPntuProgramThreshold(context.programId);
  if (!threshold) {
    missingRequirements.push({ kind: 'official-rule', code: 'pntu-program-catalog-partially-imported', label: `Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận.` });
    return partial(`Ngành ${context.programId} chưa có trong bảng ngưỡng PNTU đã xác nhận.`);
  }

  const combinationId = context.combinationId ?? threshold.combinationIds[0];
  if (!threshold.combinationIds.includes(combinationId)) {
    missingRequirements.push({ kind: 'school-context', code: 'pntu-exact-combination', label: `Tổ hợp môn phải thuộc: ${threshold.combinationIds.join(', ')} (ngành ${threshold.programName}).` });
    return partial(`Tổ hợp môn đã chọn không thuộc danh sách tổ hợp của ngành ${threshold.programName} (${threshold.combinationIds.join(', ')}).`);
  }
  const subjects = PNTU_COMBINATION_SUBJECTS[combinationId];

  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) missingSubjects.push(subjectId);
    else total += score;
  }
  if (missingSubjects.length > 0) {
    missingRequirements.push(
      ...missingSubjects.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `pntu-thpt-${subjectId}`,
        label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp ${combinationId} (PNTU).`,
      }))
    );
    return partial(`Cần đủ điểm 3 môn thi TN THPT trong tổ hợp ${combinationId}.`, ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupPntuStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculatePntuEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const total30 = round2(raw30 + priority.effectivePriority30);
  const eligible = total30 >= threshold.thptMin30;

  const reasons = [
    `Ngưỡng đảm bảo chất lượng đầu vào PNTU 2026 - ${threshold.programName} (${threshold.programId}): tổng điểm (đã gồm điểm ưu tiên, không có điểm cộng) ≥ ${threshold.thptMin30}/30.`,
    `Tổng điểm thô 3 môn tổ hợp ${combinationId} = ${raw30}/30, điểm ưu tiên hiệu lực = ${priority.effectivePriority30}/30 → tổng = ${total30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
  ];

  explanation.push({
    id: 'pntu-exact-raw',
    label: 'Tổng điểm 3 môn thi (thô)',
    output: raw30,
    scale: 30,
    formula: subjects.map((s) => SUBJECT_LABELS[s]).join(' + '),
    evidence: pntuThptExamThresholdEvidence.evidence,
  });
  explanation.push({
    id: 'pntu-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced ? '[(30 − tổng thô)/7,5] × Mức ưu tiên KV/ĐT' : 'Mức ưu tiên KV/ĐT (chuẩn toàn quốc, judgment call)',
    evidence: pntuPriorityReductionFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'pntu-exact-total',
    label: 'Tổng điểm dùng để so ngưỡng (đã gồm ưu tiên)',
    output: total30,
    scale: 30,
    formula: 'round2(tổng thô 3 môn + điểm ưu tiên hiệu lực)',
    evidence: pntuThptExamThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'pntu-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với điểm ưu tiên = 0).' });
  }

  return {
    schoolId: 'pntu',
    year: PNTU_EXACT_METHOD.year,
    methodId: PNTU_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status: eligible ? 'eligible' : 'ineligible', reasons },
    score: { value: total30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...pntuThptExamThresholdEvidence.evidence, ...pntuPriorityReductionFormulaEvidence.evidence],
  };
}
