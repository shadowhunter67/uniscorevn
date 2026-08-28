import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { UedudnThptExamEvaluationContext } from '../evaluate';

/**
 * Tier B — ảnh chính thức "ĐIỂM NGƯỠNG ĐẦU VÀO ĐẠI HỌC CHÍNH QUY NĂM 2026 THEO ĐIỂM THI THPT"
 * (tuyensinh.ued.udn.vn, `uedudn-admission-info-2026`, tải trực tiếp qua curl + đọc qua vision
 * 2026-08-28) công bố ĐẦY ĐỦ bảng ngưỡng 37 ngành + mục GHI CHÚ xác nhận trực tiếp công thức
 * "tổng 3 môn + điểm ưu tiên KV/ĐT". Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc
 * (judgment call, xem `priority.ts`).
 */
export const uedudnThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: UedudnThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'uedudn-2026-tier15_5-kv3-pass-no-priority',
    schoolId: 'uedudn',
    methodId: 'uedudn-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'uedudn-admission-info-2026',
    sourceNote: 'Ngưỡng nhóm "tier15_5" (vd Công nghệ giáo dục, CNTT sinh học, Vật lý kỹ thuật...) 15,50/30; khu vực 3 -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp A00 (Toán 5,5 + Vật lí 5 + Hóa 5) = 15,50/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 15,50/30 >= ngưỡng 15,50 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5.5, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { group: 'tier15_5', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 15.5, total30: 15.5 },
  },
  {
    id: 'uedudn-2026-tier20-below-floor-with-priority-still-fails',
    schoolId: 'uedudn',
    methodId: 'uedudn-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'uedudn-admission-info-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng (tuyên bố trực tiếp, mục GHI CHÚ) nhưng tổng thô quá thấp vẫn không đủ ngưỡng "tier20" (khối sư phạm) 20,0/30.',
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
    id: 'uedudn-2026-priority-reduction-pass-tier17',
    schoolId: 'uedudn',
    methodId: 'uedudn-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'uedudn-admission-info-2026',
    sourceNote: 'Ngành nhóm "tier17" (vd CNTT, Báo chí, Khoa học dữ liệu...) ngưỡng 17,0/30; tổng thô cao (>=22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia.',
    derivation: `
      Tổ hợp A00 (Toán 8 + Vật lí 8 + Hóa 8) = 24,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 24 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 24) / 7,5] × 2,75 = (6/7,5) × 2,75 = 0,8 × 2,75 = 2,2 -> round2 = 2,20.
      Tổng dùng để so ngưỡng = 24,00 + 2,20 = 26,20/30 >= ngưỡng 17,00 (tier17) -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { group: 'tier17', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 24, total30: 26.2 },
  },
];
