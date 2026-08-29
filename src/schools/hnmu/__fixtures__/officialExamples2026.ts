import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HnmuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier B — nguồn `hnmu-threshold-2026` công bố TRỰC TIẾP con số ngưỡng theo nhóm ngành (thang 30,
 * tổng thô, không nhân hệ số, không cộng điểm cộng/ưu tiên) — expected lấy trực tiếp 1 dòng bảng
 * nguồn, không cần suy diễn/judgment call gì thêm (khác Phenikaa/HOU/UTM/LHU vốn cần judgment call
 * điểm ưu tiên).
 */
export const hnmuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HnmuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number }
>[] = [
  {
    id: 'hnmu-2026-exact-other-threshold-pass',
    schoolId: 'hnmu',
    methodId: 'hnmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hnmu-threshold-2026',
    sourceNote: 'Nhóm "các ngành/chương trình đào tạo khác", ngưỡng 16,00/30.',
    input: {
      profile: { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } },
      context: { groupId: 'other', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 16 },
  },
  {
    id: 'hnmu-2026-exact-teacher-training-threshold-fail-below',
    schoolId: 'hnmu',
    methodId: 'hnmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hnmu-threshold-2026',
    sourceNote: 'Nhóm "chương trình đào tạo giáo viên trình độ đại học", ngưỡng 20,00/30.',
    input: {
      profile: { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } },
      context: { groupId: 'teacher-training', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 18.5 },
  },
  {
    id: 'hnmu-2026-exact-physical-education-threshold-pass-boundary',
    schoolId: 'hnmu',
    methodId: 'hnmu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    boundaryNote: 'group threshold boundary (19,00/30, Giáo dục Thể chất)',
    sourceId: 'hnmu-threshold-2026',
    sourceNote: 'Nhóm "chương trình đào tạo Giáo dục Thể chất", ngưỡng 19,00/30 cho tổ hợp 3 môn văn hóa.',
    input: {
      profile: { thpt: { scores: { math: 6, physics: 6, chemistry: 7 } } },
      context: { groupId: 'physical-education-teacher-training', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 19 },
  },
];
