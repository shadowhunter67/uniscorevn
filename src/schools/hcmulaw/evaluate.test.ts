import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import {
  evaluateHcmulawThpt5Admission,
  evaluateHcmulawCombined2Admission,
  evaluateHcmulawPriorityHighschool3Admission,
  evaluateHcmulawVsat4Admission,
} from './evaluate';

describe('evaluateHcmulawThpt5Admission', () => {
  it('returns partial when no program is chosen', () => {
    const result = evaluateHcmulawThpt5Admission({});
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-program')).toBe(true);
    expect(result.score).toBeUndefined();
  });

  it('returns partial for an unknown program id', () => {
    const result = evaluateHcmulawThpt5Admission({}, { programId: 'not-a-real-program' as never });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-program')).toBe(true);
  });

  it('returns partial when no combination is chosen', () => {
    const result = evaluateHcmulawThpt5Admission({}, { programId: '7380101' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-combination')).toBe(true);
  });

  it('returns partial for a combination not offered by the chosen program', () => {
    // X26 (Toán/tiếng Anh/Tin học) is not one of Luật's combinations.
    const result = evaluateHcmulawThpt5Admission({}, { programId: '7380101', combinationCode: 'X26' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-combination')).toBe(true);
  });

  it('reports missing THPT scores', () => {
    const result = evaluateHcmulawThpt5Admission({}, { programId: '7380101', combinationCode: 'A01' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-thpt-math')).toBe(true);
  });

  it('computes an exact-verified score for a complete profile with no priority', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, english: 6 } } }; // A01 => 21
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7380101', combinationCode: 'A01' });
    expect(result.confidence).toBe('exact-verified');
    const groupStep = result.explanation.find((s) => s.id === 'hcmulaw-subject-group');
    expect(groupStep?.output).toBe(21);
    expect(result.score).toEqual({ value: 21, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible'); // Luật threshold is 20/30, 21 >= 20
  });

  it('reports eligible at/above the program threshold (Luật, 20/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, english: 6 } } }; // 21 >= 20
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7380101', combinationCode: 'A01' });
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('reports ineligible below the program threshold', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, english: 5 } } }; // 15 < 20
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7380101', combinationCode: 'A01' });
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.confidence).toBe('exact-verified'); // score itself is still exact/computable
  });

  it('applies national priority (no reduction below 22.5)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, english: 6 } }, priority: { region: 'KV1', category: 'UT2' } }; // raw 18, priority 0.75+1=1.75
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7340101', combinationCode: 'A01' });
    expect(result.score?.value).toBe(19.75);
  });

  it('reduces priority once the raw subject-group score reaches 22.5', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, english: 9 } }, priority: { region: 'KV1' } }; // raw 27, priority reduces to [(30-27)/7.5]*0.75=0.3
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7340101', combinationCode: 'A01' });
    expect(result.score?.value).toBe(27.3);
  });

  it('clamps the final score at 30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 10, physics: 10, english: 10 } }, priority: { region: 'KV1', category: 'UT1' } };
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7340101', combinationCode: 'A01' });
    expect(result.score?.value).toBe(30);
  });

  it('accepts an A00 (no foreign language) combination for Quản trị - Luật', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };
    const result = evaluateHcmulawThpt5Admission(profile, { programId: '7340102', combinationCode: 'A00' });
    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(21);
  });
});

/**
 * Fixture học bạ 6 học kỳ dùng cho Phương thức 2/3 — tổ hợp D01 (Ngữ văn, Tiếng Anh, Toán), k = 3,8.
 * TB tay: literature = 48/6 = 8,00 · english = 54/6 = 9,00 · math = 54/6 = 9,00 → x = 26,00/30.
 * Quy đổi: y = x - k = 26,00 - 3,80 = 22,20.
 */
function semestersFor(literature: number, english: number, math: number) {
  const one = { literature, english, math };
  return { grade10Sem1: one, grade10Sem2: one, grade11Sem1: one, grade11Sem2: one, grade12Sem1: one, grade12Sem2: one };
}

const D01_CONTEXT = { programId: '7380101' as const, combinationCode: 'D01' };

