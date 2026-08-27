import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateCtuThptExamAdmission, evaluateCtuThptExamExactAdmission, evaluateCtuTranscriptAdmission, evaluateCtuVsatAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<string, number>>): ApplicantProfile {
  return { thpt: { scores } };
}

describe('evaluateCtuThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-subject-combination')).toBe(true);
  });

  it('thiếu điểm 1 môn -> missingInputs + missingRequirement profile-input', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({ math: 8, physics: 7 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.missingInputs.length).toBeGreaterThan(0);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-thpt-english')).toBe(true);
  });

  it('tổng đủ 15, không môn nào ≤1 -> unknown (điều kiện 2 PDF-gated, không kết luận eligible)', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.explanation[0].output).toBe(15);
  });

  it('tổng dưới 14.99 -> ineligible (điều kiện 1 fail, kết luận chắc chắn)', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('có môn = 1.0 -> ineligible dù tổng đủ 15 (điều kiện "không môn nào ≤1")', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({ math: 1, physics: 7, english: 7 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });

  it('missingRules chứa gap điểm sàn theo mã xét tuyển', () => {
    const evaluation = evaluateCtuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.missingRules.some((label) => label.toLowerCase().includes('mã xét tuyển'))).toBe(true);
  });
});

describe('evaluateCtuThptExamExactAdmission (Phương thức 2 — Điểm xét tuyển theo mã xét tuyển)', () => {
  it('chưa chọn mã xét tuyển -> partial + missingRequirement ctu-program-code', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, physics: 8, english: 8 }));
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-program-code')).toBe(true);
  });

  it('mã ngành năng khiếu (Giáo dục Mầm non) -> partial out-of-scope', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, literature: 8, english: 8 }), {
      programCode: '7140201',
      combinationId: 'M11',
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-program-out-of-scope')).toBe(true);
  });

  it('tổ hợp không thuộc mã ngành -> partial + missingRequirement ctu-subject-combination', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, physics: 8, english: 8 }), {
      programCode: '7480101',
      combinationId: 'C00',
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-subject-combination')).toBe(true);
  });

  it('thiếu điểm 1 môn -> partial + profile-input', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, physics: 8 }), {
      programCode: '7480101',
      combinationId: 'A01',
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-thpt-english')).toBe(true);
  });

  it('đủ điều kiện ngành standard (KHMT, sàn 15) -> exact-verified + eligible + score', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, physics: 7.5, english: 7 }), {
      programCode: '7480101',
      combinationId: 'A01',
    });
    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score).toEqual({ value: 22.5, scale: 30 });
  });

  it('cộng điểm ưu tiên KV1 khi tổng < 22,5 -> cộng nguyên mức', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(
      { thpt: { scores: { math: 7, physics: 7, english: 7 } }, priority: { region: 'KV1' } },
      { programCode: '7480101', combinationId: 'A01' }
    );
    expect(evaluation.score).toEqual({ value: 21.75, scale: 30 });
  });

  it('giảm điểm ưu tiên khi tổng thô ≥ 22,5', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(
      { thpt: { scores: { math: 9, physics: 9, english: 6 } }, priority: { region: 'KV1' } },
      { programCode: '7480101', combinationId: 'A01' }
    );
    // raw 24; ((30-24)/7.5)*0.75 = 0.6 -> 24.6
    expect(evaluation.score).toEqual({ value: 24.6, scale: 30 });
  });

  it('tổng dưới điểm sàn ngành (Du lịch sàn 16, tổng 15) -> ineligible nhưng vẫn có score', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 5, literature: 5, english: 5 }), {
      programCode: '7810101',
      combinationId: 'D01',
    });
    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score).toEqual({ value: 15, scale: 30 });
  });

  it('có môn ≤ 1,0 -> ineligible dù tổng đủ', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 1, physics: 10, english: 10 }), {
      programCode: '7480101',
      combinationId: 'A01',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm pháp luật C00: Ngữ văn ≥ 6 thỏa -> eligible', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ literature: 8, history: 7, geography: 6 }), {
      programCode: '7380101',
      combinationId: 'C00',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score).toEqual({ value: 21, scale: 30 });
  });

  it('nhóm pháp luật tổ hợp D01: Toán + Ngữ văn < 12 -> ineligible', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ literature: 3, math: 8, english: 10 }), {
      programCode: '7380101',
      combinationId: 'D01',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('methodId khớp nhánh exact', () => {
    const evaluation = evaluateCtuThptExamExactAdmission(profileWithThpt({ math: 8, physics: 8, english: 8 }), {
      programCode: '7480101',
      combinationId: 'A01',
    });
    expect(evaluation.methodId).toBe('ctu-thpt-exam-exact-2026');
  });
});

describe('evaluateCtuTranscriptAdmission (Phương thức 3 — điều kiện thay thế)', () => {
  it('chưa chọn nhóm ngành -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'ctu-program-group')).toBe(true);
  });

  it('nhóm standard -> luôn unknown (không có đường thay thế công bố)', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}), { group: 'standard' });
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('nhóm teacher, học lực Tốt + tổng 18 -> eligible (đường thay thế đủ điều kiện)', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({ math: 6, physics: 6, english: 6 }), {
      group: 'teacher',
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      academicRank12: 'tot',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm teacher, điểm xét tốt nghiệp 8.5 -> eligible qua đường điểm xét tốt nghiệp', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}), {
      group: 'teacher',
      academicRank12: 'gioi',
      graduationScore10: 8.5,
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm teacher, học lực Khá -> ineligible (chưa đạt loại Tốt/Giỏi)', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}), {
      group: 'teacher',
      academicRank12: 'kha',
      graduationScore10: 9,
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law, đủ điều kiện học lực+điểm -> unknown (còn vướng điều kiện tổ hợp môn quy đổi)', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}), {
      group: 'law',
      academicRank12: 'tot',
      graduationScore10: 9,
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.eligibility?.reasons.some((r) => r.includes('quy đổi'))).toBe(true);
  });

  it('methodId khớp Phương thức 3', () => {
    const evaluation = evaluateCtuTranscriptAdmission(profileWithThpt({}));
    expect(evaluation.methodId).toBe('ctu-transcript-2026');
  });
});

describe('evaluateCtuVsatAdmission (Phương thức 4)', () => {
  it('methodId khớp Phương thức 4, dùng chung logic với Phương thức 3', () => {
    const evaluation = evaluateCtuVsatAdmission(profileWithThpt({}), { group: 'teacher', academicRank12: 'tot', graduationScore10: 9 });
    expect(evaluation.methodId).toBe('ctu-vsat-2026');
    expect(evaluation.eligibility?.status).toBe('eligible');
  });
});
