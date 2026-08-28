import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateFbuThptExamAdmission, evaluateFbuThptExamExactAdmission } from './evaluate';

const d01Context = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

describe('FBU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 5.5 } } };

    const result = evaluateFbuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'fbu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6 } } };

    const result = evaluateFbuThptExamAdmission(profile, d01Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'fbu-thpt-english' }));
  });

  it('marks totals below 17/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } } };

    const result = evaluateFbuThptExamAdmission(profile, d01Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'fbu-quality-threshold-2026' }));
  });

  it('marks totals at or above 17/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 5 } } };

    const result = evaluateFbuThptExamAdmission(profile, d01Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    // FBU is now verified-calculator (thanks to the exact method below) — per the same
    // classifyEvaluation rule as CTUMP/PNTU/UHD/TBU, a confidence:'partial'/score:undefined
    // result from this BASE method reports generic status 'partial' once the school carries an
    // exact method; use the base method's own `eligibility.status` (asserted above).
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 5 } } };

    expect(evaluateSchool(profile, 'fbu', { context: d01Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['fbu'], { fbu: d01Context })[0].status).toBe('partial');
  });
});

describe('FBU THPT exact eligibility 2026 (fbu-thpt-exam-exact-2026)', () => {
  it('adds priority points and IELTS bonus points into the total before comparing to the 17/30 floor', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, literature: 5, english: 5 } },
      priority: { region: 'KV1', category: 'UT2' },
      certificates: { ielts: 5.0 },
    };

    const result = evaluateFbuThptExamExactAdmission(profile, d01Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(19.25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateFbuThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });
});
