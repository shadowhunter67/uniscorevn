import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTksAdmission, evaluateTksThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TKS THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const result = evaluateTksAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    expect(evaluateSchool(profile, 'tks', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tks'], { tks: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateTksThptExamExactAdmission (quy đổi D01 + độ lệch tổ hợp + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn ngành/cơ sở -> partial', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), d01Context);
    expect(r.confidence).toBe('partial');
  });

  it('tổ hợp ngoài bảng độ lệch -> partial', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 8, physics: 8, biology: 8 }), {
      group: 'englishLanguageMain',
      subjectContext: { combinationId: 'A02', subjects: ['math', 'physics', 'biology'] as const },
    });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'tks-combination-out-of-scope' }));
  });

  it('Ngôn ngữ Anh, D01, tổng 21.5 -> eligible (ĐXT = 21.5, ngưỡng 21.5)', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 7, literature: 7, english: 7.5 }), { group: 'englishLanguageMain', ...d01Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 21.5, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Ngôn ngữ Anh, D01, tổng 21 -> ineligible', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 7, literature: 7, english: 7 }), { group: 'englishLanguageMain', ...d01Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('A00 cộng độ lệch +1.45 giúp đạt ngưỡng', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { group: 'englishLanguageMain', ...a00Context });
    expect(r.score).toEqual({ value: 22.45, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateTksThptExamExactAdmission(p({ math: 8, literature: 8, english: 8 }), { group: 'lawMain', ...d01Context });
    expect(r.methodId).toBe('tks-thpt-exam-exact-2026');
  });
});
