import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateVluThptExamAdmission, evaluateVluTranscriptAdmission, evaluateVluCombinedAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<(typeof A01_SUBJECTS)[number], number>>): ApplicantProfile {
  return { thpt: { scores } };
}

describe('evaluateVluThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'vlu-subject-combination')).toBe(true);
  });

  it('thiếu điểm 1 môn trong tổ hợp -> missingInputs + missingRequirement profile-input', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({ math: 8, physics: 7 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.missingInputs.length).toBeGreaterThan(0);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'vlu-thpt-english')).toBe(true);
  });

  it('đủ điểm, nhóm standard, tổng 15 -> eligible', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.explanation).toHaveLength(1);
    expect(evaluation.explanation[0].output).toBe(15);
  });

  it('đủ điểm, nhóm law, tổng 15 (dưới ngưỡng 20) -> ineligible', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('confidence luôn partial, không có score (đúng invariant unavailable/partial không có score)', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });

  it('missingRules/missingRequirements chứa đủ knowledge gap của Phương thức 1', () => {
    const evaluation = evaluateVluThptExamAdmission(profileWithThpt({}));
    expect(evaluation.missingRules.some((label) => label.includes('môn thi chính'))).toBe(true);
  });
});

describe('evaluateVluTranscriptAdmission (Phương thức 2 — học bạ)', () => {
  it('nhóm standard: eligible ngay cả khi không cung cấp rank/điểm thay thế', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({}), { thresholdGroup: 'standard' });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm law: chưa cung cấp rank -> unknown + missingRequirement', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({}), { thresholdGroup: 'law' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'vlu-academic-rank-12')).toBe(true);
  });

  it('nhóm law: rank giỏi + điểm xét tốt nghiệp 8.5 -> eligible', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({}), {
      thresholdGroup: 'law',
      academicRank12: 'gioi',
      graduationScore10: 8.5,
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm law: rank khá (dưới yêu cầu) + điểm đủ -> ineligible (không phải unknown, vì đủ thông tin để biết fail)', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({}), {
      thresholdGroup: 'law',
      academicRank12: 'kha',
      graduationScore10: 9,
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: rank giỏi + tổng điểm 3 môn TN THPT (qua subjectContext) đủ 18 -> eligible', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({ math: 6, physics: 6, english: 6 }), {
      thresholdGroup: 'law',
      academicRank12: 'gioi',
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('methodId khớp Phương thức 2', () => {
    const evaluation = evaluateVluTranscriptAdmission(profileWithThpt({}), { thresholdGroup: 'standard' });
    expect(evaluation.methodId).toBe('vlu-transcript-2026');
  });
});

