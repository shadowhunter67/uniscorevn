import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuaThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — không có worked example công khai cho tổ hợp (điểm thô 3 môn + điểm ưu tiên) của
 * `vnua-thpt-exam-exact-2026`. 2 rule độc lập:
 *   - Ngưỡng nhóm ngành (`vnua-threshold-notice-2026`, verified): bảng ảnh tb1.jpg, transcribe
 *     trực tiếp vào `thresholds.ts`. Case dưới dùng HVN18 (Kỹ thuật điện và Máy tính, ngưỡng
 *     20,00/30) và HVN01 (Thú y, ngưỡng 16,00/30).
 *   - Điểm ưu tiên khu vực/đối tượng (`vnua-admission-notice-2026`, trích nguyên văn quy tắc
 *     chênh lệch + công thức giảm dần — khớp Điều 7 TT 06/2026, judgment call cho giá trị tuyệt
 *     đối từng mức, xem `priority.ts`): KV1 0,75 + UT1 2,0 = 2,75 mức chuẩn.
 * Ngưỡng so trực tiếp với TỔNG THÔ (không cộng ưu tiên) — nguồn ngưỡng im lặng về việc đã gồm ưu
 * tiên hay chưa (judgment call, cùng tiền lệ HCMUE); ĐXT (thô + ưu tiên) chỉ hiển thị tham khảo.
 */
export const vnuaThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuaThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; referenceDxt30: number }
>[] = [
  {
    id: 'vnua-2026-hvn18-raw-threshold-pass-no-priority',
    schoolId: 'vnua',
    methodId: 'vnua-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnua-threshold-notice-2026',
    sourceNote: 'Ngưỡng HVN18 (Kỹ thuật điện và Máy tính) = 20,00/30 [tb1.jpg, verified]; hồ sơ không có điểm ưu tiên.',
    derivation: `
      Tổng thô 3 môn (Toán 7 + Lý 7 + Hóa 6) = 20,00/30 >= ngưỡng 20,00 -> đạt.
      Không có điểm ưu tiên (region/category chưa nhập) -> ĐƯT = 0.
      ĐXT tham khảo = 20,00 + 0 = 20,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } },
      context: { programGroupId: 'HVN18', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 20, referenceDxt30: 20 },
  },
  {
    id: 'vnua-2026-hvn18-raw-threshold-fail-despite-priority',
    schoolId: 'vnua',
    methodId: 'vnua-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnua-threshold-notice-2026',
    sourceNote: 'Ngưỡng HVN18 = 20,00/30 [tb1.jpg, verified]; nguồn im lặng về việc đã gồm ưu tiên -> so tổng thô (judgment call, cùng tiền lệ HCMUE).',
    derivation: `
      Tổng thô 3 môn (Toán 6 + Lý 7 + Hóa 6) = 19,00/30 < ngưỡng 20,00 -> chưa đạt (so tổng thô).
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 19 < 22,5 -> KHÔNG giảm.
      ĐXT tham khảo = 19,00 + 2,75 = 21,75/30 (không dùng để so ngưỡng).
    `,
    boundaryNote: 'Chứng minh ngưỡng so với tổng thô, không cộng ưu tiên dù ĐXT tham khảo vượt ngưỡng.',
    input: {
      profile: { thpt: { scores: { math: 6, physics: 7, chemistry: 6 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { programGroupId: 'HVN18', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 19, referenceDxt30: 21.75 },
  },
  {
    id: 'vnua-2026-hvn01-priority-reduction-reference-dxt',
    schoolId: 'vnua',
    methodId: 'vnua-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'vnua-threshold-notice-2026',
    sourceNote: 'Ngưỡng HVN01 (Thú y) = 16,00/30 [tb1.jpg, verified]; mức ưu tiên chuẩn KV1+UT1 = 2,75, giảm tuyến tính vì tổng thô ≥ 22,5.',
    derivation: `
      Tổng thô 3 môn (Toán 8 + Lý 8 + Hóa 8) = 24,00/30 >= ngưỡng 16,00 -> đạt.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 24 >= 22,5 -> áp dụng giảm:
        ĐƯT hiệu lực = [(30 - 24) / 7,5] × 2,75 = (6/7,5) × 2,75 = 0,8 × 2,75 = 2,20.
      ĐXT tham khảo = 24,00 + 2,20 = 26,20/30.
    `,
    boundaryNote: 'Priority reduction boundary — tổng thô đúng bằng mốc giảm ưu tiên 22,5.',
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { programGroupId: 'HVN01', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 24, referenceDxt30: 26.2 },
  },
];
