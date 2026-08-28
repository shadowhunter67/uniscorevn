import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuumpThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — Thông báo 2468/TB-ĐHYD không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ bảng ngưỡng theo ngành (mục 1) và trang tuyển sinh chính thức xác nhận công
 * thức cộng điểm ưu tiên theo Điều 7 Quy chế Bộ GD&ĐT, trong 2 văn bản chính thức (`vnuump-
 * thongbao-2468-2026`, `vnuump-admission-notice-2026`, đều verified). Mức điểm ưu tiên KV/ĐT cụ
 * thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25
 * / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const vnuumpThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuumpThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'vnuump-2026-ky-thuat-xet-nghiem-pass-with-priority',
    schoolId: 'vnuump',
    methodId: 'vnuump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnuump-thongbao-2468-2026',
    sourceNote: 'Ngưỡng Kỹ thuật xét nghiệm y học = 19,00/30 (mục 1); ưu tiên KV1+UT2 = 1,75 [chuẩn toàn quốc, judgment call].',
    derivation: `
      Tổ hợp B00 (Toán, Hóa học, Sinh học): Toán 7 + Hóa 6 + Sinh 6 = 19,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 19,00 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 19,00 + 1,75 = 20,75/30 >= ngưỡng 19,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, chemistry: 6, biology: 6 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { programId: 'ky-thuat-xet-nghiem', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 19, total30: 20.75 },
  },
  {
    id: 'vnuump-2026-ykhoa-fail-no-priority',
    schoolId: 'vnuump',
    methodId: 'vnuump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnuump-thongbao-2468-2026',
    sourceNote: 'Ngưỡng Y khoa = 22,00/30 (mục 1, mức nêu cho thí sinh KV3 — không cộng ưu tiên).',
    derivation: `
      Tổ hợp B00: Toán 6 + Hóa 6 + Sinh 6 = 18,00/30.
      Không điểm ưu tiên (KV3) -> tổng = 18,00/30 < ngưỡng Y khoa 22,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, chemistry: 6, biology: 6 } }, priority: { region: 'KV3' } },
      context: { programId: 'y-khoa', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: false, rawScore30: 18, total30: 18 },
  },
  {
    id: 'vnuump-2026-ykhoa-priority-reduction-pass',
    schoolId: 'vnuump',
    methodId: 'vnuump-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnuump-thongbao-2468-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> áp dụng công thức giảm dần điểm ưu tiên quốc gia (Điều 7 khoản 4, dẫn chiếu qua trang tuyển sinh chính thức).',
    derivation: `
      Tổ hợp B00: Toán 9 + Hóa 9 + Sinh 9 = 27,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 27,00 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 27,00)/7,5] × 2,75 = (3/7,5) × 2,75 = 0,4 × 2,75 = 1,10.
      Tổng dùng để so ngưỡng = 27,00 + 1,10 = 28,10/30 >= ngưỡng Y khoa 22,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, chemistry: 9, biology: 9 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { programId: 'y-khoa', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 27, total30: 28.1 },
  },
];
