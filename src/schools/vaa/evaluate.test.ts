import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVaaThptExamAdmission, evaluateVaaTranscriptAdmission } from './evaluate';
import { VAA_FIELD_THRESHOLDS_2026 } from './thresholds';
import { convertVaaEnglishCertificate, convertVaaKoreanChineseCertificate } from './certificate';

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

describe('VAA English certificate conversion', () => {
  it('maps IELTS and TOEFL iBT to the official 10-point English score and keeps the higher', () => {
    expect(convertVaaEnglishCertificate({ ielts: 7 })).toBe(10);
    expect(convertVaaEnglishCertificate({ ielts: 6.5 })).toBe(9.5);
    expect(convertVaaEnglishCertificate({ ielts: 5 })).toBe(8);
    expect(convertVaaEnglishCertificate({ ielts: 4.5 })).toBe(7.5);
    expect(convertVaaEnglishCertificate({ ielts: 4 })).toBeUndefined();
    expect(convertVaaEnglishCertificate({ toeflIbt: 85 })).toBe(10);
    expect(convertVaaEnglishCertificate({ toeflIbt: 79 })).toBe(9.5);
    expect(convertVaaEnglishCertificate({ toeflIbt: 46 })).toBe(8);
    expect(convertVaaEnglishCertificate({ toeflIbt: 45 })).toBeUndefined();
    expect(convertVaaEnglishCertificate({ ielts: 5.5, toeflIbt: 85 })).toBe(10);
  });

  it('replaces a lower English exam score with the converted certificate score', () => {
    const base: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 5 } }, priority: { region: 'KV3' } };
    const without = evaluateVaaThptExamAdmission(base, { fieldCode: '7220201' });
    const withCert = evaluateVaaThptExamAdmission({ ...base, certificates: { ielts: 7 } }, { fieldCode: '7220201' });

    // TA02 = English x3 + Math x2 + best other(8): exam (15+16+8)/2 = 19.5; cert 10: (30+16+8)/2 = 27
    expect(without.score?.value).toBe(19.5);
    expect(withCert.score?.value).toBe(27);
    expect(withCert.eligibility?.reasons.join(' ')).toContain('quy đổi chứng chỉ');
  });

  it('does not lower the English score when the exam score is higher', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 10 } }, certificates: { ielts: 5 } };
    const result = evaluateVaaThptExamAdmission(profile, { fieldCode: '7220201' });

    // (30 + 16 + 8)/2 = 27
    expect(result.score?.value).toBe(27);
  });
});

describe('VAA transcript (hoc ba) method 2026', () => {
  const transcriptProfile: ApplicantProfile = {
    transcript: {
      grade10: { math: 8, literature: 7, english: 7, physics: 6 },
      grade11: { math: 8.5, literature: 7.5, english: 7.5, physics: 6.5 },
      grade12: { math: 9, literature: 8, english: 8, physics: 7 },
    },
    priority: { region: 'KV3' },
  };

  it('uses TB3N per subject with the same 3/2/1 weights and the transcript cutoff', () => {
    // TB3N: math 8.5, literature 7.5, english 7.5, physics 6.5. 7480201S (DT02, hoc ba cutoff 21):
    // best of pool without math = 7.5 (literature or english), second = 7.5 -> (7.5*3 + 8.5*2 + 7.5)/2 = 23.5
    const result = evaluateVaaTranscriptAdmission(transcriptProfile, { fieldCode: '7480201S' });

    expect(result.confidence).toBe('exact-verified');
    expect(result.methodId).toBe('vaa-transcript-exact-2026');
    expect(result.score?.value).toBe(23.5);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('compares against the transcript cutoff, not the exam cutoff (7340120: exam 24, transcript 25.5)', () => {
    // TB3N: DT01 = best(math 8.5)*3 + literature 7.5*2 + second best(7.5) = (25.5 + 15 + 7.5)/2 = 24
    const result = evaluateVaaTranscriptAdmission(transcriptProfile, { fieldCode: '7340120' });

    // 24 would meet the exam cutoff (24) but not the transcript cutoff (25.5)
    expect(result.score?.value).toBe(24);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons[0]).toContain('25.5');
  });

  it('needs all three school years for a subject and is partial otherwise', () => {
    const partial: ApplicantProfile = { transcript: { grade10: { math: 8 }, grade11: { math: 8 }, grade12: { math: 8, literature: 8 } } };
    const result = evaluateVaaTranscriptAdmission(partial, { fieldCode: '7480201S' });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.map((item) => item.code)).toContain('vaa-transcript-scores');
  });

  it('applies the English certificate conversion to the transcript English score too', () => {
    const lowEnglish: ApplicantProfile = {
      transcript: {
        grade10: { math: 8, literature: 8, english: 5 },
        grade11: { math: 8, literature: 8, english: 5 },
        grade12: { math: 8, literature: 8, english: 5 },
      },
      priority: { region: 'KV3' },
    };
    const without = evaluateVaaTranscriptAdmission(lowEnglish, { fieldCode: '7220201' });
    const withCert = evaluateVaaTranscriptAdmission({ ...lowEnglish, certificates: { ielts: 7 } }, { fieldCode: '7220201' });

    // TA02 = English x3 + Math x2 + best other(8): (15 + 16 + 8)/2 = 19.5 vs (30 + 16 + 8)/2 = 27
    expect(without.score?.value).toBe(19.5);
    expect(withCert.score?.value).toBe(27);
  });

  it('every code has a transcript cutoff at least equal to its exam cutoff', () => {
    for (const entry of VAA_FIELD_THRESHOLDS_2026) {
      expect(entry.transcriptThreshold30, entry.code).toBeGreaterThanOrEqual(entry.threshold30);
    }
  });
});