describe('evaluateHcmulawPriorityHighschool3Admission (PT3, mã 200 — học bạ trường ưu tiên ĐHQG-HCM)', () => {
  it('tính đúng x = 26,00 và y = x - k = 22,20 (tính tay, k(D01) = 3,80)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, {
      ...D01_CONTEXT,
      studiedAtPriorityHighSchool: true,
      allYearsRankedGood: true,
    });
    expect(result.explanation.find((s) => s.id === 'hcmulaw-priority-highschool3-2026-transcript-total')?.output).toBe(26);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-priority-highschool3-2026-transcript-conversion')?.output).toBe(22.2);
    expect(result.confidence).toBe('exact-verified');
    expect(result.score).toEqual({ value: 22.2, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible'); // 26,00 >= 24,50 và 22,20 >= ngưỡng ngành Luật 20,00
  });

  it('cộng điểm ưu tiên KV1 khi y < 22,5 (không giảm): 22,20 + 0,75 = 22,95', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, priority: { region: 'KV1' } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, { ...D01_CONTEXT, studiedAtPriorityHighSchool: true, allYearsRankedGood: true });
    expect(result.score?.value).toBe(22.95);
  });

  it('giảm điểm ưu tiên khi y >= 22,5: x=27,00 → y=23,20; ĐUT=((30-23,20)/7,5)×0,75=0,68 → 23,88', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(9, 9, 9) }, priority: { region: 'KV1' } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, { ...D01_CONTEXT, studiedAtPriorityHighSchool: true, allYearsRankedGood: true });
    expect(result.explanation.find((s) => s.id === 'hcmulaw-priority-highschool3-2026-transcript-conversion')?.output).toBe(23.2);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-priority-highschool3-2026-priority')?.output).toBe(0.68);
    expect(result.score?.value).toBe(23.88);
  });

  it('x dưới sàn riêng 24,50 của PT3 -> ineligible (vẫn tính được điểm)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 8, 8) } }; // x = 24,00
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, { ...D01_CONTEXT, studiedAtPriorityHighSchool: true, allYearsRankedGood: true });
    expect(result.explanation.find((s) => s.id === 'hcmulaw-priority-highschool3-2026-transcript-total')?.output).toBe(24);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(20.2); // 24,00 - 3,80
  });

  it('chưa xác nhận trường ưu tiên/học lực -> eligibility unknown + missingRequirements, điểm vẫn exact', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, D01_CONTEXT);
    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-priority-highschool')).toBe(true);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-all-years-ranked-good')).toBe(true);
    expect(result.score?.value).toBe(22.2);
  });

  it('KHÔNG lấy TB cả năm làm proxy — chỉ có grade10/11/12 thì báo thiếu học kỳ', () => {
    const profile: ApplicantProfile = { transcript: { grade10: { math: 9 }, grade11: { math: 9 }, grade12: { math: 9 } } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, D01_CONTEXT);
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-transcript-semester-literature')).toBe(true);
  });

  it('có điểm xét thưởng thành tích -> partial (phạm vi áp dụng chưa rõ từ nguồn)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) } };
    const result = evaluateHcmulawPriorityHighschool3Admission(profile, { ...D01_CONTEXT, hasBonusAchievement: true });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
  });
});

/**
 * ===== Phương thức 2 (mã 410) — ĐXT = (x - k) + điểm khuyến khích + điểm ưu tiên, kẹp 30 =====
 *
 * Hồ sơ nền dùng chung cho cả nhóm test dưới đây: `semestersFor(8, 9, 9)` -> x = 8 + 9 + 9 = 26,00;
 * tổ hợp D01 có k = 3,80 -> y = 26,00 - 3,80 = 22,20. Không có điểm ưu tiên.
 *
 * Mọi con số kỳ vọng dưới đây TÍNH TAY từ 2 bảng của mục 2(c)(ii) (xem `bonus.ts`), không lấy lại
 * output của chính hàm đang test.
 */
