import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { DainamThptExamEvaluationContext } from '../evaluate';

/**
 * Tier B — thông báo chính thức tuyensinh.dainam.edu.vn (mục 1, đọc trực tiếp qua curl 2026-08-28)
 * công bố TRỰC TIẾP con số ngưỡng "15 điểm (thang điểm 30, không nhân hệ số, không bao gồm điểm
 * cộng, điểm ưu tiên khu vực và đối tượng...)", áp dụng ngành ngoài lĩnh vực Sức khoẻ/Pháp luật.
 * Không phải worked example (Tier A) — là 1 con số ngưỡng công bố trực tiếp trong văn bản, dùng
 * làm anchor Tier B.
 */
export const dainamThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: DainamThptExamEvaluationContext },
  { eligible: boolean; total30: number }
>[] = [
  {
    id: 'dainam-2026-exact-threshold-pass',
    schoolId: 'dainam',
    methodId: 'dainam-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'dainam-threshold-2026',
    sourceNote:
      'Ngưỡng đảm bảo chất lượng đầu vào công bố trực tiếp = 15,00/30 cho ngành ngoài Sức khoẻ/Pháp luật, KHÔNG cộng điểm ưu tiên khu vực/đối tượng dù thí sinh có khai báo.',
    derivation: `
      Tổ hợp A00 (Toán 5 + Vật lí 5 + Hóa 5) = 15,00/30.
      Nguồn xác nhận trực tiếp: ngưỡng 15 điểm KHÔNG bao gồm điểm ưu tiên khu vực/đối tượng ->
      dù thí sinh khai KV1 + UT1, điểm ưu tiên KHÔNG được cộng vào tổng dùng để so ngưỡng.
      Tổng dùng để so ngưỡng = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, total30: 15 },
  },
  {
    id: 'dainam-2026-exact-threshold-fail-below-15',
    schoolId: 'dainam',
    methodId: 'dainam-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'dainam-threshold-2026',
    sourceNote: 'Tổng điểm thô dưới ngưỡng 15,00/30 công bố trực tiếp -> không đạt, bất kể điểm ưu tiên khai báo.',
    derivation: `
      Tổ hợp A00 (Toán 4 + Vật lí 5 + Hóa 5,4) = 14,40/30.
      Nguồn xác nhận trực tiếp: ngưỡng KHÔNG cộng điểm ưu tiên -> tổng dùng để so ngưỡng vẫn = 14,40/30.
      14,40 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, physics: 5, chemistry: 5.4 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, total30: 14.4 },
  },
];
