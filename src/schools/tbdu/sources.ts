import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TbduSource {
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

export const tbduSources: TbduSource[] = [
  {
    id: 'tbdu-admission-info-2026',
    publisher: 'Truong Dai hoc Thai Binh Duong (Pacific University)',
    title: 'Thong tin tuyen sinh dai hoc he chinh quy nam 2026',
    url: 'https://tbd.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc TBDU: 4 phuong thuc xet tuyen, nguong chung 15,0/30 tong 3 mon thi TN THPT, va dieu kien rieng cho Luat/Luat kinh te (3 lua chon: tong diem thi >=20; hoc luc tot + tong diem thi >=18; diem xet tot nghiep >=8,5).',
  },
];
