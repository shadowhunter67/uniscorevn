import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { huitComparisonAdapter } from './comparison';
import { evaluateHuitThptExamAdmission, evaluateHuitThptExamProgramExactAdmission, evaluateHuitTranscriptAdmission } from './evaluate';
import { HUIT_PROGRAMS_2026 } from './programs';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<(typeof A01_SUBJECTS)[number], number>>): ApplicantProfile {
  return { thpt: { scores } };
}

describe('evaluateHuitThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateHuitThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'huit-subject-combination')).toBe(true);
  });

  it('thiếu điểm 1 môn -> missingInputs + missingRequirement profile-input', () => {
    const evaluation = evaluateHuitThptExamAdmission(profileWithThpt({ math: 8, physics: 7 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.missingInputs.length).toBeGreaterThan(0);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'huit-thpt-english')).toBe(true);
  });

  it('nhóm standard: 16 pass, 15.99 fail', () => {
    const pass = evaluateHuitThptExamAdmission(profileWithThpt({ math: 6, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });
    expect(pass.eligibility?.status).toBe('eligible');

    const fail = evaluateHuitThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });
    expect(fail.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: ngưỡng 20, tổng 16 dưới ngưỡng -> ineligible', () => {
    const evaluation = evaluateHuitThptExamAdmission(profileWithThpt({ math: 6, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateHuitThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });
});

describe('evaluateHuitTranscriptAdmission', () => {
  it('chưa nhập tổng điểm -> unknown + missingRequirement', () => {
    const evaluation = evaluateHuitTranscriptAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'huit-transcript-total-score')).toBe(true);
  });

  it('nhóm standard: 20 pass, 19.99 fail', () => {
    expect(evaluateHuitTranscriptAdmission(profileWithThpt({}), { totalScore30: 20, thresholdGroup: 'standard' }).eligibility?.status).toBe('eligible');
    expect(evaluateHuitTranscriptAdmission(profileWithThpt({}), { totalScore30: 19.99, thresholdGroup: 'standard' }).eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: 20 pass, 19.99 fail', () => {
    expect(evaluateHuitTranscriptAdmission(profileWithThpt({}), { totalScore30: 20, thresholdGroup: 'law' }).eligibility?.status).toBe('eligible');
    expect(evaluateHuitTranscriptAdmission(profileWithThpt({}), { totalScore30: 19.99, thresholdGroup: 'law' }).eligibility?.status).toBe('ineligible');
  });

  it('methodId khớp phương thức học tập THPT', () => {
    const evaluation = evaluateHuitTranscriptAdmission(profileWithThpt({}), { totalScore30: 20 });
    expect(evaluation.methodId).toBe('huit-transcript-2026');
  });
});