describe('evaluateHcmulawCombined2Admission (PT2, mã 410) — ĐXT exact sau khi đóng gap chứng chỉ', () => {
  it('IELTS 6.5 -> khuyến khích 1,00; ĐXT = 22,20 + 1,00 = 23,20', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { ielts: 6.5 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-transcript-conversion')?.output).toBe(22.2);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.output).toBe(1);
    expect(result.confidence).toBe('exact-verified');
    expect(result.score).toEqual({ value: 23.2, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible'); // 23,20 >= ngưỡng ngành Luật 20,00
  });

  it('IELTS 7.5 (mức trần) -> 1,50; ĐXT = 22,20 + 1,50 = 23,70', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { ielts: 7.5 } };
    expect(evaluateHcmulawCombined2Admission(profile, D01_CONTEXT).score?.value).toBe(23.7);
  });

  it('SAT 1330 -> 1,25 (khoảng 1330-1380); ĐXT = 22,20 + 1,25 = 23,45', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { sat: 1330 } };
    expect(evaluateHcmulawCombined2Admission(profile, D01_CONTEXT).score?.value).toBe(23.45);
  });

  it('CHỈ CÔNG NHẬN 1 LOẠI CAO NHẤT: IELTS 5.5 (0,50) + SAT 1390 (1,50) -> 1,50, KHÔNG cộng dồn thành 2,00', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { ielts: 5.5, sat: 1390 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.output).toBe(1.5);
    expect(result.score?.value).toBe(23.7);
  });

  it('bảng bậc: JLPT N2 (1,25) cao hơn IELTS 5.5 (0,50) -> lấy 1,25; ĐXT = 23,45', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { ielts: 5.5, jlpt: 'N2' } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.label).toContain('JLPT');
    expect(result.score?.value).toBe(23.45);
  });

  it('DELF C2 rơi vào mức "C1 trở lên" -> 1,50; TCF "Tương đương B1" -> 1,00', () => {
    const base = { transcript: { bySemester: semestersFor(8, 9, 9) } };
    expect(evaluateHcmulawCombined2Admission({ ...base, certificates: { delf: 'C2' } }, D01_CONTEXT).score?.value).toBe(23.7);
    expect(evaluateHcmulawCombined2Admission({ ...base, certificates: { tcf: 'B1' } }, D01_CONTEXT).score?.value).toBe(23.2);
  });

  it('bậc DƯỚI ngưỡng bảng (JLPT N4, HSK2, DELF A2) -> 0 điểm khuyến khích + chưa đủ điều kiện chứng chỉ', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { jlpt: 'N4', hsk: 'HSK2', delf: 'A2' } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.output).toBe(0);
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-method2-certificate')).toBe(true);
  });

  it('ràng buộc ngành: JLPT N1 dùng cho Quản trị kinh doanh -> bỏ qua (chỉ ngành Luật được dùng tiếng Nhật)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { jlpt: 'N1' } };
    const result = evaluateHcmulawCombined2Admission(profile, { programId: '7340101', combinationCode: 'D01' });
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.output).toBe(0);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-certificate-not-valid-for-program')).toBe(true);
  });

  it('ràng buộc ngành: HSK5 dùng được cho ngành Ngôn ngữ Trung Quốc (7220204) -> 1,50', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { hsk: 'HSK5' } };
    const result = evaluateHcmulawCombined2Admission(profile, { programId: '7220204', combinationCode: 'D01' });
    expect(result.explanation.find((s) => s.id === 'hcmulaw-combined2-2026-bonus')?.output).toBe(1.5);
  });

  it('TOEFL iBT 90 KHÔNG kèm ngày dự thi -> 2 thang cho 2 mức khác nhau (1,25 vs 1,50) -> partial, KHÔNG đoán', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { toeflIbt: 90 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-toefl-exam-date')).toBe(true);
  });

  it('TOEFL iBT 90 dự thi TRƯỚC 21/01/2026 -> thang cũ (89-95) = 1,25; ĐXT = 23,45', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { toeflIbt: 90, toeflIbtExamDate: '2026-01-20' } };
    expect(evaluateHcmulawCombined2Admission(profile, D01_CONTEXT).score?.value).toBe(23.45);
  });

  it('TOEFL iBT 90 dự thi ĐÚNG NGÀY 21/01/2026 -> thang mới (>= 5.0) = 1,50; ĐXT = 23,70 (biên "từ ngày ... trở về sau")', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { toeflIbt: 90, toeflIbtExamDate: '2026-01-21' } };
    expect(evaluateHcmulawCombined2Admission(profile, D01_CONTEXT).score?.value).toBe(23.7);
  });

  it('TOEFL iBT 4.0 thiếu ngày NHƯNG đã có IELTS 7.5 (1,50 = trần) -> không cần hỏi ngày, ĐXT = 23,70', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { toeflIbt: 4, ielts: 7.5 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-toefl-exam-date')).toBe(false);
    expect(result.score?.value).toBe(23.7);
  });

  it('TOEFL iBT 100 thiếu ngày -> cả 2 thang đều ra 1,50, không cần hỏi ngày; ĐXT = 23,70', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { toeflIbt: 100 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-toefl-exam-date')).toBe(false);
    expect(result.score?.value).toBe(23.7);
  });

  it('điểm ưu tiên KV1 (+0,75) cộng vào sau điểm khuyến khích: 22,20 + 1,00 + 0,75 = 23,95', () => {
    const profile: ApplicantProfile = {
      transcript: { bySemester: semestersFor(8, 9, 9) },
      certificates: { ielts: 6.5 },
      priority: { region: 'KV1' },
    };
    expect(evaluateHcmulawCombined2Admission(profile, D01_CONTEXT).score?.value).toBe(23.95);
  });

  it('sàn học bạ riêng của PT2 là 22,50 (thấp hơn PT3) — x = 24,00 qua sàn, x = 21,00 thì trượt', () => {
    const certificates = { ielts: 6.5 } as const;
    const pass: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 8, 8) }, certificates }; // x = 24,00
    expect(evaluateHcmulawCombined2Admission(pass, D01_CONTEXT).eligibility?.status).not.toBe('ineligible');

    const below: ApplicantProfile = { transcript: { bySemester: semestersFor(7, 7, 7) }, certificates }; // x = 21,00 < 22,50
    expect(evaluateHcmulawCombined2Admission(below, D01_CONTEXT).eligibility?.status).toBe('ineligible');
  });

  it('gap granularity cũ và gap chứng chỉ cũ đều đã biến mất khỏi missingRequirements', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: semestersFor(8, 9, 9) }, certificates: { ielts: 6.5 } };
    const result = evaluateHcmulawCombined2Admission(profile, D01_CONTEXT);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-hocba-semester-granularity-gap')).toBe(false);
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-method2-bonus-certificate-model-gap')).toBe(false);
  });
});

