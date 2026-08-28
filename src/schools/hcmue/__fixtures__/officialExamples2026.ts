import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HcmueThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — không có worked example công khai cho tổ hợp (điểm thô 3 môn + điểm ưu tiên) của
 * `hcmue-thpt-exam-exact-2026`. 2 rule độc lập, 2 evidence độc lập:
 *   - Ngưỡng đầu vào theo ngành (`hcmue-thresholds-2026`, verified): bảng 47 ngành trụ sở chính
 *     TP.HCM, transcribe trực tiếp từ ảnh bảng gốc (`data/programs.ts`). Case dưới dùng ngành
 *     7140209 (Sư phạm Toán học, ngưỡng 24,00/30).
 *   - Điểm ưu tiên khu vực/đối tượng (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment call — cùng tiền
 *     lệ CTU/TBDU/HUCE, xem `priority.ts`): KV1 0,75 + UT1 2,0 = 2,75 mức chuẩn; giảm tuyến tính vì
 *     tổng thô 24 ≥ 22,5.
 * Ngưỡng so trực tiếp với TỔNG THÔ (không cộng ưu tiên) — nguồn ngưỡng im lặng về việc đã gồm ưu
 * tiên hay chưa (judgment call, xem `evaluate.ts`/`methods.ts`); ĐXT (thô + ưu tiên) chỉ hiển thị
 * tham khảo, không dùng để so ngưỡng.
 */
export const hcmueThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HcmueThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; referenceDxt30: number }
>[] = [
  {
    id: 'hcmue-2026-formula-derived-raw-threshold-pass-with-priority-reduction',
    schoolId: 'hcmue',
    methodId: 'hcmue-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmue-thresholds-2026',
    sourceNote:
      'Ngưỡng ngành 7140209 (Sư phạm Toán học, trụ sở chính TP.HCM) = 24,00/30 [hcmue-thresholds-2026, verified]; mức ưu tiên chuẩn KV1+UT1 = 2,75, giảm tuyến tính vì tổng thô ≥ 22,5 [Điều 7 TT 06/2026, judgment call].',
    derivation: `
      Tổng thô 3 môn (Toán 8 + Lý 8 + Hóa 8) = 24,00/30 ≥ ngưỡng 24,00 -> đạt.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75.
      Tổng thô 24 >= ngưỡng giảm 22,5 -> áp dụng công thức giảm:
        ĐƯT hiệu lực = [(30 - 24) / 7,5] × 2,75 = (6/7,5) × 2,75 = 0,8 × 2,75 = 2,20.
      ĐXT tham khảo = 24,00 + 2,20 = 26,20/30 (không dùng để so ngưỡng).
    `,
    boundaryNote: 'Priority reduction boundary — tổng thô đúng bằng ngưỡng ngành và đã vượt mốc giảm ưu tiên 22,5.',
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { selectedProgramId: 'hcmue-7140209', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 24, referenceDxt30: 26.2 },
  },
  {
    id: 'hcmue-2026-formula-derived-raw-threshold-fail-below-program-threshold',
    schoolId: 'hcmue',
    methodId: 'hcmue-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmue-thresholds-2026',
    sourceNote: 'Ngưỡng ngành 7140209 = 24,00/30 [hcmue-thresholds-2026, verified]; tổng thô dưới ngưỡng dù cộng ưu tiên vẫn KHÔNG dùng để so ngưỡng (nguồn im lặng, judgment call so tổng thô).',
    derivation: `
      Tổng thô 3 môn (Toán 8 + Lý 8 + Hóa 7,98) = 23,98/30 < ngưỡng 24,00 -> chưa đạt (so tổng thô,
      không cộng điểm ưu tiên dù hồ sơ có KV1+UT1).
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 23,98 >= 22,5 -> giảm tuyến tính:
        ĐƯT hiệu lực = [(30 - 23,98) / 7,5] × 2,75 = (6,02/7,5) × 2,75 ≈ 2,21.
      ĐXT tham khảo = 23,98 + 2,21 = 26,19/30 (không dùng để so ngưỡng).
    `,
    boundaryNote: 'Below-threshold boundary — 0,02 điểm dưới ngưỡng ngành, dù có điểm ưu tiên vẫn ineligible vì so tổng thô.',
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8, chemistry: 7.98 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { selectedProgramId: 'hcmue-7140209', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 23.98, referenceDxt30: 26.19 },
  },
];
