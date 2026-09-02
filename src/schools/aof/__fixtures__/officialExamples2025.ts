import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { AofThptExamExactEvaluationContext2025 } from '../evaluate';

/**
 * Tier C — nguồn `aof-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành/chương trình
 * và việc ĐÃ CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call,
 * `priority2025.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const aofThptExamExactGoldenCases2025: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: AofThptExamExactEvaluationContext2025 },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'aof-2025-exact-icaew-program-pass-no-priority',
    schoolId: 'aof',
    methodId: 'aof-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'aof-threshold-2025',
    sourceNote: 'Điểm chuẩn Ngân hàng (Theo định hướng ICAEW CFAB) (7340201QT01.15) = 21,00/30, mức sàn thấp nhất trường (chung với nhiều chương trình quốc tế khác).',
    derivation: `
      Tổ hợp D01 (Toán 7 + Văn 7 + Anh 7) = 21,00/30 (tổng thô) >= 21,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 21,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, literature: 7, english: 7 } } },
      context: { fieldCode: '7340201QT01.15', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 21, finalScore30: 21 },
  },
  {
    id: 'aof-2025-exact-auditing-fail',
    schoolId: 'aof',
    methodId: 'aof-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'aof-threshold-2025',
    sourceNote: 'Điểm chuẩn Kiểm toán (7340302) = 26,60/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp A00 (Toán 8,5 + Lý 8,5 + Hóa 8,5) = 25,50/30 (tổng thô) < 26,60 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, physics: 8.5, chemistry: 8.5 } } },
      context: { fieldCode: '7340302', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'aof-2025-exact-marketing-priority-reduction',
    schoolId: 'aof',
    methodId: 'aof-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'aof-threshold-2025',
    sourceNote: 'Điểm chuẩn Marketing (7340115) = 26,23/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8,7 + Văn 8,6 + Anh 8,6) = 25,90/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 25,90 >= 22,5 -> CÓ giảm: ĐUT = [(30-25,90)/7,5] x 0,75 = 0,41.
      Tổng = 25,90 + 0,41 = 26,31/30 >= 26,23 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.7, literature: 8.6, english: 8.6 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7340115', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 25.9, finalScore30: 26.31 },
  },
];
