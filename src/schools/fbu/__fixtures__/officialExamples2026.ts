import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { FbuThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — Quyết định 99/QĐ-ĐHTNH không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ công thức Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn
 * 3)/4] × 3 + ĐKK + ĐXT + ĐƯT (mục 2.1.2), ngưỡng 17,00/30 (mục 6.1.1), bảng điểm cộng IELTS cụ
 * thể (Bảng 2.1), trong 1 văn bản chính thức (`fbu-qd99-2026`, verified, đọc trực tiếp qua vision).
 * Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1
 * 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const fbuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: FbuThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'fbu-2026-standard-pass-with-priority-and-ielts-bonus',
    schoolId: 'fbu',
    methodId: 'fbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fbu-qd99-2026',
    sourceNote: 'Ngưỡng PT1 17,00/30 (mục 6.1.1); chứng chỉ IELTS 5,0 = điểm cộng 1,00 (Bảng 2.1); ưu tiên KV1+UT2 = 1,75 [chuẩn toàn quốc, judgment call].',
    derivation: `
      Tổ hợp D01 (Toán, Ngữ văn, Tiếng Anh) -> môn 1 = Toán (liệt kê trước trong tên tổ hợp).
      Điểm xét tuyển thô = [((Toán 6 × 2) + Văn 5 + Anh 5)/4] × 3 = [(12 + 10)/4] × 3 = 5,50 × 3 = 16,50/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 16,50 < 22,5 -> không giảm.
      Điểm cộng IELTS 5,0 = 1,00 (Bảng 2.1, dòng "5.0 -> Điểm quy đổi 9,0 / Điểm khuyến khích 1,00").
      Tổng dùng để so ngưỡng = 16,50 + 1,75 + 1,00 = 19,25/30 >= ngưỡng 17,00 -> đạt.
    `,
    input: {
      profile: {
        thpt: { scores: { math: 6, literature: 5, english: 5 } },
        priority: { region: 'KV1', category: 'UT2' },
        certificates: { ielts: 5.0 },
      },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 16.5, total30: 19.25 },
  },
  {
    id: 'fbu-2026-standard-fail-no-priority-no-bonus',
    schoolId: 'fbu',
    methodId: 'fbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fbu-qd99-2026',
    sourceNote: 'Thí sinh khu vực 3, không đối tượng ưu tiên, không chứng chỉ IELTS -> điểm ưu tiên và điểm cộng đều = 0.',
    derivation: `
      Tổ hợp D01 -> môn 1 = Toán.
      Điểm xét tuyển thô = [((Toán 4 × 2) + Văn 4 + Anh 4)/4] × 3 = [(8 + 8)/4] × 3 = 4,00 × 3 = 12,00/30.
      Không điểm ưu tiên (KV3), không điểm cộng (không có IELTS) -> tổng = 12,00/30 < ngưỡng 17,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, literature: 4, english: 4 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, rawScore30: 12, total30: 12 },
  },
  {
    id: 'fbu-2026-standard-priority-reduction-pass',
    schoolId: 'fbu',
    methodId: 'fbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'fbu-qd99-2026',
    sourceNote: 'Điểm xét tuyển thô cao (≥22,5) -> áp dụng công thức giảm dần điểm ưu tiên (mục 2.1.2 dẫn chiếu quy định Bộ GD&ĐT).',
    derivation: `
      Tổ hợp D01 -> môn 1 = Toán.
      Điểm xét tuyển thô = [((Toán 9 × 2) + Văn 8 + Anh 8)/4] × 3 = [(18 + 16)/4] × 3 = 8,50 × 3 = 25,50/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 25,50 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 25,50)/7,5] × 2,75 = (4,5/7,5) × 2,75 = 0,6 × 2,75 = 1,65.
      Không có chứng chỉ IELTS -> điểm cộng = 0.
      Tổng dùng để so ngưỡng = 25,50 + 1,65 + 0 = 27,15/30 >= ngưỡng 17,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, literature: 8, english: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, rawScore30: 25.5, total30: 27.15 },
  },
];
