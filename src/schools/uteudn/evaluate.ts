import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import { round2 } from '../../core/round2';
import { SUBJECT_LABELS, type SubjectId } from '../../core/subjects';
import { evaluateThptThresholdOnly, type ThresholdOnlyEvaluationContext } from '../thptThresholdOnly';
import { UTEUDN_THPT_THRESHOLD } from './eligibility';
import { uteudnAdmissionMethods } from './methods';
import { calculateUteEffectivePriority30, lookupUteStandardPriority30 } from './priority';
import { getUteProgram } from './programs';

export function evaluateUteudnThptExamAdmission(profile: ApplicantProfile, context: ThresholdOnlyEvaluationContext = {}) {
  return evaluateThptThresholdOnly({
    schoolId: 'uteudn',
    schoolShortName: 'UTE',
    method: uteudnAdmissionMethods[0],
    profile,
    context,
    threshold: UTEUDN_THPT_THRESHOLD,
    evidenceSourceId: 'uteudn-quality-threshold-2026',
  });
}

const UTE_EXACT_METHOD = uteudnAdmissionMethods.find((method) => method.id === 'uteudn-thpt-hocba-exact-2026')!;
const UTE_EXACT_EVIDENCE = [
  {
    sourceId: 'uteudn-xet-tuyen-ket-hop-2026',
    location: 'Ảnh "Công thức Điểm xét tuyển (ĐXT)" và bảng tổ hợp/hệ số THPT-học bạ theo ngành (Hinh1-Hinh7)',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
  {
    sourceId: 'uteudn-nguong-dau-vao-2026',
    location: 'Bảng ảnh "Điểm ngưỡng đầu vào đại học chính quy năm 2026" + ghi chú (SPKT-CNTT so tổng 3 môn THPT + ưu tiên; ngành còn lại so ĐXT)',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

export interface UteudnExactEvaluationContext {
  /** Mã ngành/mã xét tuyển (VD '7480201', '7510205KT'). */
  programCode?: string;
  subjectContext?: { combinationId?: string; subjects: readonly SubjectId[] };
}

/** TB chung 3 năm (lớp 10, 11, 12) của 1 môn, làm tròn 2 số lẻ; `undefined` nếu thiếu năm nào. */
function hocBaSubjectAverage(profile: ApplicantProfile, subjectId: SubjectId): number | undefined {
  const scores = [profile.transcript?.grade10?.[subjectId], profile.transcript?.grade11?.[subjectId], profile.transcript?.grade12?.[subjectId]];
  if (scores.some((score) => score === undefined)) return undefined;
  return round2((scores[0]! + scores[1]! + scores[2]!) / 3);
}

/** UTE-ĐN 2026 (xét điểm thi TN THPT kết hợp học bạ): ĐXT = THPT×hệ số + HB×hệ số + ưu tiên (giảm dần khi ≥ 22,5);
 * đủ điều kiện ⟺ đạt ngưỡng đầu vào của ngành. Điểm cộng thành tích học tập chưa mô hình hoá. */
export function evaluateUteudnCombinedExactAdmission(profile: ApplicantProfile, context: UteudnExactEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'uteudn',
    year: UTE_EXACT_METHOD.year,
    methodId: UTE_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getUteProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'uteudn-program', label: 'Chọn ngành/chuyên ngành UTE (mã xét tuyển, VD 7480201).' });
    return unknown('Cần chọn ngành UTE vì ngưỡng và hệ số THPT/học bạ khác nhau theo ngành.');
  }
  if (!program.combinations) {
    missingRequirements.push({ kind: 'official-rule', code: 'uteudn-program-out-of-exact-scope', label: `${program.name}: ${program.outOfScopeReason ?? 'chưa mô hình hoá.'}` });
    return unknown(`Ngành ${program.name} của UTE chưa nằm trong phạm vi tính exact.`);
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'uteudn-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của UTE.' });
    return unknown('Cần chọn tổ hợp 3 môn để tính điểm xét tuyển UTE.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !program.combinations.includes(combinationId)) {
    missingRequirements.push({
      kind: 'school-context',
      code: 'uteudn-combination-for-program',
      label: `Tổ hợp ${combinationId ?? ''} không có trong danh sách của ngành ${program.name}.`,
    });
    return unknown(`Tổ hợp ${combinationId ?? ''} không thuộc ngành ${program.name}.`);
  }

  const thptMissing = subjects.filter((subjectId) => profile.thpt?.scores?.[subjectId] === undefined);
  const needsHocBa = program.hbWeight > 0;
  const hocBaMissing = needsHocBa ? subjects.filter((subjectId) => hocBaSubjectAverage(profile, subjectId) === undefined) : [];
  if (thptMissing.length > 0 || hocBaMissing.length > 0) {
    missingRequirements.push(
      ...thptMissing.map((subjectId) => ({ kind: 'profile-input' as const, code: `uteudn-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp UTE.` })),
      ...hocBaMissing.map((subjectId) => ({
        kind: 'profile-input' as const,
        code: `uteudn-hocba-${subjectId}`,
        label: `Điểm học bạ môn ${SUBJECT_LABELS[subjectId]} cả 3 năm lớp 10/11/12 (TB cả năm).`,
      }))
    );
    return unknown('Cần đủ điểm thi TN THPT và điểm học bạ 3 năm của 3 môn trong tổ hợp để tính ĐXT của UTE.', [
      ...(thptMissing.length > 0 ? ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.'] : []),
      ...(hocBaMissing.length > 0 ? ['Chưa đủ điểm học bạ 3 năm của 3 môn trong tổ hợp đã chọn.'] : []),
    ]);
  }

  const thptTotal30 = round2(subjects.reduce((sum, subjectId) => sum + profile.thpt!.scores![subjectId]!, 0));
  const hocBaTotal30 = needsHocBa ? round2(subjects.reduce((sum, subjectId) => sum + hocBaSubjectAverage(profile, subjectId)!, 0)) : 0;
  const weighted30 = round2(thptTotal30 * program.thptWeight + hocBaTotal30 * program.hbWeight);
  const standardPriority30 = lookupUteStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateUteEffectivePriority30({ rawTotal30: weighted30, standardPriority30 });
  const dxt30 = round2(Math.min(30, weighted30 + priority.effectivePriority30));

  let compared30 = dxt30;
  let basisLabel = 'Điểm xét tuyển (ĐXT)';
  if (program.thresholdBasis === 'thpt-raw-plus-priority') {
    const rawPriority = calculateUteEffectivePriority30({ rawTotal30: thptTotal30, standardPriority30 });
    compared30 = round2(Math.min(30, thptTotal30 + rawPriority.effectivePriority30));
    basisLabel = 'Tổng 3 môn THPT (không hệ số) + điểm ưu tiên';
  }
  const eligible = compared30 >= program.threshold30;

  const explanation: CalculationStep[] = [
    {
      id: 'uteudn-exact-thpt',
      label: 'Điểm thi TN THPT (tổng 3 môn)',
      output: thptTotal30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: UTE_EXACT_EVIDENCE,
    },
    ...(needsHocBa
      ? [
          {
            id: 'uteudn-exact-hocba',
            label: 'Điểm học bạ (tổng 3 môn, mỗi môn TB 3 năm)',
            output: hocBaTotal30,
            scale: 30,
            formula: 'Σ round2((lớp 10 + lớp 11 + lớp 12)/3) của 3 môn trong tổ hợp',
            evidence: UTE_EXACT_EVIDENCE,
          },
        ]
      : []),
    {
      id: 'uteudn-exact-weighted',
      label: `Điểm THPT × ${program.thptWeight} + điểm học bạ × ${program.hbWeight}`,
      output: weighted30,
      scale: 30,
      formula: 'round2(THPT × hệ số THPT + HB × hệ số HB)',
      evidence: UTE_EXACT_EVIDENCE,
    },
    {
      id: 'uteudn-exact-priority',
      label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
      output: priority.effectivePriority30,
      scale: 30,
      formula: priority.reduced ? '[(30 − tổng điểm đạt được)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)',
      evidence: UTE_EXACT_EVIDENCE,
    },
    {
      id: 'uteudn-exact-dxt',
      label: 'Điểm xét tuyển (ĐXT)',
      output: dxt30,
      scale: 30,
      formula: 'round2(min(30, THPT×hệ số + HB×hệ số + điểm ưu tiên))',
      evidence: UTE_EXACT_EVIDENCE,
    },
  ];

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'uteudn-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — đang tính với ưu tiên = 0).' });
  }
  missingRequirements.push({
    kind: 'official-rule',
    code: 'uteudn-bonus-not-modeled',
    label: 'Điểm cộng thành tích học tập theo thông báo minh chứng của UTE chưa có trong hồ sơ — kết quả đúng cho thí sinh không có điểm cộng.',
  });

  return {
    schoolId: 'uteudn',
    year: UTE_EXACT_METHOD.year,
    methodId: UTE_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: eligible ? 'eligible' : 'ineligible',
      reasons: [
        `Ngưỡng đảm bảo chất lượng đầu vào UTE 2026 ngành ${program.name}: ${program.threshold30}/30 (so ${basisLabel}).`,
        `${basisLabel} của bạn ${compared30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
      ],
    },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...UTE_EXACT_EVIDENCE],
  };
}
