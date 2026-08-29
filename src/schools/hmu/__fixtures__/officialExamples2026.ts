import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HmuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier B — bảng ngưỡng theo ngành lấy TRỰC TIẾP từ nguồn (`hmu-threshold-2026`), công thức so sánh
 * (tổng thô 3 môn, không hệ số, không cộng ưu tiên) cũng được nguồn xác nhận trực tiếp — expected
 * chỉ là 1 dòng bảng + phép cộng đơn giản, không cần derivation Tier C.
 */
export const hmuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HmuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number }
>[] = [
  {
    id: 'hmu-2026-exact-ykhoa-threshold-pass',
    schoolId: 'hmu',
    methodId: 'hmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hmu-threshold-2026',
    sourceNote: 'Ngành Y khoa (7720101, tổ hợp B00) có ngưỡng 24,0/30 — thí sinh đạt đúng ngưỡng, không cộng ưu tiên.',
    input: {
      profile: { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } }, priority: { region: 'KV1' } },
      context: { selectedProgramId: 'y-khoa', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 24 },
  },
  {
    id: 'hmu-2026-exact-ykhoa-threshold-fail-below',
    schoolId: 'hmu',
    methodId: 'hmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hmu-threshold-2026',
    sourceNote: 'Ngành Y khoa (7720101, tổ hợp B00) có ngưỡng 24,0/30 — thí sinh dưới ngưỡng dù có điểm ưu tiên (ngưỡng không cộng ưu tiên nên vẫn KHÔNG đạt).',
    input: {
      profile: { thpt: { scores: { math: 7, chemistry: 7.5, biology: 8 } }, priority: { region: 'KV1' } },
      context: { selectedProgramId: 'y-khoa', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: false, raw30: 22.5 },
  },
  {
    id: 'hmu-2026-exact-congtacxahoi-threshold-pass',
    schoolId: 'hmu',
    methodId: 'hmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hmu-threshold-2026',
    sourceNote: 'Ngành Công tác xã hội (7760101, tổ hợp D01) có ngưỡng thấp nhất trong bảng: 17,0/30.',
    input: {
      profile: { thpt: { scores: { math: 6, literature: 6, english: 5.5 } } },
      context: { selectedProgramId: 'cong-tac-xa-hoi', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 17.5 },
  },
];
