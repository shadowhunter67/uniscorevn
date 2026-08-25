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
    publisher: 'Tan Tao University (Truong Dai hoc Tan Tao)',
    title: 'Official 2026 floor-score announcement (Cong bo diem san chinh thuc)',
    url: 'https://ttu.edu.vn/cong-bo-diem-san-chinh-thuc-cua-truong-dai-hoc-tan-tao-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTU 2026 floor-score notice (09/07/2026): THPT-exam floor score (diem san) is tiered by major group - Y khoa (Medicine) 22/30 (highest); Luat (Law) 20/30; Dieu duong (Nursing) and Ky thuat Xet nghiem Y hoc (Medical Laboratory Technology) 18/30; all other majors (engineering, technology, economics, language) 15/30. No academic-rank gating stated for this method.',
  },
];
