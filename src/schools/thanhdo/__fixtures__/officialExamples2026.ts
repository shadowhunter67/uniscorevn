import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { ThanhdoThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — thanhdo.edu.vn không có worked example công khai cho công thức điểm ưu tiên, nhưng
 * công bố ĐẦY ĐỦ công thức (tổng 3 môn, không nhân hệ số, không tính điểm cộng) + bảng ngưỡng
 * theo 14/14 ngành (`thanhdo-cutoff-2026`, verified, xác nhận lại 2026-08-28). Mức điểm ưu tiên
 * KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 /
 * KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const thanhdoThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: ThanhdoThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'thanhdo-2026-tier16-kv3-pass-no-priority',
    schoolId: 'thanhdo',
    methodId: 'thanhdo-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'thanhdo-cutoff-2026',
    sourceNote: 'Ngưỡng nhóm "tier16" (Kế toán, Quản trị Văn phòng, Quản trị Khách sạn, Việt Nam học, Giáo dục học) 16,0/30; khu vực 3 -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp A00 (Toán 6 + Vật lí 5 + Hóa 5) = 16,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 16,00/30 >= ngưỡng 16,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { group: 'tier16', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 16, total30: 16 },
  },
  {
    id: 'thanhdo-2026-tier20-below-floor-with-priority-still-fails',
    schoolId: 'thanhdo',
    methodId: 'thanhdo-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'thanhdo-cutoff-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng (judgment call) nhưng tổng thô quá thấp vẫn không đủ ngưỡng "tier20" (Luật, Dược học) 20,0/30.',
    derivation: `
      Tổ hợp A00 (Toán 6 + Vật lí 6 + Hóa 6) = 18,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 18 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 18,00 + 1,75 = 19,75/30 < ngưỡng 20,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { group: 'tier20', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 18, total30: 19.75 },
  },
  {
    id: 'thanhdo-2026-priority-reduction-pass-tier18',
    schoolId: 'thanhdo',
    methodId: 'thanhdo-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'thanhdo-cutoff-2026',
    sourceNote: 'Ngành Điều dưỡng, ngưỡng "tier18" 18,0/30; tổng thô cao (>=22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia.',
    derivation: `
      Tổ hợp B00 (Toán 8 + Hóa 8 + Sinh 8) = 24,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 24 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 24) / 7,5] × 2,75 = (6/7,5) × 2,75 = 0,8 × 2,75 = 2,2 -> round2 = 2,20.
      Tổng dùng để so ngưỡng = 24,00 + 2,20 = 26,20/30 >= ngưỡng 18,00 (Điều dưỡng) -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { group: 'tier18', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, rawScore30: 24, total30: 26.2 },
  },
];
