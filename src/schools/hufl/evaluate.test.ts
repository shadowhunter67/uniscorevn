import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHuflThptExamAdmission, evaluateHuflThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HUFL THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };
    const result = evaluateHuflThptExamAdmission(profile, d01Context);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };
    const result = evaluateHuflThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };
    expect(evaluateSchool(profile, 'hufl', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hufl'], { hufl: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateHuflThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn ngành -> partial', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), d01Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: '7310630' });
    expect(r.confidence).toBe('partial');
  });

  it('Việt Nam học (ngưỡng 15): tổng 18 -> eligible', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: '7310630', ...d01Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Việt Nam học: tổng 12 -> ineligible', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 4, literature: 4, english: 4 }), { programCode: '7310630', ...d01Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Sư phạm Tiếng Anh (ngưỡng 27,77): tổng 27 -> ineligible dù đạt sàn Việt Nam học', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 9, literature: 9, english: 9 }), { programCode: '7140231', ...d01Context });
    expect(r.score).toEqual({ value: 27, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 4, literature: 4, english: 4 }, { region: 'KV1' }), { programCode: '7310630', ...d01Context });
    expect(r.score).toEqual({ value: 12.75, scale: 30 });
  });

  it('tổ hợp dùng ngoại ngữ Pháp/Trung/Nhật/Nga/Hàn (chưa hỗ trợ) -> partial', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), {
      programCode: '7220202',
      subjectContext: { combinationId: 'D02', subjects: ['literature', 'math', 'english'] },
    });
    expect(r.confidence).toBe('partial');
  });

  it('ngành không có trong bảng -> partial', () => {
    const r = evaluateHuflThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: 'not-a-program', ...d01Context });
    expect(r.confidence).toBe('partial');
  });
});
