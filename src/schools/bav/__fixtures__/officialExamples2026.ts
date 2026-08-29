import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { BavThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `bav-threshold-2026`/`bav-admission-info-2026` công bố công thức (Toán nhân đôi,
 * quy đổi thang 30) và bảng ngưỡng theo mã xét tuyển (Tier B ingredient, `thresholds.ts`), nhưng
 * điểm ưu tiên dùng GIÁ TRỊ bảng theo khung quốc gia (judgment call, `priority.ts`) — expected tính
 * TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const bavThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: BavThptExamExactEvaluationContext },
  { eligible: boolean; weighted30: number; finalScore30: number }
>[] = [
  {
    id: 'bav-2026-exact-bank01-clc-threshold-pass',
    schoolId: 'bav',
    methodId: 'bav-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'bav-threshold-2026',
    sourceNote: 'BANK01 (Chất lượng cao Ngân hàng) có ngưỡng chuẩn/CLC cao nhất bảng: 21,50/30.',
    derivation: `
      Tổ hợp A01 (Toán 5 + Vật lí 5 + Anh 5): quy đổi = (2×5 + 5 + 5) × 30/40 = 20 × 30/40 = 15,00.
      15,00 < 21,50 -> chưa đạt ngưỡng BANK01.
      Không khai khu vực/đối tượng ưu tiên -> điểm ưu tiên = 0.
      Điểm xét = 15,00 + 0 = 15,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, english: 5 } } },
      context: { programCode: 'BANK01', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } },
    },
    expected: { eligible: false, weighted30: 15, finalScore30: 15 },
  },
  {
    id: 'bav-2026-exact-bank01-clc-threshold-pass-high',
    schoolId: 'bav',
    methodId: 'bav-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'bav-threshold-2026',
    sourceNote: 'BANK01 (Chất lượng cao Ngân hàng), ngưỡng 21,50/30, thí sinh đạt điểm cao và có ưu tiên KV1.',
    derivation: `
      Tổ hợp A01 (Toán 9 + Vật lí 8 + Anh 8,5): quy đổi = (2×9 + 8 + 8,5) × 30/40 = 34,5 × 30/40 = 25,875 -> làm tròn 2 chữ số = 25,88.
      25,88 >= 21,50 -> đạt ngưỡng BANK01.
      Điểm ưu tiên chuẩn KV1 = 0,75 (25,88 >= 22,5 -> giảm): ĐUT = ((30-25,88)/7,5) × 0,75 = 0,412 -> làm tròn 0,41.
      Điểm xét = 25,88 + 0,41 = 26,29/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, physics: 8, english: 8.5 } }, priority: { region: 'KV1' } },
      context: { programCode: 'BANK01', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } },
    },
    expected: { eligible: true, weighted30: 25.88, finalScore30: 26.29 },
  },
  {
    id: 'bav-2026-exact-bank04-joint-degree-lower-threshold',
    schoolId: 'bav',
    methodId: 'bav-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'bav-threshold-2026',
    boundaryNote: 'joint-degree threshold band (19,00/30) so với chuẩn/CLC (21,50/30)',
    sourceNote: 'BANK04 (Tài chính-Ngân hàng, liên kết ĐH Sunderland, cấp song bằng) có ngưỡng thấp hơn: 19,00/30.',
    derivation: `
      Tổ hợp D01 (Toán 6 + Văn 6 + Anh 6,5): quy đổi = (2×6 + 6 + 6,5) × 30/40 = 24,5 × 30/40 = 18,375 -> làm tròn 18,38.
      18,38 < 19,00 -> chưa đạt ngưỡng BANK04 (dù cao hơn ngưỡng chuẩn/CLC nếu tính theo BANK01, vì BANK04 dùng ngưỡng liên kết quốc tế thấp hơn nhưng vẫn cao hơn điểm này).
      Không khai ưu tiên -> điểm ưu tiên = 0. Điểm xét = 18,38/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } },
      context: { programCode: 'BANK04', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, weighted30: 18.38, finalScore30: 18.38 },
  },
];
