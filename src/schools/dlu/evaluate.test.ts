import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDluThptExamAdmission, evaluateDluThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('DLU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 16/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateDluThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'dlu-threshold-notice-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateDluThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('16');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateDluThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dlu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateDluThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'dlu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    // DLU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN/HAU/NTU-HN/UMT).
    expect(evaluateSchool(profile, 'dlu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dlu'], { dlu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateDluThptExamExactAdmission (thi TN THPT — ĐXT theo mã ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn mã ngành -> partial', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'dlu-program-code')).toBe(true);
  });

  it('CNTT (sàn 17), tổng 17 -> exact-verified, eligible', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }), { ...subs, programCode: '7480201' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 17, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('CNTT, tổng 16 -> ineligible', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 6, physics: 5, chemistry: 5 }), { ...subs, programCode: '7480201' });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 16, scale: 30 });
  });

  it('Sư phạm Toán (sàn 21), tổng 21 -> eligible', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 8, physics: 7, chemistry: 6 }), { ...subs, programCode: '7140209' });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Ngôn ngữ Anh: thiếu điểm Tiếng Anh riêng -> unknown dù đủ ngưỡng', () => {
    const r = evaluateDluThptExamExactAdmission(
      { thpt: { scores: { math: 6, literature: 6, physics: 5 } } },
      { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'physics'] as const }, programCode: '7220201' }
    );
    // english không nằm trong tổ hợp D01 chọn tùy ý ở đây -> thiếu điểm english riêng
    expect(r.confidence).toBe('exact-verified');
    expect(r.eligibility?.status).toBe('unknown');
  });

  it('cộng ưu tiên KV1', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }, { region: 'KV1' }), { ...subs, programCode: '7480201' });
    expect(r.score).toEqual({ value: 15.75, scale: 30 });
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateDluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, programCode: '7480201' });
    expect(r.methodId).toBe('dlu-thpt-exam-exact-2026');
  });
});
