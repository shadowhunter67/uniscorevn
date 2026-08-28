import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { ThresholdOnlyEvaluationContext } from '../../thptThresholdOnly';

/**
 * Tier C — Ảnh "Ngưỡng đầu vào xét tuyển đại học chính quy năm 2026" (đọc trực tiếp qua vision,
 * `uflsudn-teacher-training-threshold-2026`, verified) xác nhận ngưỡng 20,00/30 cho 4 ngành đào
 * tạo giáo viên ngoại ngữ = tổng điểm 3 môn thi TN THPT + điểm ưu tiên khu vực, đối tượng. Công
 * thức điểm ưu tiên (Thông tư 06/2026/TT-BGDĐT + giảm dần ≥22,5/30) từ PDF chính thức "Thông tin
 * tuyển sinh năm 2026" mục 5.2 (`uflsudn-admission-info-2026`, verified, đọc qua pdftotext). Mức
 * điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 /
 * KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const uflsudnTeacherTrainingExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: ThresholdOnlyEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'uflsudn-2026-kv3-pass-no-priority',
    schoolId: 'uflsudn',
    methodId: 'uflsudn-teacher-training-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uflsudn-teacher-training-threshold-2026',
    sourceNote: 'Ngưỡng 4 ngành Sư phạm ngoại ngữ 20,00/30; khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp D01 (Toán 7 + Ngữ văn 7 + Anh 6) = 20,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 20,00/30 >= ngưỡng 20,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, literature: 7, english: 6 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 20, total30: 20 },
  },
  {
    id: 'uflsudn-2026-below-floor-with-priority-still-fails',
    schoolId: 'uflsudn',
    methodId: 'uflsudn-teacher-training-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uflsudn-teacher-training-threshold-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng nhưng tổng thô quá thấp vẫn không đủ ngưỡng.',
    derivation: `
      Tổ hợp D01 (Toán 5 + Ngữ văn 5 + Anh 5) = 15,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 15 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 15,00 + 1,75 = 16,75/30 < ngưỡng 20,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 5, english: 5 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, rawScore30: 15, total30: 16.75 },
  },
  {
    id: 'uflsudn-2026-priority-reduction-pass',
    schoolId: 'uflsudn',
    methodId: 'uflsudn-teacher-training-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uflsudn-teacher-training-threshold-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia (Thông tư 06/2026/TT-BGDĐT, mục 5.2).',
    derivation: `
      Tổ hợp D01 (Toán 9 + Ngữ văn 9 + Anh 8) = 26,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 26 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 26) / 7,5] × 2,75 = (4/7,5) × 2,75 = 0,5333 × 2,75 = 1,4667 -> round2 = 1,47.
      Tổng dùng để so ngưỡng = 26,00 + 1,47 = 27,47/30 >= ngưỡng 20,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, literature: 9, english: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 26, total30: 27.47 },
  },
];
