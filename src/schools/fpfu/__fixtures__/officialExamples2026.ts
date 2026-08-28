import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { ThresholdOnlyEvaluationContext } from '../../thptThresholdOnly';

/**
 * Tier C — trang tuyển sinh chính thức FPFU (?p=210262) không fetch trực tiếp được (DNS bị chặn
 * trong môi trường research), nhưng nội dung công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu
 * tiên và ngưỡng 15,00/30 được xác nhận qua 2 lượt tra cứu độc lập cùng khớp chi tiết cụ thể, cộng
 * thêm ngưỡng 15,00/30 cross-checked qua 2 báo nhà nước độc lập (Dân Trí, VietNamNet). Mức điểm ưu
 * tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT
 * 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const fpfuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: ThresholdOnlyEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'fpfu-2026-kv3-pass-no-priority',
    schoolId: 'fpfu',
    methodId: 'fpfu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fpfu-official-notice-2026',
    sourceNote: 'Ngưỡng 15,00/30 (cross-checked); thí sinh khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 5 + Lý 5 + Hóa 5) = 15,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 15, total30: 15 },
  },
  {
    id: 'fpfu-2026-below-floor-with-priority-still-fails',
    schoolId: 'fpfu',
    methodId: 'fpfu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fpfu-official-notice-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng nhưng tổng thô quá thấp vẫn không đủ ngưỡng.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 4 + Lý 4 + Hóa 4) = 12,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 12 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 12,00 + 1,75 = 13,75/30 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 12, total30: 13.75 },
  },
  {
    id: 'fpfu-2026-priority-reduction-pass',
    schoolId: 'fpfu',
    methodId: 'fpfu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fpfu-official-notice-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia (Điều 7 TT 06/2026/TT-BGDĐT).',
    derivation: `
      Tổng thô 3 môn tổ hợp D07 (Toán 9 + Hóa 9 + Anh 8) = 26,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 26 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 26) / 7,5] × 2,75 = (4/7,5) × 2,75 = 0,5333 × 2,75 = 1,4667 -> round2 = 1,47.
      Tổng dùng để so ngưỡng = 26,00 + 1,47 = 27,47/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, chemistry: 9, english: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'D07', subjects: ['math', 'chemistry', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 26, total30: 27.47 },
  },
];
