import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVaaThptExamAdmission } from './evaluate';
import { VAA_FIELD_THRESHOLDS_2026 } from './thresholds';

const strongProfile: ApplicantProfile = {
  thpt: { scores: { math: 9, literature: 8, english: 8, physics: 7, chemistry: 6 } },
  priority: { region: 'KV3' },
};

describe('VAA THPT-exam admission evaluation 2026', () => {
  it('computes DT02 as (best x3 + math x2 + second best)/2 for a technical program', () => {
    // 7480201S: DT02 only. Pool without Toan: Van 8, Anh 8, Ly 7, Hoa 6 -> best 8, second 8.
    const result = evaluateVaaThptExamAdmission(strongProfile, { fieldCode: '7480201S' });

    // (8*3 + 9*2 + 8) / 2 = 25
    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('picks the higher of DT01 and DT02 for programs allowing both', () => {
    // 7340101 (21): DT01 = best(Toan 9)*3 + Van 8*2 + second(Anh 8) = (27+16+8)/2 = 25.5;
    // DT02 = best(Van 8)*3 + Toan 9*2 + second(Anh 8) = (24+18+8)/2 = 25.
    const result = evaluateVaaThptExamAdmission(strongProfile, { fieldCode: '7340101' });

    expect(result.score?.value).toBe(25.5);
  });

  it('uses English x3 for TA groups (Ngon ngu Anh)', () => {
    // TA01 = Anh 8*3 + Van 8*2 + best other(Toan 9) = (24+16+9)/2 = 24.5
    // TA02 = Anh 8*3 + Toan 9*2 + best other(Van 8) = (24+18+8)/2 = 25
    const result = evaluateVaaThptExamAdmission(strongProfile, { fieldCode: '7220201' });

    expect(result.score?.value).toBe(25);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('is ineligible below the official cutoff', () => {
    const result = evaluateVaaThptExamAdmission(
      { thpt: { scores: { math: 5, literature: 5, english: 5, physics: 5 } }, priority: { region: 'KV3' } },
      { fieldCode: '7520120' }
    );

    // (5*3 + 5*2 + 5)/2 = 15 < 26
    expect(result.score?.value).toBe(15);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('applies the school priority reduction from 22.5/30', () => {
    const result = evaluateVaaThptExamAdmission(
      { thpt: { scores: { math: 8, literature: 8, english: 8, physics: 8 } }, priority: { region: 'KV1', category: 'UT2' } },
      { fieldCode: '7340205' }
    );

    // raw = (24+16+8)/2 = 24; priority 1.75 reduced = ((30-24)/7.5)*1.75 = 1.4 -> 25.4
    expect(result.score?.value).toBe(25.4);
  });

  it('is partial when the fixed or elective subjects are missing', () => {
    // DT02 needs Toan plus two other subjects; only one other is given.
    const result = evaluateVaaThptExamAdmission({ thpt: { scores: { math: 8, literature: 8 } } }, { fieldCode: '7480201S' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vaa-thpt-scores');
  });

  it('returns partial when no field is selected or the code is unknown', () => {
    expect(evaluateVaaThptExamAdmission(strongProfile, {}).missingRequirements?.map((item) => item.code)).toContain('vaa-field');
    expect(evaluateVaaThptExamAdmission(strongProfile, { fieldCode: 'X' }).confidence).toBe('partial');
  });

  it('models 36 codes with cutoffs between 18 and 27.5', () => {
    expect(VAA_FIELD_THRESHOLDS_2026).toHaveLength(36);
    expect(new Set(VAA_FIELD_THRESHOLDS_2026.map((entry) => entry.code)).size).toBe(36);
    expect(Math.min(...VAA_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(18);
    expect(Math.max(...VAA_FIELD_THRESHOLDS_2026.map((entry) => entry.threshold30))).toBe(27.5);
  });
});
