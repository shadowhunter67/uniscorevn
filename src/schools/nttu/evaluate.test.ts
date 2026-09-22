import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateNttuTranscriptAdmission, evaluateNttuThptExamExactAdmission } from './evaluate';

const EMPTY_PROFILE: ApplicantProfile = {};
const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('evaluateNttuTranscriptAdmission', () => {
  it('chưa nhập gì -> unknown + missingRequirement tổng điểm', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE);
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'nttu-transcript-total-score')).toBe(true);
  });

  it('nhóm standard: 18 pass, 17.99 fail, không cần rank/alt score', () => {
    expect(evaluateNttuTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 18, thresholdGroup: 'standard' }).eligibility?.status).toBe('eligible');
    expect(evaluateNttuTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 17.99, thresholdGroup: 'standard' }).eligibility?.status).toBe('ineligible');
  });

  it('nhóm medicine: đủ điểm sàn 23 nhưng thiếu rank -> unknown', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 23, thresholdGroup: 'medicine' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'nttu-academic-rank-12')).toBe(true);
  });

  it('nhóm medicine: đủ điểm sàn + rank tốt + điểm tốt nghiệp 8.5 -> eligible', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
      transcriptTotal30: 23,
      thresholdGroup: 'medicine',
      academicRank12: 'tot',
      graduationScore10: 8.5,
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm medicine: rank khá (dưới yêu cầu tốt) dù điểm đủ -> ineligible', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
      transcriptTotal30: 25,
      thresholdGroup: 'medicine',
      academicRank12: 'kha',
      graduationScore10: 9,
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm medicine: đủ điểm sàn nhưng dưới ngưỡng thay thế (18 tổng THPT thay vì 20) -> ineligible', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
      transcriptTotal30: 23,
      thresholdGroup: 'medicine',
      academicRank12: 'tot',
      thptExamTotal30: 18,
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm nursing-prevention: ngưỡng thấp hơn (19/30, rank khá + 16.5/6.5)', () => {
    expect(
      evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
        transcriptTotal30: 19,
        thresholdGroup: 'nursing-prevention',
        academicRank12: 'kha',
        thptExamTotal30: 16.5,
      }).eligibility?.status
    ).toBe('eligible');
    expect(
      evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
        transcriptTotal30: 18.99,
        thresholdGroup: 'nursing-prevention',
        academicRank12: 'kha',
        thptExamTotal30: 16.5,
      }).eligibility?.status
    ).toBe('ineligible');
  });

  it('nhóm law: ngưỡng 18/30, rank tốt + điểm tốt nghiệp 8.5 -> eligible', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, {
      transcriptTotal30: 18,
      thresholdGroup: 'law',
      academicRank12: 'tot',
      graduationScore10: 8.5,
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateNttuTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 25, thresholdGroup: 'standard' });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });

  it('methodId khớp phương thức học bạ', () => {
    expect(evaluateNttuTranscriptAdmission(EMPTY_PROFILE, { transcriptTotal30: 18 }).methodId).toBe('nttu-transcript-2026');
  });
});

describe('evaluateNttuThptExamExactAdmission (so tổng thô theo nhóm ngành, không có điểm ưu tiên)', () => {
  const p = (scores: Record<string, number>): ApplicantProfile => ({ thpt: { scores } });

  it('chưa chọn nhóm ngành -> partial', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), a00Context);
    expect(r.confidence).toBe('partial');
  });

  it('chưa chọn tổ hợp -> partial', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { group: 'standard' });
    expect(r.confidence).toBe('partial');
  });

  it('standard (ngưỡng 15): tổng 16 -> eligible', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 6, physics: 5, chemistry: 5 }), { group: 'standard', ...a00Context });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 16, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('standard: tổng 14 -> ineligible', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 4, physics: 5, chemistry: 5 }), { group: 'standard', ...a00Context });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('medicine (ngưỡng 22): tổng 21 -> ineligible', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { group: 'medicine', ...a00Context });
    expect(r.score).toEqual({ value: 21, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('không có điểm ưu tiên trong evidence/explanation', () => {
    const r = evaluateNttuThptExamExactAdmission(p({ math: 7, physics: 7, chemistry: 7 }), { group: 'standard', ...a00Context });
    expect(r.explanation.some((e) => e.id.includes('priority'))).toBe(false);
  });
});
