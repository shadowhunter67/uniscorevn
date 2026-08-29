import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { PhenikaaThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `phenikaa-threshold-2026` công bố ngưỡng theo lĩnh vực/ngành (Tier B ingredient,
 * `thresholds.ts`) và công thức đơn giản (không hệ số, không điểm cộng), nhưng điểm ưu tiên dùng
 * GIÁ TRỊ bảng theo khung quốc gia (judgment call, `priority.ts`) cho các ngành ngoài 2 CTĐT tài
 * năng — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const phenikaaThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: PhenikaaThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'phenikaa-2026-exact-talent-cs-threshold-pass-no-priority',
    schoolId: 'phenikaa',
    methodId: 'phenikaa-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'phenikaa-threshold-2026',
    sourceNote: 'CTĐT tài năng Khoa học máy tính, ngưỡng 24/30, loại trừ tuyệt đối điểm ưu tiên.',
    derivation: `
      Tổ hợp A00 (Toán 8 + Vật lí 8 + Hóa 8) = 24,00/30 (tổng thô, không hệ số) >= 24,00 -> đạt.
      CTĐT tài năng: điểm ưu tiên = 0 (loại trừ tuyệt đối, dù khai KV1).
      Điểm xét = 24,00 + 0 = 24,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'talent-cs', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24 },
  },
  {
    id: 'phenikaa-2026-exact-law-threshold-fail-below',
    schoolId: 'phenikaa',
    methodId: 'phenikaa-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'phenikaa-threshold-2026',
    sourceNote: 'Lĩnh vực Pháp luật, ngưỡng 20,00/30.',
    derivation: `
      Tổ hợp D01 (Toán 5 + Văn 5 + Anh 5,5) = 15,50/30 (tổng thô) < 20,00 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Điểm xét = 15,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 5, english: 5.5 } } },
      context: { fieldId: 'law', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 15.5, finalScore30: 15.5 },
  },
  {
    id: 'phenikaa-2026-exact-health-medicine-priority-reduction',
    schoolId: 'phenikaa',
    methodId: 'phenikaa-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'phenikaa-threshold-2026',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceNote: 'Lĩnh vực Sức khỏe Y khoa/Răng Hàm Mặt, ngưỡng 22,00/30, thí sinh đạt điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp B00 (Toán 8 + Hóa 8 + Sinh 8) = 24,00/30 (tổng thô) >= 22,00 -> đạt.
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) × 0,75 = 0,6.
      Điểm xét = 24,00 + 0,6 = 24,60/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'health-medicine-dentistry', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
