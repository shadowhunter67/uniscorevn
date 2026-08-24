import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TnueSource {
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

export const tnueSources: TnueSource[] = [
  {
    id: 'tnue-threshold-2026',
    publisher: 'Dai hoc Thai Nguyen (Thai Nguyen University) - Truong Dai hoc Su pham',
    title: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen cong bo nguong dam bao chat luong dau vao nam 2026',
    url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dh-cd/truong-dai-hoc-su-pham-dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc he thong Dai hoc Thai Nguyen (tnu.edu.vn) cong bo nguong dam bao chat luong dau vao 2026 cho truong thanh vien TNUE, theo diem thi TN THPT, phan hoa 17,00-22,50/30 theo nhom nganh. To hop mon cu the tung nganh va cong thuc tinh chi tiet (uu tien/cong diem) chua duoc trang nay neu ro.',
  },
];
