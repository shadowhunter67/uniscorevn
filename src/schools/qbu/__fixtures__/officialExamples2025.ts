import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { QbuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `qbu-threshold-2025`/`qbu-threshold-secondary-2025` xác nhận trực tiếp bảng điểm
 * chuẩn theo ngành x tổ hợp và công thức ĐXT có cộng ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng
 * khung quốc gia (judgment call, `priority.ts`) — expected tính TAY (không gọi calculator) nên
 * xếp Tier C, có `derivation`.
 */
export const qbuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: QbuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'qbu-2025-exact-english-language-pass-no-priority',
    schoolId: 'qbu',
    methodId: 'qbu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qbu-threshold-2025',
    sourceNote: 'Điểm chuẩn Ngôn ngữ Anh (7220201), tổ hợp D09 = 15,00/30 — mức thấp nhất đã mô hình hoá.',
    derivation: `
      Tổ hợp D09 (Toán 5,0 + Sử 5,0 + Anh 5,1) = 15,10/30 (tổng thô) >= 15,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 15,10/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, history: 5, english: 5.1 } } },
      context: { fieldCode: '7220201', subjectContext: { combinationId: 'D09', subjects: ['math', 'history', 'english'] } },
    },
    expected: { eligible: true, raw30: 15.1, finalScore30: 15.1 },
  },
  {
    id: 'qbu-2025-exact-history-geography-education-fail',
    schoolId: 'qbu',
    methodId: 'qbu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qbu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Lịch sử - Địa lí (7140249), tổ hợp C19 = 26,86/30 — mức cao thứ nhì đã mô hình hoá.',
    derivation: `
      Tổ hợp C19 (Văn 8,0 + Sử 8,0 + GDKTPL 8,5) = 24,50/30 (tổng thô) < 26,86 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,50/30.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8, history: 8, 'civic-economic-law': 8.5 } } },
      context: { fieldCode: '7140249', subjectContext: { combinationId: 'C19', subjects: ['literature', 'history', 'civic-economic-law'] } },
    },
    expected: { eligible: false, raw30: 24.5, finalScore30: 24.5 },
  },
  {
    id: 'qbu-2025-exact-primary-education-priority-reduction',
    schoolId: 'qbu',
    methodId: 'qbu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'qbu-threshold-2025',
    sourceNote: 'Điểm chuẩn Giáo dục Tiểu học (7140202), tổ hợp A00 = 23,93/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 7,75 + Lý 7,75 + Hóa 8,0) = 23,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,50 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,50)/7,5] x 0,75 = 0,65.
      Tổng = 23,50 + 0,65 = 24,15/30 >= 23,93 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.75, physics: 7.75, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7140202', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 23.5, finalScore30: 24.15 },
  },
];
