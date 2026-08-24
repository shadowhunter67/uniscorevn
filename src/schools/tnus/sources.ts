import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnusSource {
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

export const tnusSources: TnusSource[] = [
  {
    id: 'tnus-cutoff-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Dai hoc Khoa hoc',
    title: 'Truong Dai hoc Khoa hoc - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/truong-dai-hoc-khoa-hoc-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc he thong Dai hoc Thai Nguyen (tnu.edu.vn) cong bo diem chuan trung tuyen 2026 cho truong thanh vien TNUS, dao dong 16,35-22,50/30. Bang day du theo tung nganh/chuong trinh va to hop mon cu the chua duoc trich xuat het trong lan nay.',
  },
];
