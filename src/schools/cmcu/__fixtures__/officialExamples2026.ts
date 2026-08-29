import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { CmcuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `cmcu-threshold-2026` công bố ngưỡng theo lĩnh vực/ngành (Tier B ingredient,
 * `thresholds.ts`) và công thức "môn chính x2 + 2 môn bất kỳ" trực tiếp, nhưng điểm ưu tiên dùng
 * GIÁ TRỊ bảng theo khung quốc gia (judgment call, `priority.ts`) — expected tính TAY (không gọi
 * calculator) nên xếp Tier C, có `derivation`.
 */
export const cmcuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: CmcuThptExamExactEvaluationContext },
  { eligible: boolean; raw40: number; finalScore40: number }
>[] = [
  {
    id: 'cmcu-2026-exact-ai-threshold-pass-no-priority',
    schoolId: 'cmcu',
    methodId: 'cmcu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'cmcu-threshold-2026',
    sourceNote: 'Ngành Trí tuệ Nhân tạo, ngưỡng 22,00/40. Toán x2 + Lý + Hóa.',
    derivation: `
      Toán 7 x2 = 14; + Vật lí 4 + Hóa 4 = 22,00/40 (tổng thô) >= 22,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Điểm xét = 22,00 + 0 = 22,00/40.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, physics: 4, chemistry: 4 } } },
      context: { fieldId: 'ai', mainSubjectId: 'math', otherSubjectIds: ['physics', 'chemistry'] },
    },
    expected: { eligible: true, raw40: 22, finalScore40: 22 },
  },
  {
    id: 'cmcu-2026-exact-other-threshold-fail-below',
    schoolId: 'cmcu',
    methodId: 'cmcu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'cmcu-threshold-2026',
    sourceNote: 'Nhóm "các ngành còn lại", ngưỡng 20,00/40. Toán x2 + Văn + Anh.',
    derivation: `
      Toán 5 x2 = 10; + Văn 4 + Anh 4 = 18,00/40 (tổng thô) < 20,00 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Điểm xét = 18,00/40.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 4, english: 4 } } },
      context: { fieldId: 'other', mainSubjectId: 'math', otherSubjectIds: ['literature', 'english'] },
    },
    expected: { eligible: false, raw40: 18, finalScore40: 18 },
  },
  {
    id: 'cmcu-2026-exact-multimedia-literature-main-subject',
    schoolId: 'cmcu',
    methodId: 'cmcu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'cmcu-threshold-2026',
    boundaryNote: 'Truyền thông Đa phương tiện cho phép chọn Văn làm môn chính (x2), khác 8/9 ngành còn lại (Toán).',
    sourceNote: 'Ngành Truyền thông Đa phương tiện, ngưỡng 21,00/40, môn chính Ngữ văn.',
    derivation: `
      Văn 6 x2 = 12; + Toán 5 + Anh 5 = 22,00/40 (tổng thô) >= 21,00 -> đạt.
      Điểm ưu tiên chuẩn KV1 = 0,75 (thang 30); quy đổi thang 40: 0,75 x 4/3 = 1,00.
      Tổng thô quy đổi thang 30 = 22,00 x 30/40 = 16,50 < 22,5 -> không giảm trừ.
      Điểm xét = 22,00 + 1,00 = 23,00/40.
    `,
    input: {
      profile: { thpt: { scores: { literature: 6, math: 5, english: 5 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'multimedia-communication', mainSubjectId: 'literature', otherSubjectIds: ['math', 'english'] },
    },
    expected: { eligible: true, raw40: 22, finalScore40: 23 },
  },
];
