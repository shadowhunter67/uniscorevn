import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateNtuThptExamAdmission } from './evaluate';
import { NTU_COMBO_SLOTS } from './combos';
import { NTU_PROGRAM_THRESHOLDS_2026 } from './thresholds';

const profile: ApplicantProfile = {
  thpt: { scores: { math: 8, literature: 7, english: 7, chemistry: 6 } },
  priority: { region: 'KV3' },
};

describe('NTU THPT-exam admission evaluation 2026 (thang 40)', () => {
  it('computes T2VA as Toan*2 + Van + Anh and compares with the program cutoff', () => {
    // 7340101A: T2VA cutoff 24. Score = 8*2 + 7 + 7 = 30 -> eligible
    const result = evaluateNtuThptExamAdmission(profile, { programCode: '7340101A' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score).toEqual({ value: 30, scale: 40 });
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('is ineligible below every combo cutoff', () => {
    const weak: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV3' } };
    // 7340101A needs T2VA >= 24; 5*2+5+5 = 20
    const result = evaluateNtuThptExamAdmission(weak, { programCode: '7340101A' });

    expect(result.score?.value).toBe(20);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('chooses the combo with the best margin against its own cutoff', () => {
    // 7420201MP: T2VA 20 (score 30, margin 10); T2VH 21.41 (8*2+7+6 = 29, margin 7.59);
    // TVAH 20.93 (8+7+7+6 = 28, margin 7.07) -> best is T2VA
    const result = evaluateNtuThptExamAdmission(profile, { programCode: '7420201MP' });

    expect(result.score?.value).toBe(30);
    expect(result.explanation?.[0]?.label).toContain('T2VA');
  });

  it('every combo has total weight 4, i.e. a 40-point scale', () => {
    for (const [comboCode, slots] of Object.entries(NTU_COMBO_SLOTS)) {
      expect(slots.reduce((sum, slot) => sum + slot.weight, 0), comboCode).toBe(4);
    }
  });

  it('applies thang-40 priority (x4/3) with reduction near the cap', () => {
    const high: ApplicantProfile = {
      thpt: { scores: { math: 9, literature: 9, english: 9 } },
      priority: { region: 'KV1', category: 'UT2' },
    };
    // raw T2VA = 36 (thang 30 eq. 27) -> reduced: ((30-27)/7.5)*1.75 = 0.7 -> x4/3 = 0.93 -> 36.93
    const result = evaluateNtuThptExamAdmission(high, { programCode: '7340101A' });

    expect(result.score?.value).toBe(36.93);
  });

  it('is partial when no combo has all its subjects', () => {
    const result = evaluateNtuThptExamAdmission({ thpt: { scores: { math: 8 } } }, { programCode: '7340101A' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('ntu-thpt-scores');
  });

  it('returns partial for a missing or unknown program', () => {
    expect(evaluateNtuThptExamAdmission(profile, {}).missingRequirements?.map((item) => item.code)).toContain('ntu-program');
    expect(evaluateNtuThptExamAdmission(profile, { programCode: 'X' }).confidence).toBe('partial');
  });

  it('models 53 programs and every non-Japanese/French combo has slot definitions', () => {
    expect(NTU_PROGRAM_THRESHOLDS_2026).toHaveLength(53);
    for (const entry of NTU_PROGRAM_THRESHOLDS_2026) {
      for (const comboCode of Object.keys(entry.cutoffs40)) {
        if (comboCode === 'T2VN' || comboCode === 'T2VP') continue;
        expect(NTU_COMBO_SLOTS[comboCode], `${entry.code} ${comboCode}`).toBeDefined();
      }
    }
    const all = NTU_PROGRAM_THRESHOLDS_2026.flatMap((entry) => Object.values(entry.cutoffs40));
    expect(Math.min(...all)).toBe(19.62);
    expect(Math.max(...all)).toBe(27.66);
  });
});
