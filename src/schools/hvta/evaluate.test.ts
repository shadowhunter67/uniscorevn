import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHvtaAdmission, evaluateHvtaThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const c00Context = { subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };
const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('HVTA THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHvtaAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hvta-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    expect(evaluateSchool(profile, 'hvta', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hvta'], { hvta: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateHvtaThptExamExactAdmission (ngưỡng 18/30 + Toán/Văn ≥6/10)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng 18, A00, Toán 6 -> eligible', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), a00Context);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 18 nhưng Toán < 6 (A00) -> ineligible do điều kiện môn chính', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 5, physics: 6.5, chemistry: 6.5 }), a00Context);
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('tổng 17 (dưới 18) -> ineligible dù Toán đạt', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('C00: Văn 6 đạt điều kiện, không cần Toán', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ literature: 6, history: 6, geography: 6 }), c00Context);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('D01: cần CẢ Toán và Văn ≥6, thiếu Văn -> ineligible', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 7, literature: 5, english: 6 }), d01Context);
    expect(r.score).toEqual({ value: 18, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('điểm ưu tiên KHÔNG ảnh hưởng eligibility, chỉ hiển thị tham khảo', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 5, physics: 6.5, chemistry: 6.5 }, { region: 'KV1' }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 18.75, scale: 30 });
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateHvtaThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), a00Context);
    expect(r.methodId).toBe('hvta-thpt-exam-exact-2026');
  });
});
