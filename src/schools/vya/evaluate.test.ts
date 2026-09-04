import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVyaThptExamAdmission, evaluateVyaTranscriptAdmission } from './evaluate';

const c00Context = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const };
const d01Context = { combinationId: 'D01', subjects: ['literature', 'math', 'english'] as const };
const a04Context = { combinationId: 'A04', subjects: ['math', 'physics', 'geography'] as const };

describe('VYA exact THPT-exam admission calculator 2026 (mã 100, theo ngành)', () => {
  it('marks a profile below the field threshold as ineligible (Công nghệ thông tin, 17/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5, math: 5, english: 5 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
  });

  it('marks a profile at the field threshold as eligible (Công nghệ thông tin, 17/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 5.67, math: 5.67, english: 5.66 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(17);
  });

  it('applies a different (higher) threshold for Tâm lý học than Công nghệ thông tin', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 7, history: 7, geography: 7 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7310401', subjectContext: c00Context });

    // raw = 21 < threshold 22.
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(21);
  });

  it('requires a selected field before computing the score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVyaThptExamAdmission(profile, { subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vya-field' }));
  });

  it('rejects an unmodeled field code', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '9999999', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vya-field' }));
  });

  it('rejects a subject combination not officially published for the selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // Tâm lý học (7310401) combinations are C00/X74/D01/X21/D10 — no A00.
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };
    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7310401', subjectContext: a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vya-subject-combination' }));
  });

  it('accepts A04 (Toán, Vật lí, Địa lí) for Kinh tế', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6.5, physics: 6, geography: 6 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7310101', subjectContext: a04Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(18.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8 } } };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vya-thpt-english' }));
  });

  it('applies standard priority points and threshold reduction near the top of the scale', () => {
    const highProfile: ApplicantProfile = {
      thpt: { scores: { math: 9, physics: 9, chemistry: 8.5 } },
      priority: { region: 'KV1' },
    };
    const a00Context = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const };

    const result = evaluateVyaThptExamAdmission(highProfile, { fieldCode: '7380101', subjectContext: a00Context });

    // raw = 26.5 >= 22.5 -> reduced priority = [(30-26.5)/7.5] * 0.75 = 0.35
    expect(result.explanation.find((step) => step.id === 'vya-thpt-exam-exact-2026-priority')?.output).toBe(0.35);
    expect(result.score?.value).toBe(26.85);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('applies the IELTS certificate bonus (mục 5.2.2, capped separately from priority)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { literature: 6, math: 6, english: 6 } },
      certificates: { ielts: 6.5 },
    };

    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: '7480201', subjectContext: d01Context });

    // raw = 18, bonus (IELTS 6.5 -> 1.25), no priority -> final = 19.25.
    expect(result.explanation.find((step) => step.id === 'vya-thpt-exam-exact-2026-bonus')?.output).toBe(1.25);
    expect(result.score?.value).toBe(19.25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('rejects a field with no threshold100 defined as an unmodeled field (defensive — all 9 fields have threshold100)', () => {
    // Sanity: every modeled field has threshold100, so this only exercises the unmodeled-code path.
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8, math: 8, english: 8 } } };
    const result = evaluateVyaThptExamAdmission(profile, { fieldCode: 'not-a-real-code', subjectContext: d01Context });
    expect(result.confidence).toBe('partial');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { literature: 8.5, history: 8.5, geography: 8.5 } } };
    const context = { fieldCode: '7760102', subjectContext: c00Context };

    expect(evaluateSchool(profile, 'vya', { context }).status).toBe('calculated');
    expect(evaluateSchools(profile, ['vya'], { vya: context })[0].status).toBe('calculated');
  });
});

describe('VYA exact transcript admission calculator 2026 (mã 200, theo ngành)', () => {
  it('computes ĐTB across grade10/11/12 and compares against threshold200', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { literature: 7, history: 7, geography: 7 },
        grade11: { literature: 7.5, history: 7.5, geography: 7.5 },
        grade12: { literature: 8, history: 8, geography: 8 },
      },
    };

    // ĐTB mỗi môn = (7+7.5+8)/3 = 7.5 -> tổng = 22.5, threshold Công tác Thanh thiếu niên = 21.5.
    const result = evaluateVyaTranscriptAdmission(profile, { fieldCode: '7760102', subjectContext: c00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(22.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports missing requirement when Luật is selected (không xét phương thức 200)', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { math: 8, literature: 8, english: 8 },
        grade11: { math: 8, literature: 8, english: 8 },
        grade12: { math: 8, literature: 8, english: 8 },
      },
    };

    const result = evaluateVyaTranscriptAdmission(profile, { fieldCode: '7380101', subjectContext: d01Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vya-transcript-field' }));
  });

  it('reports missing requirement when Quan hệ công chúng is selected (không xét phương thức 200)', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { literature: 8, history: 8, geography: 8 },
        grade11: { literature: 8, history: 8, geography: 8 },
        grade12: { literature: 8, history: 8, geography: 8 },
      },
    };

    const result = evaluateVyaTranscriptAdmission(profile, { fieldCode: '7320108', subjectContext: c00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vya-transcript-field' }));
  });

  it('reports missing transcript years', () => {
    const profile: ApplicantProfile = {
      transcript: {
        grade10: { literature: 8, history: 8, geography: 8 },
        grade11: { literature: 8, history: 8, geography: 8 },
      },
    };

    const result = evaluateVyaTranscriptAdmission(profile, { fieldCode: '7760102', subjectContext: c00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vya-transcript-literature' }));
  });
});
