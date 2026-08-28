import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { LtvuniThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — Thông báo 269/TB-ĐHLTV không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ƯT (mục B.1.a, trang 4) +
 * ngưỡng theo 11/11 ngành (mục A.1.b, trang 1-2) + xác nhận KHÔNG có điểm cộng, trong 1 văn bản
 * chính thức (`ltvuni-quality-threshold-2026`, verified, đọc trực tiếp qua vision, bản scan).
 * Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1
 * 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const ltvuniThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: LtvuniThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'ltvuni-2026-standard-kv3-pass-no-priority',
    schoolId: 'ltvuni',
    methodId: 'ltvuni-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ltvuni-quality-threshold-2026',
    sourceNote: 'Ngưỡng ngành nhóm "standard" (9 ngành) 15,00/30 (mục A.1.b); khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp D01 (Toán 5 + Ngữ văn 5 + Anh 5) = 15,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV3' } },
      context: { group: 'standard', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 15, total30: 15 },
  },
  {
    id: 'ltvuni-2026-standard-below-floor-with-priority-still-fails',
    schoolId: 'ltvuni',
    methodId: 'ltvuni-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ltvuni-quality-threshold-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng (mục B.1.a) nhưng tổng thô quá thấp vẫn không đủ ngưỡng "standard" 15,00/30.',
    derivation: `
      Tổ hợp D01 (Toán 4 + Ngữ văn 4 + Anh 4) = 12,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 12 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 12,00 + 1,75 = 13,75/30 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, literature: 4, english: 4 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { group: 'standard', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, rawScore30: 12, total30: 13.75 },
  },
  {
    id: 'ltvuni-2026-priority-reduction-pass-traditional-medicine',
    schoolId: 'ltvuni',
    methodId: 'ltvuni-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ltvuni-quality-threshold-2026',
    sourceNote: 'Ngành Y học cổ truyền, ngưỡng 20,0/30 (mục A.1.b); tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia (dẫn chiếu "quy chế tuyển sinh hiện hành", mục B.1.a).',
    derivation: `
      Tổ hợp B00 (Toán 9 + Hóa 9 + Sinh 8) = 26,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 26 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 26) / 7,5] × 2,75 = (4/7,5) × 2,75 = 0,5333 × 2,75 = 1,4667 -> round2 = 1,47.
      Tổng dùng để so ngưỡng = 26,00 + 1,47 = 27,47/30 >= ngưỡng 20,00 (Y học cổ truyền) -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, chemistry: 9, biology: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { group: 'traditionalMedicine', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 26, total30: 27.47 },
  },
];
