import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnulawSource {
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

export const vnulawSources: VnulawSource[] = [
  {
    id: 'vnulaw-admission-notice-2026',
    publisher: 'Truong Dai hoc Luat - Dai hoc Quoc gia Ha Noi (VNU-Luat)',
    title: 'Thong tin tuyen sinh Dai hoc chinh quy nam 2026 - VNU-UL',
    url: 'https://law.vnu.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official 2026 page (fetched directly, text-readable) lists 4 methods (100/301/401/500), 3 majors with quotas (Luat 520, Luat Thuong mai quoc te 150, Luat Kinh doanh 320, tong 990), 10 subject combinations (A01, A07, C01, C02, C03, C04, D01, D03, D14, D15, all coefficient 1.0), the common threshold (total >=60% max = 18/30, Toan or Ngu van >=6/10), and the regional/priority-point formula for scores >=22.5/30.',
  },
];
