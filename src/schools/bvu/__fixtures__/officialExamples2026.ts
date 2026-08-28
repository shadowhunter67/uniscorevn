import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { BvuThptExamEvaluationContext } from '../evaluate';

/**
 * Tier B — bài đăng chính thức BVU (10/08/2026, `bvu-diem-trung-tuyen-2026`) công bố TRỰC TIẾP
 * bảng ngưỡng theo nhóm ngành cho phương thức thi TN THPT (Dược 20/Điều dưỡng 18/Luật 20/khác 15)
 * và xác nhận KHÔNG cộng điểm ưu tiên khu vực/đối tượng — không cần công thức derive thêm, chỉ so
 * trực tiếp tổng thô 3 môn với số trong bảng.
 */
export const bvuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: BvuThptExamEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'bvu-2026-standard-pass-at-floor-priority-ignored',
    schoolId: 'bvu',
    methodId: 'bvu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'bvu-diem-trung-tuyen-2026',
    sourceNote: 'Ngưỡng "các ngành khác" 15,00/30 (bảng công bố 10/08/2026); trích nguyên văn "không cộng điểm ưu tiên khu vực, đối tượng" -> điểm ưu tiên KV1+UT1 trong hồ sơ không được cộng vào.',
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] }, group: 'standard' },
    },
    expected: { eligible: true, rawScore30: 15, total30: 15 },
  },
  {
    id: 'bvu-2026-pharmacy-fail-below-higher-floor',
    schoolId: 'bvu',
    methodId: 'bvu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'bvu-diem-trung-tuyen-2026',
    sourceNote: 'Ngưỡng "Dược học" 20,00/30 (bảng công bố 10/08/2026) — cao hơn nhóm chuẩn.',
    input: {
      profile: { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] }, group: 'pharmacy' },
    },
    expected: { eligible: false, rawScore30: 18, total30: 18 },
  },
  {
    id: 'bvu-2026-law-pass-at-floor',
    schoolId: 'bvu',
    methodId: 'bvu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'bvu-diem-trung-tuyen-2026',
    sourceNote: 'Ngưỡng "Luật" 20,00/30 (bảng công bố 10/08/2026).',
    input: {
      profile: { thpt: { scores: { math: 7, physics: 7, chemistry: 6 } } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] }, group: 'law' },
    },
    expected: { eligible: true, rawScore30: 20, total30: 20 },
  },
];
