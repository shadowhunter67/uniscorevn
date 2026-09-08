import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateHutechThptAdmission, evaluateHutechDgnlAdmission, evaluateHutechVsatAdmission, evaluateHutechHocbaAdmission } from './evaluate';

const combo = { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const };

describe('evaluateHutechThptAdmission', () => {
  it('returns partial when no subject combination is chosen', () => {
    const result = evaluateHutechThptAdmission({});
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-subject-combination')).toBe(true);
    expect(result.score).toBeUndefined();
  });

  it('reports missing THPT scores', () => {
    const result = evaluateHutechThptAdmission({}, { subjectContext: combo });
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-thpt-math')).toBe(true);
    expect(result.confidence).toBe('partial');
  });

  it('computes an exact-verified score for a complete profile with no bonus achievement', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, english: 6 } }, priority: { region: 'KV1' } };
    const result = evaluateHutechThptAdmission(profile, { subjectContext: combo });
    expect(result.confidence).toBe('exact-verified');
    const academicStep = result.explanation.find((s) => s.id === 'hutech-academic-score');
    expect(academicStep?.output).toBe(21);
    expect(result.score?.scale).toBe(30);
    expect(result.eligibility?.status).toBe('eligible'); // standard group, 21 >= 15
  });

  it('reports ineligible below the medicine 22/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, english: 7 } } }; // total 21
    const result = evaluateHutechThptAdmission(profile, { subjectContext: combo, thresholdGroup: 'medicine' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.confidence).toBe('exact-verified'); // score itself is still exact/computable
  });

  it('applies the nursing-lab 18/30 threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, english: 5.9 } } }; // total 17.9
    const result = evaluateHutechThptAdmission(profile, { subjectContext: combo, thresholdGroup: 'nursing-lab' });
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('stays partial when the applicant has a bonus achievement (bonus table not found)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, english: 6 } } };
    const result = evaluateHutechThptAdmission(profile, { subjectContext: combo, hasBonusAchievement: true });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-bonus-table-not-found')).toBe(true);
  });
});