describe('evaluateHuitThptExamProgramExactAdmission (ngưỡng thi TN THPT theo ngành)', () => {
  type Subj = 'math' | 'physics' | 'chemistry' | 'english' | 'literature' | 'history' | 'geography';
  const ctx = (programCode: string, combinationId: string, subjects: readonly Subj[]) => ({ programCode, subjectContext: { combinationId, subjects } });
  const itD01 = ctx('7480201', 'D01', ['math', 'literature', 'english']);
  const lawD01 = ctx('7380101', 'D01', ['math', 'literature', 'english']);
  const scores = (s: Partial<Record<Subj, number>>, extra: Partial<ApplicantProfile> = {}): ApplicantProfile => ({ thpt: { scores: s }, ...extra });

  it('39 ngành, mã không trùng, mỗi ngành 4 tổ hợp, 2 ngành Luật', () => {
    expect(HUIT_PROGRAMS_2026).toHaveLength(39);
    expect(new Set(HUIT_PROGRAMS_2026.map((p) => p.code)).size).toBe(39);
    expect(HUIT_PROGRAMS_2026.every((p) => p.combinations.length === 4)).toBe(true);
    expect(HUIT_PROGRAMS_2026.filter((p) => p.group === 'law').map((p) => p.code)).toEqual(['7380101', '7380107']);
  });

  it('ngành thường ngưỡng 16: 16,5 đạt, 15,75 không (kể cả không ưu tiên)', () => {
    const pass = evaluateHuitThptExamProgramExactAdmission(scores({ math: 6, literature: 5, english: 5.5 }), itD01);
    expect(pass.confidence).toBe('exact-verified');
    expect(pass.methodId).toBe('huit-thpt-exam-program-exact-2026');
    expect(pass.eligibility?.status).toBe('eligible');
    expect(pass.score).toBeUndefined();
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 5.25, literature: 5, english: 5.5 }), itD01).eligibility?.status).toBe('ineligible');
  });

  it('Luật ngưỡng 20 và Toán/Văn ≥ 6: 20 đạt, 19,75 không, Toán 5,75 loại dù tổng đủ', () => {
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 6.5, literature: 6.5, english: 7 }), lawD01).eligibility?.status).toBe('eligible');
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 6.5, literature: 6.25, english: 7 }), lawD01).eligibility?.status).toBe('ineligible');
    const lowMath = evaluateHuitThptExamProgramExactAdmission(scores({ math: 5.75, literature: 7, english: 8 }), lawD01);
    expect(lowMath.eligibility?.status).toBe('ineligible');
    expect(lowMath.eligibility?.reasons.join(' ')).toContain('Toán');
  });

  it('Luật tổ hợp C00 (không có Toán) chỉ kiểm Ngữ văn ≥ 6', () => {
    const c00 = ctx('7380101', 'C00', ['literature', 'history', 'geography']);
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ literature: 7, history: 7, geography: 6.5 }), c00).eligibility?.status).toBe('eligible');
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ literature: 5.5, history: 8, geography: 8 }), c00).eligibility?.status).toBe('ineligible');
  });

  it('vùng ưu tiên: thô 15,5 < 16 nhưng + KV1 0,75 ≥ 16 → unknown; +0,75 vẫn < 16 → ineligible', () => {
    const between = evaluateHuitThptExamProgramExactAdmission(scores({ math: 5.5, literature: 5, english: 5 }, { priority: { region: 'KV1' } }), itD01);
    expect(between.eligibility?.status).toBe('unknown');
    expect(between.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huit-priority-vs-threshold-unspecified' }));
    const below = evaluateHuitThptExamProgramExactAdmission(scores({ math: 5, literature: 4.5, english: 5 }, { priority: { region: 'KV1' } }), itD01);
    expect(below.eligibility?.status).toBe('ineligible');
  });

  it('tổ hợp không thuộc ngành (CNTT không có A01) → unknown', () => {
    const r = evaluateHuitThptExamProgramExactAdmission(scores({ math: 9, physics: 9, english: 9 }), ctx('7480201', 'A01', ['math', 'physics', 'english']));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'huit-combination-for-program' }));
  });

  it('thiếu/không hỗ trợ ngành (kể cả chương trình liên kết) → unknown với yêu cầu đúng', () => {
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 9 }), { subjectContext: itD01.subjectContext }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'huit-program' }));
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 9, literature: 9, english: 9 }), ctx('LK7220204', 'D01', ['math', 'literature', 'english'])).eligibility?.status).toBe('unknown');
    expect(evaluateHuitThptExamProgramExactAdmission(scores({ math: 9, literature: 9 }), itD01).missingRequirements).toContainEqual(expect.objectContaining({ code: 'huit-thpt-english' }));
  });

  it('adapter: có chọn ngành dùng nhánh theo ngành, chưa chọn giữ baseline', () => {
    const profile = scores({ math: 6, literature: 5, english: 5.5 });
    expect(huitComparisonAdapter.evaluate(profile, itD01).evaluation.methodId).toBe('huit-thpt-exam-program-exact-2026');
    expect(huitComparisonAdapter.evaluate(profile, { subjectContext: itD01.subjectContext }).evaluation.methodId).toBe('huit-thpt-exam-2026');
  });
});
