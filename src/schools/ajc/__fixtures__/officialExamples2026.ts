import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { AjcThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — công thức điểm xét tuyển AJC 2026 đã đối chiếu chéo (tuyensinh247, khớp trích dẫn gốc
 * đã ghi trong `knowledgeGaps.ts`/`sources.ts` từ `ajc-admission-2026`), nhưng không có worked
 * example công khai cho công thức điểm ưu tiên. Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn
 * quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1
 * (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const ajcThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: AjcThptExamExactEvaluationContext },
  { eligible: boolean; rawScore: number; total: number }
>[] = [
  {
    id: 'ajc-2026-standard-group-pass-with-priority',
    schoolId: 'ajc',
    methodId: 'ajc-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ajc-admission-2026',
    sourceNote: 'Nhóm Lý luận/Lịch sử/Truyền thông-Quảng cáo-Quan hệ quốc tế: ngưỡng 18,00/30 (thang 30, không hệ số); ưu tiên KV1+UT2 = 1,75 [chuẩn toàn quốc, judgment call].',
    derivation: `
      Tổ hợp A00 (Toán, Vật lí, Hóa học): 6 + 6 + 6 = 18,00/30 (không nhân hệ số, nhóm thang 30).
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 18,00 < 22,5 -> không giảm.
      Điểm xét tuyển = 18,00 + 1,75 = 19,75/30 >= ngưỡng 18,00 -> đạt.
    `,
    input: {
      profile: {
        thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
        priority: { region: 'KV1', category: 'UT2' },
      },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] }, programGroupId: 'lyluan-lichsu-truyenthong' },
    },
    expected: { eligible: true, rawScore: 18, total: 19.75 },
  },
  {
    id: 'ajc-2026-standard-group-fail-no-priority',
    schoolId: 'ajc',
    methodId: 'ajc-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ajc-admission-2026',
    sourceNote: 'Thí sinh khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp A00: 5 + 5 + 5 = 15,00/30.
      Không điểm ưu tiên (KV3) -> điểm xét tuyển = 15,00/30 < ngưỡng 18,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] }, programGroupId: 'lyluan-lichsu-truyenthong' },
    },
    expected: { eligible: false, rawScore: 15, total: 15 },
  },
  {
    id: 'ajc-2026-baochi-group-pass-with-priority-reduction',
    schoolId: 'ajc',
    methodId: 'ajc-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ajc-admission-2026',
    sourceNote: 'Nhóm Báo chí-Xuất bản (thang 40, Văn hệ số 2): ngưỡng 25,00/40; điểm ưu tiên nhân hệ số 4/3 khi cộng vào điểm xét tuyển.',
    derivation: `
      Tổ hợp D01 (Toán, Ngữ văn, Tiếng Anh), nhóm Báo chí-Xuất bản (Văn hệ số 2):
        Tổng thô = Toán 9 + Văn 9 + Anh 9 + Văn (hệ số thêm) 9 = 36,00/40.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75. Quy đổi tổng thô về thang 30 để so mốc giảm:
        36,00 × 30/40 = 27,00 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực (thang 30) = [(30 - 27,00)/7,5] × 2,75 = (3/7,5) × 2,75 = 0,4 × 2,75 = 1,10.
        Điểm ưu tiên cộng vào (thang 40, ×4/3) = 1,10 × 4/3 = 1,4667 -> round2 = 1,47.
      Điểm xét tuyển = 36,00 + 1,47 = 37,47/40 >= ngưỡng 25,00 -> đạt.
    `,
    input: {
      profile: {
        thpt: { scores: { math: 9, literature: 9, english: 9 } },
        priority: { region: 'KV1', category: 'UT1' },
      },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] }, programGroupId: 'baochi-xuatban' },
    },
    expected: { eligible: true, rawScore: 36, total: 37.47 },
  },
];
