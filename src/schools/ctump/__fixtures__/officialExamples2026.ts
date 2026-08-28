import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { CtumpThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — Thông báo 197/TB-ĐHYDCT (mục II.1) không có worked example công khai, nhưng công bố
 * ĐẦY ĐỦ cả bảng ngưỡng 4 nhóm ngành LẪN công thức giảm dần điểm ưu tiên trong cùng 1 văn bản
 * (`ctump-quality-threshold-2026`, verified) — mạnh hơn tiền lệ HCMUE (nơi ngưỡng và công thức ưu
 * tiên đến từ 2 nguồn khác nhau). Mức điểm ưu tiên KV/ĐT cụ thể vẫn là mức chuẩn toàn quốc
 * (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04)
 * 2,0 / nhóm 2 (05-07) 1,0.
 */
export const ctumpThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: CtumpThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'ctump-2026-tier15-boundary-pass-with-priority',
    schoolId: 'ctump',
    methodId: 'ctump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ctump-quality-threshold-2026',
    sourceNote:
      'Nhóm tier15 (Dinh dưỡng/Y tế công cộng/Kỹ thuật Y sinh/Tâm lý học) = 15,0/30 [mục II.1, verified]; mức ưu tiên KV1+UT2 = 1,75 [judgment call, chuẩn toàn quốc].',
    derivation: `
      Tổng thô 3 môn (Toán 5 + Hóa 4 + Sinh 4,25) = 13,25/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 13,25 < 22,5 -> KHÔNG giảm.
      Tổng dùng để so ngưỡng = 13,25 + 1,75 = 15,00/30 = đúng ngưỡng 15,00 -> đạt.
    `,
    boundaryNote: 'Ngưỡng vừa đạt nhờ điểm ưu tiên (không giảm vì dưới mốc 22,5) — chứng minh CTUMP cộng ưu tiên vào tổng trước khi so ngưỡng.',
    input: {
      profile: { thpt: { scores: { math: 5, chemistry: 4, biology: 4.25 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { group: 'tier15', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 13.25, total30: 15 },
  },
  {
    id: 'ctump-2026-tier22-priority-reduction-pass',
    schoolId: 'ctump',
    methodId: 'ctump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ctump-quality-threshold-2026',
    sourceNote:
      'Nhóm tier22 (Y khoa/Răng hàm mặt) = 22,0/30 [mục II.1, verified]; mức ưu tiên KV1+UT1 = 2,75, giảm tuyến tính vì tổng thô ≥ 22,5 [công thức trích nguyên văn mục II.1].',
    derivation: `
      Tổng thô 3 môn (Toán 8 + Hóa 8 + Sinh 8) = 24,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 24 >= 22,5 -> áp dụng giảm:
        ĐƯT hiệu lực = [(30 - 24) / 7,5] × 2,75 = (6/7,5) × 2,75 = 0,8 × 2,75 = 2,20.
      Tổng dùng để so ngưỡng = 24,00 + 2,20 = 26,20/30 >= ngưỡng 22,00 -> đạt.
    `,
    boundaryNote: 'Priority reduction boundary — tổng thô đúng bằng mốc giảm ưu tiên 22,5 trở lên.',
    input: {
      profile: { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { group: 'tier22', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 24, total30: 26.2 },
  },
  {
    id: 'ctump-2026-tier22-fail-even-with-priority',
    schoolId: 'ctump',
    methodId: 'ctump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ctump-quality-threshold-2026',
    sourceNote: 'Nhóm tier22 = 22,0/30 [mục II.1, verified]; mức ưu tiên KV1+UT1 = 2,75 không đủ bù khoảng cách lớn.',
    derivation: `
      Tổng thô 3 môn (Toán 6 + Hóa 6,5 + Sinh 6,5) = 19,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 19 < 22,5 -> KHÔNG giảm.
      Tổng dùng để so ngưỡng = 19,00 + 2,75 = 21,75/30 < ngưỡng 22,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, chemistry: 6.5, biology: 6.5 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { group: 'tier22', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: false, rawScore30: 19, total30: 21.75 },
  },
];
