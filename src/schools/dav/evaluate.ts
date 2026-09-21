import type { AdmissionEvaluation, MissingRequirement } from '../../core/admissionEvaluation';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { CalculationStep } from '../../core/calculationStep';
import type { SubjectId } from '../../core/subjects';
import { SUBJECT_LABELS } from '../../core/subjects';
import type { ThptSubjectContext } from '../thptThresholdOnly';
import { getBestDavInternationalTestConversion, getBestDavLanguageConversion, type DavConversionBand } from './conversion';
import { davAdmissionMethods, type DavMethodId } from './methods';
import { calculateDavEffectivePriority30, lookupDavStandardPriority30 } from './priority';
import { DAV_THPT_COMBINATIONS_BY_PROGRAM, getDavProgram } from './programs';

export interface DavEvaluationContext {
  methodId?: DavMethodId;
  programCode?: string;
  subjectContext?: ThptSubjectContext;
  useEnglishCertificateForThpt?: boolean;
  transcriptSubjects?: readonly SubjectId[];
}

interface ScoreResult {
  total?: number;
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  reasons?: string[];
  explanation?: CalculationStep[];
}

const methodById = Object.fromEntries(davAdmissionMethods.map((method) => [method.id, method]));
const METHOD_IDS = new Set(davAdmissionMethods.map((method) => method.id));
const LAW_PROGRAM_CODES = new Set(['HQT04', 'HQT07']);

function round2(value: number) {
  return Math.round(value * 100) / 100;
}

function result(params: {
  methodId: DavMethodId;
  status: 'eligible' | 'ineligible' | 'unknown';
  reasons: string[];
  missingInputs?: string[];
  missingRequirements?: MissingRequirement[];
  explanation?: CalculationStep[];
  evidenceLocation?: string;
}): AdmissionEvaluation {
  const method = methodById[params.methodId] ?? davAdmissionMethods[3];
  const gapRequirements =
    method.knowledgeGaps?.map((gap) => ({ kind: 'official-rule' as const, code: gap.id, label: gap.label })) ?? [];
  return {
    schoolId: 'dav',
    year: 2026,
    methodId: method.id,
    confidence: 'partial',
    eligibility: { status: params.status, reasons: params.reasons },
    missingInputs: params.missingInputs ?? [],
    missingRules: method.knowledgeGaps?.map((gap) => gap.label) ?? [],
    missingRequirements: [...(params.missingRequirements ?? []), ...gapRequirements],
    explanation: params.explanation ?? [],
    evidence: [
      {
        sourceId: 'dav-threshold-conversion-pdf-2026',
        location: params.evidenceLocation ?? 'PDF pages 1-3, threshold and conversion notice',
        verification: 'verified',
        effectiveYear: 2026,
      },
    ],
  };
}

function subjectScore(profile: ApplicantProfile, subjectId: SubjectId, options: { allowEnglishCertificate: boolean }): number | undefined {
  const rawScore = profile.thpt?.scores?.[subjectId];
  if (subjectId !== 'english' || !options.allowEnglishCertificate) return rawScore;
  const certificate = getBestDavLanguageConversion(profile);
  if (!certificate) return rawScore;
  return rawScore === undefined ? certificate.convertedScore : Math.max(rawScore, certificate.convertedScore);
}