describe('VAA Korean and Chinese language majors', () => {
  it('converts TOPIK and HSK per the official table (4 -> 10, 3 -> 8)', () => {
    expect(convertVaaKoreanChineseCertificate('korean', { topik: 'TOPIK4' })).toBe(10);
    expect(convertVaaKoreanChineseCertificate('korean', { topik: 'TOPIK6' })).toBe(10);
    expect(convertVaaKoreanChineseCertificate('korean', { topik: 'TOPIK3' })).toBe(8);
    expect(convertVaaKoreanChineseCertificate('korean', { topik: 'TOPIK2' })).toBeUndefined();
    expect(convertVaaKoreanChineseCertificate('chinese', { hsk: 'HSK4' })).toBe(10);
    expect(convertVaaKoreanChineseCertificate('chinese', { hsk: 'HSK3' })).toBe(8);
    expect(convertVaaKoreanChineseCertificate('chinese', { hsk: 'HSK1' })).toBeUndefined();
    // TOPIK does not apply to the Chinese major and vice versa
    expect(convertVaaKoreanChineseCertificate('chinese', { topik: 'TOPIK6' })).toBeUndefined();
  });

  it('lets Ngon ngu Han Quoc use Tieng Han as the x3 foreign language', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 5, korean: 9 } }, priority: { region: 'KV3' } };
    // TA02 = Korean x3 + Math x2 + best other(literature 8): (27 + 16 + 8)/2 = 25.5; with English only: (15+16+8)/2 = 19.5
    const korean = evaluateVaaThptExamAdmission(profile, { fieldCode: '7220210' });

    expect(korean.score?.value).toBe(25.5);
    expect(korean.explanation?.[0]?.formula).toContain('Tiếng Hàn');
  });

  it('does not allow Tieng Han for other majors', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 5, korean: 9 } }, priority: { region: 'KV3' } };
    const english = evaluateVaaThptExamAdmission(profile, { fieldCode: '7220201' });

    expect(english.score?.value).toBe(19.5);
  });

  it('uses TOPIK 4 instead of a missing Korean exam score and HSK for the Chinese major', () => {
    const base: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8 } }, priority: { region: 'KV3' } };
    const korean = evaluateVaaThptExamAdmission({ ...base, certificates: { topik: 'TOPIK4' } }, { fieldCode: '7220210' });
    const chinese = evaluateVaaThptExamAdmission({ ...base, certificates: { hsk: 'HSK3' } }, { fieldCode: '7220204' });
    const wrong = evaluateVaaThptExamAdmission({ ...base, certificates: { hsk: 'HSK4' } }, { fieldCode: '7220210' });

    // Korean: (10*3 + 8*2 + 8)/2 = 27; Chinese: (8*3 + 8*2 + 8)/2 = 24
    expect(korean.score?.value).toBe(27);
    expect(chinese.score?.value).toBe(24);
    expect(wrong.confidence).toBe('partial');
  });
});
