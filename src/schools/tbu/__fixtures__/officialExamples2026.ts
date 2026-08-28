import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { TbuThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — Thông báo 565/TB-ĐHTB không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ công thức ĐXT = tổng 3 môn + điểm ưu tiên + điểm cộng (mục 3.1.1), ngưỡng
 * nguồn tuyển 15,00/30 (mục 3.2), bảng điểm cộng IELTS cụ thể (mục 4.2), trong 1 văn bản chính
 * thức (`tbu-thongbao-565-2026`, verified, đọc trực tiếp qua vision). Mức điểm ưu tiên KV/ĐT cụ
 * thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25
 * / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const tbuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: TbuThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'tbu-2026-standard-pass-with-priority-and-ielts-bonus',
    schoolId: 'tbu',
    methodId: 'tbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'tbu-thongbao-565-2026',
    sourceNote: 'Ngưỡng chung PT1 15,00/30 (mục 3.2); chứng chỉ IELTS 6,5 = điểm cộng 1,25 (bảng mục 4.2); ưu tiên KV1+UT2 = 1,75 [chuẩn toàn quốc, judgment call].',
    derivation: `
      Tổng thô 3 môn tổ hợp D01 (Toán 4 + Văn 4 + Anh 4) = 12,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 12 < 22,5 -> không giảm.
      Điểm cộng IELTS 6,5 = 1,25 (bảng mục 4.2, dòng "Thí sinh có chứng chỉ IELTS 6,5").
      Tổng dùng để so ngưỡng = 12,00 + 1,75 + 1,25 = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: {
        thpt: { scores: { math: 4, literature: 4, english: 4 } },
        priority: { region: 'KV1', category: 'UT2' },
        certificates: { ielts: 6.5 },
      },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] }, group: 'standard' },
    },
    expected: { eligible: true, rawScore30: 12, total30: 15 },
  },
  {
    id: 'tbu-2026-standard-fail-no-priority-no-bonus',
    schoolId: 'tbu',
    methodId: 'tbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'tbu-thongbao-565-2026',
    sourceNote: 'Thí sinh khu vực 3, không đối tượng ưu tiên, không chứng chỉ IELTS -> điểm ưu tiên và điểm cộng đều = 0.',
    derivation: `
      Tổng thô 3 môn tổ hợp D01 (Toán 4 + Văn 4 + Anh 3,5) = 11,50/30.
      Không điểm ưu tiên (KV3), không điểm cộng (không có IELTS) -> tổng = 11,50/30 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, literature: 4, english: 3.5 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] }, group: 'standard' },
    },
    expected: { eligible: false, rawScore30: 11.5, total30: 11.5 },
  },
  {
    id: 'tbu-2026-standard-priority-reduction-pass',
    schoolId: 'tbu',
    methodId: 'tbu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'tbu-thongbao-565-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia (mục 4.1 dẫn chiếu quy định Bộ GD&ĐT).',
    derivation: `
      Tổng thô 3 môn tổ hợp D01 (Toán 8 + Văn 8 + Anh 9) = 25,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 25 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 25) / 7,5] × 2,75 = (5/7,5) × 2,75 = 0,6667 × 2,75 = 1,8333 -> round2 = 1,83.
      Không có chứng chỉ IELTS -> điểm cộng = 0.
      Tổng dùng để so ngưỡng = 25,00 + 1,83 + 0 = 26,83/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 9 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] }, group: 'standard' },
    },
    expected: { eligible: true, rawScore30: 25, total30: 26.83 },
  },
];
