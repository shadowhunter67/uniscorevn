import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTuuThptExamAdmission, evaluateTuuThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('TUU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 floor as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };
    const result = evaluateTuuThptExamAdmission(profile, d01Context);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };
    const result = evaluateTuuThptExamAdmission(profile);
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, literature: 4, english: 4 } } };
    expect(evaluateSchool(profile, 'tuu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tuu'], { tuu: d01Context })[0].status).toBe('partial');
  });
});

describe('evaluateTuuThptExamExactAdmission (ĐXT = tổng thô + ưu tiên, theo ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn ngành -> partial', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), d01Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: '7850201' });
    expect(r.confidence).toBe('partial');
  });

  it('Bảo hộ lao động (ngưỡng 15,06): tổng 18 -> eligible', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: '7850201', ...d01Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Bảo hộ lao động: tổng 12 -> ineligible', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 4, literature: 4, english: 4 }), { programCode: '7850201', ...d01Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Tâm lý học (ngưỡng 22,78): tổng 21 -> ineligible dù đạt sàn Bảo hộ lao động', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 7, literature: 7, english: 7 }), { programCode: '7310401', ...d01Context });
    expect(r.score).toEqual({ value: 21, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 vào Điểm xét tuyển', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 4, literature: 4, english: 4 }, { region: 'KV1' }), { programCode: '7850201', ...d01Context });
    expect(r.score).toEqual({ value: 12.75, scale: 30 });
  });

  it('ngành có điều kiện phụ chưa mô hình hoá (Luật) -> partial (không có trong bảng ngưỡng)', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { programCode: '7380101', ...d01Context });
    expect(r.confidence).toBe('partial');
  });

  it('tổ hợp chưa hỗ trợ cho ngành -> partial', () => {
    const r = evaluateTuuThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), {
      programCode: '7850201',
      subjectContext: { combinationId: 'D14', subjects: ['literature', 'history', 'english'] },
    });
    expect(r.confidence).toBe('partial');
  });
});