describe('evaluateHcmulawVsat4Admission — quy đổi riêng từng môn (mục 2.2)', () => {
  it('returns partial when no program is chosen', () => {
    const result = evaluateHcmulawVsat4Admission({});
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-program')).toBe(true);
  });

  it('reports missing V-SAT subject scores', () => {
    const result = evaluateHcmulawVsat4Admission({}, { programId: '7340101', combinationCode: 'A00' });
    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-vsat-math')).toBe(true);
  });

  it('computes an exact score converting each subject independently, using boundary values so y=d exactly', () => {
    // A00 = math/physics/chemistry, all 3 have published V-SAT tables.
    // math x=129.5 (band max) -> y=9; physics x=92 (band max) -> y=6.25; chemistry x=136.5 (band max) -> y=9.25
    const result = evaluateHcmulawVsat4Admission(
      {},
      { programId: '7340101', combinationCode: 'A00', vsatScoresBySubject: { math: 129.5, physics: 92, chemistry: 136.5 } }
    );
    expect(result.confidence).toBe('exact-verified');
    const groupStep = result.explanation.find((s) => s.id === 'hcmulaw-vsat-subject-group');
    expect(groupStep?.output).toBe(24.5); // 9 + 6.25 + 9.25
    expect(result.score).toEqual({ value: 24.5, scale: 30 });
    expect(result.eligibility?.status).toBe('eligible'); // threshold 17/30 for Quản trị kinh doanh
  });

  it('flags a combination with a subject that has no published V-SAT table (informatics, X26)', () => {
    const result = evaluateHcmulawVsat4Admission({}, { programId: '7340101', combinationCode: 'X26' });
    expect(result.missingRequirements?.some((r) => r.code === 'hcmulaw-vsat-subject-table-missing')).toBe(true);
  });
});
