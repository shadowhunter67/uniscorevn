import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import { round2 } from '../../core/round2';
import { vaaAdmissionMethods } from './methods';
import { VAA_FIELD_THRESHOLD_BY_CODE, type VaaComboGroup, type VaaFieldThreshold } from './thresholds';
import { lookupVaaStandardPriority30, calculateVaaEffectivePriority30 } from './priority';
import { vaaExactFormulaEvidence, vaaFieldThresholdEvidence } from './evidence';
import { applyVaaEnglishCertificate } from './certificate';

/**
 * Môn tự chọn của nhóm THXT lấy trong danh sách này (mục 4.1 thông tin tuyển sinh VAA 2026); VAA
 * không xét môn GDCD.
 */
const VAA_ELECTIVE_POOL: readonly SubjectId[] = [
  'math',
  'english',
  'literature',
  'history',
  'geography',
  'civic-economic-law',
  'physics',
  'chemistry',
  'biology',
  'informatics',
  'technology',
];

/** Cấu hình từng nhóm: môn cố định (nhân 3 / nhân 2) hoặc 'best' = tự chọn cao nhất. */
interface GroupSpec {
  first: SubjectId | 'best';
  second: SubjectId;
  /** Môn thứ ba luôn là tự chọn (cao nhất còn lại hoặc cao nhì). */
}
const GROUP_SPECS: Record<VaaComboGroup, GroupSpec> = {
  TA01: { first: 'english', second: 'literature' },
  TA02: { first: 'english', second: 'math' },
  DT01: { first: 'best', second: 'literature' },
  DT02: { first: 'best', second: 'math' },
};

interface GroupResult {
  group: VaaComboGroup;
  raw30: number;
  firstSubject: SubjectId;
  secondSubject: SubjectId;
  thirdSubject: SubjectId;
}

type Scores = Partial<Record<SubjectId, number>>;

function evaluateGroup(group: VaaComboGroup, scores: Scores): GroupResult | undefined {
  const spec = GROUP_SPECS[group];
  const secondScore = scores[spec.second];
  if (secondScore === undefined) return undefined;
  const fixedFirst = spec.first === 'best' ? undefined : spec.first;
  if (fixedFirst && scores[fixedFirst] === undefined) return undefined;

  const taken = new Set<SubjectId>([spec.second]);
  if (fixedFirst) taken.add(fixedFirst);
  const ranked = VAA_ELECTIVE_POOL.filter((subject) => !taken.has(subject) && scores[subject] !== undefined).sort(
    (a, b) => (scores[b] as number) - (scores[a] as number)
  );

  let firstSubject: SubjectId;
  let thirdSubject: SubjectId;
  if (fixedFirst) {
    if (ranked.length < 1) return undefined;
    firstSubject = fixedFirst;
    thirdSubject = ranked[0];
  } else {
    if (ranked.length < 2) return undefined;
    firstSubject = ranked[0];
    thirdSubject = ranked[1];
  }
  const raw30 = round2(((scores[firstSubject] as number) * 3 + secondScore * 2 + (scores[thirdSubject] as number)) / 2);
  return { group, raw30, firstSubject, secondSubject: spec.second, thirdSubject };
}

const VAA_METHOD = vaaAdmissionMethods[0];

function vaaPartial(input: { missingRequirements?: MissingRequirement[]; reason: string }): AdmissionEvaluation {
  return {
    schoolId: 'vaa',
    year: VAA_METHOD.year,
    methodId: VAA_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [input.reason] },
    missingInputs: [],
    missingRules: [],
    missingRequirements: input.missingRequirements ?? [],
    explanation: [],
    evidence: [],
  };
}

export interface VaaEvaluationContext {
  fieldCode?: string;
}

/**
 * VAA 2026 — Phương thức 1 (xét điểm thi TN THPT). Điểm xét = (môn1 x 3 + môn2 x 2 + môn3)/2 + điểm
 * ưu tiên, thang 30 (`evidence.ts`). Môn thứ nhất/hai/ba theo nhóm mã THXT của mã xét tuyển đã chọn
 * (TA01/TA02/DT01/DT02): môn "tự chọn" lấy theo điểm cao nhất trong danh sách môn thi của thí sinh,
 * nên không cần chọn tổ hợp — mô hình tự chọn nhóm cho điểm cao nhất, đúng quy tắc của trường (không
 * có độ lệch giữa các tổ hợp). So với điểm trúng tuyển CHÍNH THỨC của mã xét tuyển (`thresholds.ts`).
 */
