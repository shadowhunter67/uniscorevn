import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTbuThptExamAdmission, evaluateTbuThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const law = { ...combo, group: 'law' as const };
const standard = { ...combo, group: 'standard' as const };

describe('TBU THPT-exam eligibility 2026 (ngưỡng nhận hồ sơ)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateTbuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tbu-subject-combination' }));
  });

  it('applies the 15/30 standard floor by default', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, literature: 5, english: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateTbuThptExamAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateTbuThptExamAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('reports the Luật (PT1) threshold as unknown — not a fixed TBU-published number (Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateTbuThptExamAdmission(profile, law);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tbu-thongbao-565-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // TBU is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/APD, a confidence:'partial'/score:undefined
    // result from this BASE method reports generic status 'partial' once the school carries an
    // exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    expect(evaluateSchool(profile, 'tbu', { context: standard }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tbu'], { tbu: standard })[0].status).toBe('partial');
  });
});

describe('TBU THPT exact eligibility 2026 (tbu-thpt-exam-exact-2026)', () => {
  it('adds priority points and IELTS bonus points into the total before comparing to the 15/30 floor', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 4, literature: 4, english: 4 } },
      priority: { region: 'KV1', category: 'UT2' },
      certificates: { ielts: 6.5 },
    };

    const result = evaluateTbuThptExamExactAdmission(profile, standard);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('treats ngành Luật as unresolved (no fixed PT1 threshold)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateTbuThptExamExactAdmission(profile, law);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateTbuThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