describe('evaluateVluCombinedAdmission (Phương thức 3 — kết hợp)', () => {
  it('methodId khớp Phương thức 3, dùng chung logic điều kiện bổ sung với Phương thức 2', () => {
    const evaluation = evaluateVluCombinedAdmission(profileWithThpt({}), {
      thresholdGroup: 'nursing-medlab',
      academicRank12: 'kha',
      graduationScore10: 6.5,
    });
    expect(evaluation.methodId).toBe('vlu-combined-2026');
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('missingRules chứa gap riêng của Phương thức 3 (bảng quy đổi kỳ thi kết hợp)', () => {
    const evaluation = evaluateVluCombinedAdmission(profileWithThpt({}), { thresholdGroup: 'standard' });
    expect(evaluation.missingRules.some((label) => label.includes('kết hợp'))).toBe(true);
  });
});

/**
 * Điểm học bạ VLU = "tổng điểm trung bình 03 môn theo tổ hợp xét tuyển của 06 học kỳ".
 * Số kỳ vọng TÍNH TAY từ fixture dưới đây:
 *   math    = (7+8+7+8+7+8)/6 = 45/6 = 7,50
 *   physics = (6+6+7+7+8+8)/6 = 42/6 = 7,00
 *   english = (9+9+9+9+9+9)/6 = 54/6 = 9,00
 *   tổng    = 7,50 + 7,00 + 9,00 = 23,50/30
 */
const SIX_SEMESTERS = {
  grade10Sem1: { math: 7, physics: 6, english: 9 },
  grade10Sem2: { math: 8, physics: 6, english: 9 },
  grade11Sem1: { math: 7, physics: 7, english: 9 },
  grade11Sem2: { math: 8, physics: 7, english: 9 },
  grade12Sem1: { math: 7, physics: 8, english: 9 },
  grade12Sem2: { math: 8, physics: 8, english: 9 },
};

describe('VLU học bạ — TB 3 môn của 6 học kỳ (transcript.bySemester)', () => {
  const subjectContext = { combinationId: 'A01', subjects: A01_SUBJECTS };

  it('tính đúng TB từng môn và tổng 23,50/30 (tính tay)', () => {
    const evaluation = evaluateVluTranscriptAdmission(
      { transcript: { bySemester: SIX_SEMESTERS } },
      { thresholdGroup: 'standard', subjectContext }
    );
    expect(evaluation.explanation.find((s) => s.id === 'vlu-transcript-2026-subject-average-math')?.output).toBe(7.5);
    expect(evaluation.explanation.find((s) => s.id === 'vlu-transcript-2026-subject-average-physics')?.output).toBe(7);
    expect(evaluation.explanation.find((s) => s.id === 'vlu-transcript-2026-transcript-total')?.output).toBe(23.5);
  });

  it('KHÔNG trả điểm xét tuyển cuối — 2 gap score-affecting khác vẫn mở (hệ số 2 / bảng ưu tiên)', () => {
    const evaluation = evaluateVluTranscriptAdmission(
      { transcript: { bySemester: SIX_SEMESTERS } },
      { thresholdGroup: 'standard', subjectContext }
    );
    expect(evaluation.score).toBeUndefined();
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'vlu-primary-subject-list-unpublished')).toBe(true);
  });

  it('chỉ có TB cả năm (không có bySemester) -> báo thiếu học kỳ, KHÔNG lấy TB năm làm proxy', () => {
    const evaluation = evaluateVluTranscriptAdmission(
      { transcript: { grade10: { math: 8 }, grade11: { math: 8 }, grade12: { math: 8 } } },
      { thresholdGroup: 'standard', subjectContext }
    );
    expect(evaluation.explanation.some((s) => s.id === 'vlu-transcript-2026-transcript-total')).toBe(false);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'vlu-transcript-semester-math')).toBe(true);
  });

  it('thiếu đúng 1 học kỳ của 1 môn -> vẫn không tính (all-or-nothing)', () => {
    const evaluation = evaluateVluTranscriptAdmission(
      { transcript: { bySemester: { ...SIX_SEMESTERS, grade12Sem2: { math: 8, physics: 8 } } } },
      { thresholdGroup: 'standard', subjectContext }
    );
    expect(evaluation.explanation.some((s) => s.id === 'vlu-transcript-2026-transcript-total')).toBe(false);
    const missing = evaluation.missingRequirements?.find((r) => r.code === 'vlu-transcript-semester-english');
    expect(missing?.label).toContain('1/6 học kỳ');
  });

  it('Phương thức 3 (kết hợp) dùng chung công thức học bạ này', () => {
    const evaluation = evaluateVluCombinedAdmission(
      { transcript: { bySemester: SIX_SEMESTERS } },
      { thresholdGroup: 'standard', subjectContext }
    );
    expect(evaluation.explanation.find((s) => s.id === 'vlu-combined-2026-transcript-total')?.output).toBe(23.5);
  });

  it('gap granularity học kỳ đã được gỡ khỏi missingRules của Phương thức 2', () => {
    const evaluation = evaluateVluTranscriptAdmission({}, { thresholdGroup: 'standard' });
    expect(evaluation.missingRules.some((label) => label.includes('06 học kỳ'))).toBe(false);
  });
});
