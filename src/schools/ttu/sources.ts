import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TtuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const ttuSources: TtuSource[] = [
  {
    id: 'ttu-floor-score-2026',
    publisher: 'Tan Tao University (Trường Đại học Tân Tạo)',
    title: 'Official 2026 floor-score announcement (Cong bo điểm sàn chính thức)',
    url: 'https://ttu.edu.vn/cong-bo-diem-san-chinh-thuc-cua-truong-dai-hoc-tan-tao-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTU 2026 floor-score notice (09/07/2026): THPT-exam floor score (điểm sàn) is tiered by major group - Y khoa (Medicine) 22/30 (highest); Luật (Law) 20/30; Điều dưỡng (Nursing) and Kỹ thuật Xét nghiệm Y học (Medical Laboratory Technology) 18/30; all other majors (engineering, technology, economics, language) 15/30. No academic-rank gating stated for this method.',
  },
];
