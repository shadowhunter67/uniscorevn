import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { checkPtitDomesticExamThreshold } from './eligibility';
import { evaluatePtitDomesticExamAdmission, evaluatePtitThptExamExactAdmission } from './evaluate';

const a00 = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('PTIT domestic exam eligibility 2026', () => {
  it('checks V-ACT threshold from shared profile', () => {
    const profile: ApplicantProfile = { exams: { vact: { total: 620, totalSource: 'user-total-input' } } };
    const result = evaluatePtitDomesticExamAdmission(profile);
    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('marks V-ACT below 600 as ineligible for the domestic exam route', () => {
    const result = evaluatePtitDomesticExamAdmission({}, { exam: 'vact', rawScore: 599 });
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('locks every official domestic threshold', () => {
    expect(checkPtitDomesticExamThreshold('tsa', 50).pass).toBe(true);
    expect(checkPtitDomesticExamThreshold('hsa', 75).pass).toBe(true);
    expect(checkPtitDomesticExamThreshold('vact', 600).pass).toBe(true);
    expect(checkPtitDomesticExamThreshold('spt', 15).pass).toBe(true);
  });
});

describe('PTIT THPT exact calculator 2026 (PT5)', () => {
  it('requires a campus to resolve the threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const result = evaluatePtitThptExamExactAdmission(profile, a00);
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ptit-campus' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvh' });
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ptit-thpt-chemistry' }));
  });

  it('BVH (20/30): total 21 is eligible with an exact final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvh' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toEqual({ value: 21, scale: 30 });
  });

  it('BVH (20/30): total 18 is ineligible, still returns an exact score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvh' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toEqual({ value: 18, scale: 30 });
  });

  it('BVS (16.5/30): total 18 clears the southern threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvs' });
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('adds an IELTS certificate bonus to the final score', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } }, certificates: { ielts: 6.5 } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvh' });
    expect(result.score).toEqual({ value: 22, scale: 30 });
  });

  it('reduces priority when the raw+bonus total is at/above 22.5', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1' } };
    const result = evaluatePtitThptExamExactAdmission(profile, { ...a00, campusId: 'bvh' });
    // raw 24 >= 22.5 -> priority = (30-24)/7.5 * 0.75 = 0.6 ; final 24 + 0.6 = 24.6
    expect(result.score).toEqual({ value: 24.6, scale: 30 });
  });
});

