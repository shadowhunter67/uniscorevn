import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnuflSource {
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

export const tnuflSources: TnuflSource[] = [
  {
    id: 'tnufl-cutoff-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Ngoai ngu',
    title: 'Truong Ngoai ngu - Dai hoc Thai Nguyen cong bo diem chuan trung tuyen dai hoc nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/truong-ngoai-ngu-dai-hoc-thai-nguyen-cong-bo-diem-chuan-trung-tuyen-dai-hoc-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc he thong Dai hoc Thai Nguyen (tnu.edu.vn) cong bo diem chuan trung tuyen 2026 cho truong thanh vien TNUFL, dao dong 16,00-26,60/30 theo 5 nganh. Cong thuc tinh chi tiet (uu tien/cong diem) va to hop mon cu the chua duoc trang nay neu ro.',
  },
];