describe('evaluateHutechDgnlAdmission', () => {
  it('asks for ĐGNL score when absent', () => {
    const result = evaluateHutechDgnlAdmission({});
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-dgnl-total')).toBe(true);
  });

  it('computes an exact-verified score with no bonus achievement', () => {
    const profile: ApplicantProfile = { exams: { vact: { total: 700 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHutechDgnlAdmission(profile);
    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.scale).toBe(1200);
    expect(result.eligibility?.status).toBe('eligible'); // standard group, 700 >= 550
  });

  it('applies the medicine 650/1200 threshold', () => {
    const profile: ApplicantProfile = { exams: { vact: { total: 600 } } };
    const result = evaluateHutechDgnlAdmission(profile, { thresholdGroup: 'medicine' });
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('stays partial when the applicant has a bonus achievement', () => {
    const profile: ApplicantProfile = { exams: { vact: { total: 700 } } };
    const result = evaluateHutechDgnlAdmission(profile, { hasBonusAchievement: true });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
  });
});

describe('evaluateHutechVsatAdmission — eligibility-only', () => {
  it('asks for V-SAT score when absent', () => {
    const result = evaluateHutechVsatAdmission();
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-vsat-score')).toBe(true);
  });

  it('reports eligible/ineligible but never returns a score', () => {
    const eligible = evaluateHutechVsatAdmission({ vsatScore: 230, thresholdGroup: 'standard' });
    expect(eligible.eligibility?.status).toBe('eligible');
    expect(eligible.score).toBeUndefined();
    expect(eligible.confidence).toBe('partial');

    const ineligible = evaluateHutechVsatAdmission({ vsatScore: 220, thresholdGroup: 'standard' });
    expect(ineligible.eligibility?.status).toBe('ineligible');
  });

  it('applies the medicine/pharmacy 250 threshold', () => {
    const result = evaluateHutechVsatAdmission({ vsatScore: 240, thresholdGroup: 'medicine' });
    expect(result.eligibility?.status).toBe('ineligible');
  });
});

/**
 * Số kỳ vọng TÍNH TAY từ dữ liệu fixture dưới đây (không lấy từ output của hàm):
 *   math     = (8 + 8 + 8 + 8 + 8 + 8)/6 = 48/6 = 8,00
 *   physics  = (7 + 7 + 7 + 7 + 7 + 7)/6 = 42/6 = 7,00
 *   english  = (6 + 6 + 6 + 6 + 6 + 6)/6 = 36/6 = 6,00
 *   Điểm học lực = 8,00 + 7,00 + 6,00 = 21,00/30
 * Lưu ý: TB CẢ NĂM của cùng bộ điểm này (Thông tư 22/2021) cũng bằng 21 vì mọi học kỳ bằng nhau —
 * chọn cố ý để test "đường đi 6 học kỳ" tách bạch, còn case bên dưới (`semester-vs-yearly`) mới là
 * case chứng minh 2 cách tính KHÁC nhau.
 */
const flatSemesters = {
  grade10Sem1: { math: 8, physics: 7, english: 6 },
  grade10Sem2: { math: 8, physics: 7, english: 6 },
  grade11Sem1: { math: 8, physics: 7, english: 6 },
  grade11Sem2: { math: 8, physics: 7, english: 6 },
  grade12Sem1: { math: 8, physics: 7, english: 6 },
  grade12Sem2: { math: 8, physics: 7, english: 6 },
};

describe('evaluateHutechHocbaAdmission — TB 3 môn của 6 học kỳ', () => {
  it('asks for a subject combination first', () => {
    const result = evaluateHutechHocbaAdmission({});
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-subject-combination')).toBe(true);
  });

  it('stays partial and never falls back to yearly averages when bySemester is absent', () => {
    const profile: ApplicantProfile = { transcript: { grade10: { math: 8 }, grade11: { math: 8 }, grade12: { math: 8 } } };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-hocba-semester-math')).toBe(true);
  });

  it('stays partial when a single semester of one subject is missing (all-or-nothing)', () => {
    const profile: ApplicantProfile = {
      transcript: { bySemester: { ...flatSemesters, grade12Sem2: { math: 8, physics: 7 } } },
    };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    const missing = result.missingRequirements?.find((r) => r.code === 'hutech-hocba-semester-english');
    expect(missing?.label).toContain('1/6 học kỳ');
  });

  it('computes an exact-verified score from 6 semesters (hand-checked 8 + 7 + 6 = 21,00/30)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: flatSemesters } };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo });
    expect(result.confidence).toBe('exact-verified');
    expect(result.explanation.find((s) => s.id === 'hutech-hocba-academic-score')?.output).toBe(21);
    expect(result.score).toEqual({ value: 21, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible'); // standard group: 21 >= 18
  });

  it('is NOT the same number as the yearly-average path — proves the granularity fix is load-bearing', () => {
    // math: HK1/HK2 lớp 10 = 6/9, lớp 11 = 6/9, lớp 12 = 6/9; physics/english phẳng ở 7 và 6.
    // TB 6 học kỳ math = (6+9+6+9+6+9)/6 = 45/6 = 7,50 → tổng = 7,50 + 7 + 6 = 20,50.
    // TB CẢ NĂM math (TT22: (HK1 + 2×HK2)/3) = (6 + 18)/3 = 8,00 mỗi năm → tổng nếu dùng TB năm = 21,00.
    const profile: ApplicantProfile = {
      transcript: {
        bySemester: {
          grade10Sem1: { math: 6, physics: 7, english: 6 },
          grade10Sem2: { math: 9, physics: 7, english: 6 },
          grade11Sem1: { math: 6, physics: 7, english: 6 },
          grade11Sem2: { math: 9, physics: 7, english: 6 },
          grade12Sem1: { math: 6, physics: 7, english: 6 },
          grade12Sem2: { math: 9, physics: 7, english: 6 },
        },
      },
    };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo });
    expect(result.explanation.find((s) => s.id === 'hutech-hocba-subject-average-math')?.output).toBe(7.5);
    expect(result.score?.value).toBe(20.5);
  });

  it('applies the medicine 23/30 hocba threshold', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: flatSemesters } };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo, thresholdGroup: 'medicine' });
    expect(result.eligibility?.status).toBe('ineligible'); // 21 < 23
    expect(result.confidence).toBe('exact-verified');
  });

  it('adds priority points from the shared profile (KV1 = +0,75, below the 22,5 reduction cut-off)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: flatSemesters }, priority: { region: 'KV1' } };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo });
    expect(result.score?.value).toBe(21.75); // 21,00 + 0,75
  });

  it('stays partial when the applicant has a bonus achievement (bonus table not found)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: flatSemesters } };
    const result = evaluateHutechHocbaAdmission(profile, { subjectContext: combo, hasBonusAchievement: true });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements?.some((r) => r.code === 'hutech-bonus-table-not-found')).toBe(true);
  });
});