export function evaluateVaaThptExamAdmission(profile: ApplicantProfile, context: VaaEvaluationContext = {}): AdmissionEvaluation {
  const explanation: CalculationStep[] = [];
  const missingRequirements: MissingRequirement[] = [];

  if (!context.fieldCode) {
    missingRequirements.push({ kind: 'school-context', code: 'vaa-field', label: 'Chọn mã xét tuyển VAA để tra điểm trúng tuyển và tính Điểm xét.' });
    return vaaPartial({ missingRequirements, reason: 'Cần chọn mã xét tuyển VAA để áp điểm trúng tuyển và tính Điểm xét.' });
  }
  const entry: VaaFieldThreshold | undefined = VAA_FIELD_THRESHOLD_BY_CODE.get(context.fieldCode);
  if (!entry) {
    missingRequirements.push({ kind: 'school-context', code: 'vaa-field', label: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm trúng tuyển VAA 2026.` });
    return vaaPartial({ missingRequirements, reason: `Mã xét tuyển "${context.fieldCode}" không có trong bảng điểm trúng tuyển VAA 2026.` });
  }

  const certificate = applyVaaEnglishCertificate(profile.thpt?.scores ?? {}, profile.certificates);
  const scores: Scores = certificate.scores;
  const results = entry.groups.map((group) => evaluateGroup(group, scores)).filter((result): result is GroupResult => result !== undefined);
  if (results.length === 0) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vaa-thpt-scores',
      label: `Điểm thi TN THPT đủ cho nhóm tổ hợp của ${entry.name} (${entry.groups.join('/')}): ${entry.groups
        .map((group) => groupRequirementText(group))
        .join('; hoặc ')}.`,
    });
    return vaaPartial({ missingRequirements, reason: `Cần đủ điểm thi TN THPT theo nhóm tổ hợp của ${entry.name} để tính Điểm xét VAA.` });
  }
  const best = results.reduce((a, b) => (b.raw30 > a.raw30 ? b : a));

  const standardPriority30 = lookupVaaStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateVaaEffectivePriority30({ rawTotal30: best.raw30, standardPriority30 });
  const finalScore = round2(Math.min(30, best.raw30 + priority.effectivePriority30));

  const threshold30 = entry.threshold30;
  const eligible = finalScore >= threshold30;
  const status: 'eligible' | 'ineligible' = eligible ? 'eligible' : 'ineligible';

  const reasons: string[] = [
    `Điểm trúng tuyển ${entry.name} (Phương thức 1, thi TN THPT 2026): >= ${threshold30}/30 — Điểm xét của bạn = ${finalScore}/30 (nhóm ${best.group}).`,
    eligible ? 'Đạt/vượt điểm trúng tuyển đã công bố chính thức năm 2026.' : 'Chưa đạt điểm trúng tuyển đã công bố chính thức năm 2026.',
    certificate.used
      ? `Môn Tiếng Anh dùng điểm quy đổi chứng chỉ (${certificate.converted}/10) vì cao hơn điểm thi (quy tắc "điểm nào cao hơn giữ lại" của VAA).`
      : 'Môn Tiếng Anh dùng điểm thi TN THPT (không có chứng chỉ quy đổi cao hơn).',
    'Điểm trúng tuyển VAA đã gồm điểm cộng giải thưởng — mô hình chưa tính khoản này; ngành Ngôn ngữ/học bằng Tiếng Anh còn có tiêu chí phụ ngoại ngữ chưa kiểm tra (xem phần giới hạn dữ liệu).',
  ];

  const subjectText = `${SUBJECT_LABELS[best.firstSubject]} x 3 + ${SUBJECT_LABELS[best.secondSubject]} x 2 + ${SUBJECT_LABELS[best.thirdSubject]}`;
  explanation.push({
    id: 'vaa-exact-raw',
    label: `Điểm tổ hợp thang 30 (nhóm ${best.group})`,
    output: best.raw30,
    scale: 30,
    formula: `(${subjectText}) / 2`,
    evidence: vaaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vaa-exact-priority',
    label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
    output: priority.effectivePriority30,
    scale: 30,
    formula: priority.reduced
      ? '[(30 − điểm xét tuyển)/7,5] × Mức hưởng ưu tiên KV/ĐT (bảng mức của VAA)'
      : 'Mức hưởng ưu tiên KV/ĐT (bảng mức của VAA)',
    evidence: vaaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vaa-exact-final',
    label: 'Điểm xét tuyển (đã cộng ưu tiên)',
    output: finalScore,
    scale: 30,
    formula: 'Điểm tổ hợp + Điểm ưu tiên',
    evidence: vaaExactFormulaEvidence.evidence,
  });
  explanation.push({
    id: 'vaa-exact-threshold',
    label: `Điểm trúng tuyển — ${entry.name}`,
    output: threshold30,
    scale: 30,
    formula: reasons[0],
    evidence: vaaFieldThresholdEvidence.evidence,
  });

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({
      kind: 'profile-input',
      code: 'vaa-priority-region-category',
      label: 'Khu vực / đối tượng ưu tiên (chưa nhập — Điểm xét đang tính với điểm ưu tiên = 0).',
    });
  }

  return {
    schoolId: 'vaa',
    year: VAA_METHOD.year,
    methodId: VAA_METHOD.id,
    confidence: 'exact-verified',
    eligibility: { status, reasons },
    score: { value: finalScore, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...vaaExactFormulaEvidence.evidence, ...vaaFieldThresholdEvidence.evidence],
  };
}

function groupRequirementText(group: VaaComboGroup): string {
  switch (group) {
    case 'TA01':
      return 'Tiếng Anh, Ngữ văn và 1 môn khác';
    case 'TA02':
      return 'Tiếng Anh, Toán và 1 môn khác';
    case 'DT01':
      return 'Ngữ văn và 2 môn khác';
    case 'DT02':
      return 'Toán và 2 môn khác';
  }
}
