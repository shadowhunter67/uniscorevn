import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVnufThptExamAdmission, evaluateVnufThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VNUF THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vnuf-admission-scheme-2026' }));
  });

  it('marks profiles at or above the common 15/30 baseline as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vnuf-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateVnufThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vnuf-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    expect(evaluateSchool(profile, 'vnuf', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vnuf'], { vnuf: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateVnufThptExamExactAdmission (tổng thô so ngưỡng 15/30, đồng nhất mọi ngành)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateVnufThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }));
    expect(r.confidence).toBe('partial');
  });

  it('tổng 15 -> eligible', () => {
    const r = evaluateVnufThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng 12 -> ineligible', () => {
    const r = evaluateVnufThptExamExactAdmission(p({ math: 4, physics: 4, chemistry: 4 }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('điểm ưu tiên chỉ hiển thị tham khảo, không cộng vào so sánh ngưỡng nhưng có trong Điểm xét tham khảo', () => {
    const r = evaluateVnufThptExamExactAdmission(p({ math: 4, physics: 4, chemistry: 4 }, { region: 'KV1' }), a00Context);
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 12.75, scale: 30 });
  });
});