function thptTotal(profile: ApplicantProfile, subjects: readonly SubjectId[], options: { allowEnglishCertificate: boolean }): ScoreResult {
  let total = 0;
  const missing: SubjectId[] = [];
  for (const subjectId of subjects) {
    const score = subjectScore(profile, subjectId, options);
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  if (missing.length > 0) {
    return {
      missingInputs: ['Missing THPT scores for the selected DAV subject combination.'],
      missingRequirements: missing.map((subjectId) => ({
        kind: 'profile-input',
        code: `dav-thpt-${subjectId}`,
        label: `THPT score for ${SUBJECT_LABELS[subjectId]}.`,
      })),
      reasons: ['DAV needs all three subject scores before this threshold can be checked.'],
    };
  }
  return { total: round2(total) };
}

function transcriptAverage(profile: ApplicantProfile, subjectId: SubjectId): number | undefined {
  const scores = [
    profile.transcript?.grade10?.[subjectId],
    profile.transcript?.grade11?.[subjectId],
    profile.transcript?.grade12?.[subjectId],
  ];
  if (scores.some((score) => score === undefined)) return undefined;
  return (scores[0]! + scores[1]! + scores[2]!) / 3;
}

function transcriptEligibility(profile: ApplicantProfile, subjects: readonly SubjectId[] | undefined): ScoreResult {
  if (!subjects || subjects.length !== 2) {
    return {
      reasons: ['DAV method 2 needs the two non-language transcript subjects used for admission.'],
      missingRequirements: [{ kind: 'school-context', code: 'dav-transcript-subjects', label: 'Select the two non-language DAV transcript subjects.' }],
    };
  }

  const missing: SubjectId[] = [];
  const low: string[] = [];
  for (const subjectId of subjects) {
    const average = transcriptAverage(profile, subjectId);
    if (average === undefined) missing.push(subjectId);
    else if (round2(average) < 8.5) low.push(`${SUBJECT_LABELS[subjectId]} ${round2(average)}`);
  }
  if (missing.length > 0) {
    return {
      missingInputs: ['Missing transcript averages for DAV method 2.'],
      missingRequirements: missing.map((subjectId) => ({
        kind: 'profile-input',
        code: `dav-transcript-${subjectId}`,
        label: `Grade 10/11/12 transcript score for ${SUBJECT_LABELS[subjectId]}.`,
      })),
      reasons: ['DAV method 2 needs grade 10/11/12 transcript scores for both non-language subjects.'],
    };
  }
  if (low.length > 0) {
    return { total: 0, reasons: [`Transcript subject average below DAV method 2 minimum 8.5: ${low.join(', ')}.`] };
  }
  return { total: 1 };
}

function languageCertificate(profile: ApplicantProfile): DavConversionBand | undefined {
  return getBestDavLanguageConversion(profile);
}

function languageCertificateRequirement(profile: ApplicantProfile): ScoreResult {
  const converted = languageCertificate(profile);
  if (!converted) {
    return {
      missingInputs: ['Missing DAV-supported language certificate score.'],
      missingRequirements: [{ kind: 'profile-input', code: 'dav-language-certificate', label: 'IELTS 6.0+ or TOEFL iBT 60+ for DAV language-certificate methods.' }],
      reasons: ['DAV methods 2 and 3 need a valid language certificate before threshold eligibility can be checked.'],
    };
  }
  return { total: converted.convertedScore };
}

function lawConstraint(profile: ApplicantProfile, context: DavEvaluationContext): ScoreResult {
  if (!context.programCode || !LAW_PROGRAM_CODES.has(context.programCode)) return { total: 1 };
  if (!context.subjectContext) {
    return {
      reasons: ['DAV law-field programs need a selected subject combination for Math/Literature constraints.'],
      missingRequirements: [{ kind: 'school-context', code: 'dav-law-subject-combination', label: 'Select a DAV subject combination for law-field threshold checking.' }],
    };
  }

  const rawTotal = thptTotal(profile, context.subjectContext.subjects, { allowEnglishCertificate: false });
  if (rawTotal.total === undefined) return rawTotal;
  if (rawTotal.total < 22) return { total: 0, reasons: [`Raw THPT total ${rawTotal.total}/30 is below the DAV law-field minimum 22/30.`] };

  const hasMath = context.subjectContext.subjects.includes('math');
  const hasLiterature = context.subjectContext.subjects.includes('literature');
  const math = profile.thpt?.scores?.math;
  const literature = profile.thpt?.scores?.literature;
  if (hasMath && hasLiterature) {
    if (math === undefined || literature === undefined) {
      return {
        reasons: ['DAV law-field programs need both Math and Literature scores for this combination.'],
        missingRequirements: [{ kind: 'profile-input', code: 'dav-law-math-literature', label: 'THPT Math and Literature scores.' }],
      };
    }
    return math + literature >= 12
      ? { total: 1 }
      : { total: 0, reasons: [`Math + Literature ${round2(math + literature)} is below DAV law-field minimum 12.`] };
  }
  if (hasMath) {
    if (math === undefined) return { reasons: ['DAV law-field programs need Math score for this combination.'] };
    return math >= 6 ? { total: 1 } : { total: 0, reasons: [`Math ${math} is below DAV law-field minimum 6.`] };
  }
  if (hasLiterature) {
    if (literature === undefined) return { reasons: ['DAV law-field programs need Literature score for this combination.'] };
    return literature >= 6 ? { total: 1 } : { total: 0, reasons: [`Literature ${literature} is below DAV law-field minimum 6.`] };
  }
  return { total: 1 };
}

function thresholdFor(context: DavEvaluationContext): number {
  if (context.methodId === 'dav-sat-act-certificate-2026') return 25;
  if (context.subjectContext?.combinationId === 'C00' && !LAW_PROGRAM_CODES.has(context.programCode ?? '')) return 23;
  return 22;
}

function evaluateThptThreshold(profile: ApplicantProfile, context: DavEvaluationContext): ScoreResult {
  if (!context.subjectContext) {
    return {
      reasons: ['DAV needs a selected subject combination before this threshold can be checked.'],
      missingRequirements: [{ kind: 'school-context', code: 'dav-subject-combination', label: 'Select a DAV subject combination.' }],
    };
  }
  const score = thptTotal(profile, context.subjectContext.subjects, { allowEnglishCertificate: context.useEnglishCertificateForThpt === true });
  if (score.total === undefined) return score;
  const threshold = thresholdFor(context);
  return {
    total: score.total,
    explanation: [
      {
        id: 'dav-threshold-check',
        label: `DAV 2026 threshold for ${context.subjectContext.combinationId}`,
        output: score.total,
        scale: 30,
        formula: 'Compare selected THPT combination total with the published DAV intake threshold.',
        evidence: [{ sourceId: 'dav-threshold-conversion-pdf-2026', location: 'PDF page 1, intake threshold table', verification: 'verified', effectiveYear: 2026 }],
      },
    ],
    reasons: score.total >= threshold ? [] : [`Score ${score.total}/30 is below DAV threshold ${threshold}/30.`],
  };
}

function evaluateMethod3(profile: ApplicantProfile): ScoreResult {
  const language = languageCertificateRequirement(profile);
  if (language.total === undefined) return language;
  const international = getBestDavInternationalTestConversion(profile);
  if (!international) {
    return {
      missingInputs: ['Missing DAV-supported SAT/ACT score.'],
      missingRequirements: [{ kind: 'profile-input', code: 'dav-sat-act', label: 'SAT 1330+ or ACT 29+ for DAV method 3.' }],
      reasons: ['DAV method 3 needs a SAT or ACT score before threshold eligibility can be checked.'],
    };
  }
  const total = round2(language.total + international.convertedScore);
  return {
    total,
    explanation: [
      {
        id: 'dav-method3-conversion',
        label: 'DAV 2026 method 3 converted score',
        output: total,
        scale: 30,
        formula: 'Language certificate conversion on scale 10 plus SAT/ACT conversion on scale 20.',
        evidence: [{ sourceId: 'dav-admission-info-pdf-2026', location: 'PDF pages 14-15, Tables 2 and 3', verification: 'verified', effectiveYear: 2026 }],
      },
    ],
    reasons: total >= 25 ? [] : [`Converted score ${total}/30 is below DAV method 3 threshold 25/30.`],
  };
}

const DAV_EXACT_METHOD = davAdmissionMethods.find((method) => method.id === 'dav-thpt-exam-exact-2026')!;
const DAV_EXACT_EVIDENCE = [
  {
    sourceId: 'dav-threshold-conversion-pdf-2026',
    location: 'Thông báo 10/07/2026, mục I.1 — ngưỡng bảo đảm chất lượng đầu vào 22,0 (C00: 23,0), thang 30, "đã bao gồm cả điểm cộng xét thưởng và điểm ưu tiên khu vực, đối tượng"',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
  {
    sourceId: 'dav-admission-info-pdf-2026',
    location: 'Thông tin tuyển sinh 2026 mục 2.4.2 (điểm xét tuyển = M1+M2+M3 + xét thưởng + ưu tiên giảm dần khi ≥22,5) và Bảng 1 (tổ hợp theo ngành)',
    verification: 'verified' as const,
    effectiveYear: 2026,
    verifiedAt: '2026-09-21',
  },
];

/** DAV 2026 PT4 (thi TN THPT), ngành không phải Luật: điểm xét = tổng 3 môn (môn Anh lấy phương án có lợi
 * hơn giữa điểm thi và điểm quy đổi IELTS/TOEFL) + ưu tiên giảm dần; đủ điều kiện ⟺ điểm xét ≥ 22 (C00: 23).
 * Ngoài phạm vi (trả `unknown`): ngành Luật, tổ hợp không mô hình hoá được, tổ hợp không thuộc ngành. */
export function evaluateDavThptExamExactAdmission(profile: ApplicantProfile, context: DavEvaluationContext = {}): AdmissionEvaluation {
  const missingRequirements: MissingRequirement[] = [];
  const unknown = (reason: string, missingInputs: string[] = []): AdmissionEvaluation => ({
    schoolId: 'dav',
    year: DAV_EXACT_METHOD.year,
    methodId: DAV_EXACT_METHOD.id,
    confidence: 'partial',
    eligibility: { status: 'unknown', reasons: [reason] },
    missingInputs,
    missingRules: [],
    missingRequirements,
    explanation: [],
    evidence: [],
  });

  const program = getDavProgram(context.programCode);
  if (!program) {
    missingRequirements.push({ kind: 'school-context', code: 'dav-program', label: 'Chọn ngành DAV (mã HQT01–HQT11).' });
    return unknown('Cần chọn ngành DAV để áp dụng tổ hợp xét tuyển theo ngành.');
  }
  if (program.isLawField) {
    missingRequirements.push({ kind: 'official-rule', code: 'dav-law-out-of-exact-scope', label: 'Luật quốc tế / Luật thương mại quốc tế có điều kiện riêng (Toán/Ngữ văn, ngưỡng thô theo khu vực) — chưa nằm trong phạm vi exact.' });
    return unknown('Ngành Luật của DAV có điều kiện riêng nên chưa tính exact.');
  }
  if (!context.subjectContext || context.subjectContext.subjects.length !== 3) {
    missingRequirements.push({ kind: 'school-context', code: 'dav-subject-combination', label: 'Chọn tổ hợp 3 môn xét tuyển của DAV.' });
    return unknown('Cần chọn tổ hợp 3 môn để tính điểm xét tuyển DAV.');
  }
  const { combinationId, subjects } = context.subjectContext;
  if (!combinationId || !DAV_THPT_COMBINATIONS_BY_PROGRAM[program.programCode]?.includes(combinationId)) {
    missingRequirements.push({ kind: 'school-context', code: 'dav-combination-for-program', label: `Tổ hợp ${combinationId} không có trong Bảng 1 của ngành ${program.programCode} (hoặc chưa mô hình hoá được: D03/D04/D06/DD2).` });
    return unknown(`Tổ hợp ${combinationId} không thuộc phạm vi tính exact của ngành ${program.programCode}.`);
  }

  const certificate = getBestDavLanguageConversion(profile);
  let total = 0;
  const missing: SubjectId[] = [];
  let usedCertificate = false;
  for (const subjectId of subjects) {
    let score = profile.thpt?.scores?.[subjectId];
    if (subjectId === 'english' && certificate && (score === undefined || certificate.convertedScore > score)) {
      score = certificate.convertedScore;
      usedCertificate = true;
    }
    if (score === undefined) missing.push(subjectId);
    else total += score;
  }
  if (missing.length > 0) {
    missingRequirements.push(...missing.map((subjectId) => ({ kind: 'profile-input' as const, code: `dav-thpt-${subjectId}`, label: `Điểm thi TN THPT môn ${SUBJECT_LABELS[subjectId]} cho tổ hợp DAV.` })));
    return unknown('Cần đủ điểm 3 môn của tổ hợp để tính điểm xét tuyển DAV.', ['Chưa đủ điểm 3 môn thi TN THPT trong tổ hợp đã chọn.']);
  }

  const raw30 = round2(total);
  const standardPriority30 = lookupDavStandardPriority30(profile.priority?.region, profile.priority?.category);
  const priority = calculateDavEffectivePriority30({ rawTotal30: raw30, standardPriority30 });
  const dxt30 = round2(Math.min(30, raw30 + priority.effectivePriority30));
  const threshold = combinationId === 'C00' ? 23 : 22;
  const eligible = dxt30 >= threshold;

  const explanation: CalculationStep[] = [
    {
      id: 'dav-exact-raw',
      label: usedCertificate ? 'Tổng điểm 3 môn (môn Anh dùng điểm quy đổi chứng chỉ vì có lợi hơn)' : 'Tổng điểm 3 môn thi TN THPT',
      output: raw30,
      scale: 30,
      formula: subjects.map((subjectId) => SUBJECT_LABELS[subjectId]).join(' + '),
      evidence: DAV_EXACT_EVIDENCE,
    },
    {
      id: 'dav-exact-priority',
      label: priority.reduced ? 'Điểm ưu tiên (đã giảm)' : 'Điểm ưu tiên',
      output: priority.effectivePriority30,
      scale: 30,
      formula: priority.reduced ? '[(30 − tổng điểm đạt được)/7,5] × Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)' : 'Mức ưu tiên KV/ĐT (Điều 7 TT 06/2026)',
      evidence: DAV_EXACT_EVIDENCE,
    },
    {
      id: 'dav-exact-dxt',
      label: 'Điểm xét tuyển',
      output: dxt30,
      scale: 30,
      formula: 'round2(min(30, tổng 3 môn + điểm ưu tiên))',
      evidence: DAV_EXACT_EVIDENCE,
    },
  ];

  if (profile.priority?.region === undefined && profile.priority?.category === undefined) {
    missingRequirements.push({ kind: 'profile-input', code: 'dav-priority-region-category', label: 'Khu vực / đối tượng ưu tiên (chưa nhập — điểm xét đang tính với ưu tiên = 0).' });
  }
  missingRequirements.push(
    { kind: 'official-rule', code: 'dav-bonus-not-modeled', label: 'Điểm xét thưởng học sinh giỏi của Học viện (Bảng 5, tối đa 0,8) chưa có trong hồ sơ — kết quả đúng cho thí sinh không có giải.' },
    { kind: 'official-rule', code: 'dav-other-language-certificate-not-modeled', label: 'Chứng chỉ ngoại ngữ khác tiếng Anh (Pháp/Trung/Nhật/Hàn/Đức) chưa mô hình hoá — chỉ IELTS/TOEFL iBT được dùng thay điểm môn Anh.' }
  );

  return {
    schoolId: 'dav',
    year: DAV_EXACT_METHOD.year,
    methodId: DAV_EXACT_METHOD.id,
    confidence: 'exact-verified',
    eligibility: {
      status: eligible ? 'eligible' : 'ineligible',
      reasons: [
        `Ngưỡng bảo đảm chất lượng đầu vào DAV 2026: ${threshold}/30 (tính trên điểm xét gồm ưu tiên).`,
        `Điểm xét tuyển ${dxt30}/30 → ${eligible ? 'đạt' : 'chưa đạt'} ngưỡng.`,
      ],
    },
    score: { value: dxt30, scale: 30 },
    missingInputs: [],
    missingRules: [],
    missingRequirements,
    explanation,
    evidence: [...DAV_EXACT_EVIDENCE],
  };
}

export function evaluateDavAdmission(profile: ApplicantProfile, context: DavEvaluationContext = {}): AdmissionEvaluation {
  if (context.methodId === 'dav-thpt-exam-exact-2026') return evaluateDavThptExamExactAdmission(profile, context);
  const methodId = context.methodId ?? 'dav-thpt-exam-2026';
  if (!METHOD_IDS.has(methodId)) {
    return result({
      methodId: 'dav-thpt-exam-2026',
      status: 'unknown',
      reasons: ['Select a supported DAV 2026 admission method.'],
      missingRequirements: [{ kind: 'school-context', code: 'dav-method', label: 'Select a supported DAV method.' }],
    });
  }

  const program = getDavProgram(context.programCode);
  if (!program) {
    return result({
      methodId,
      status: 'unknown',
      reasons: ['Select a DAV program to apply program-specific scope and law-field constraints.'],
      missingRequirements: [{ kind: 'school-context', code: 'dav-program', label: 'Select a DAV program.' }],
    });
  }

  if (methodId === 'dav-priority-2026') {
    return result({
      methodId,
      status: 'unknown',
      reasons: ['DAV direct/priority categories are source-decomposed but not executable from the shared applicant profile.'],
      missingRequirements: [{ kind: 'official-rule', code: 'dav-priority-applicant-category-input', label: 'DAV direct/priority applicant category input is not modeled.' }],
    });
  }

  const law = lawConstraint(profile, context);
  if (law.total === undefined) {
    return result({ methodId, status: 'unknown', reasons: law.reasons ?? [], missingInputs: law.missingInputs, missingRequirements: law.missingRequirements });
  }
  if (law.total === 0) return result({ methodId, status: 'ineligible', reasons: law.reasons ?? [] });

  let score: ScoreResult;
  if (methodId === 'dav-sat-act-certificate-2026') {
    score = evaluateMethod3(profile);
  } else {
    if (methodId === 'dav-transcript-certificate-2026') {
      const certificate = languageCertificateRequirement(profile);
      if (certificate.total === undefined) {
        return result({ methodId, status: 'unknown', reasons: certificate.reasons ?? [], missingInputs: certificate.missingInputs, missingRequirements: certificate.missingRequirements });
      }
      const transcript = transcriptEligibility(profile, context.transcriptSubjects);
      if (transcript.total === undefined) {
        return result({ methodId, status: 'unknown', reasons: transcript.reasons ?? [], missingInputs: transcript.missingInputs, missingRequirements: transcript.missingRequirements });
      }
      if (transcript.total === 0) return result({ methodId, status: 'ineligible', reasons: transcript.reasons ?? [] });
    }
    score = evaluateThptThreshold(profile, context);
  }

  if (score.total === undefined) {
    return result({ methodId, status: 'unknown', reasons: score.reasons ?? [], missingInputs: score.missingInputs, missingRequirements: score.missingRequirements });
  }

  const threshold = thresholdFor(context);
  if (score.total < threshold) {
    return result({ methodId, status: 'ineligible', reasons: score.reasons ?? [`Score ${score.total}/30 is below DAV threshold ${threshold}/30.`], explanation: score.explanation });
  }

  return result({
    methodId,
    status: 'eligible',
    reasons: [
      `Score ${score.total}/30 meets DAV's published threshold ${threshold}/30 for ${program.programCode}.`,
      'This is not a final admission-score guarantee; DAV bonus, national priority, cutoff equivalence, and tie-break rules remain modeled as limitations.',
    ],
    explanation: score.explanation,
  });
}
