import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TduSource {
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

export const tduSources: TduSource[] = [
  {
    id: 'tdu-admission-info-2026',
    publisher: 'Truong Dai hoc Tay Do (Tay Do University)',
    title: 'Truong Dai hoc Tay Do chinh thuc cong bo diem trung tuyen dai hoc nam 2026',
    url: 'https://baocantho.com.vn/truong-dai-hoc-tay-do-chinh-thuc-cong-bo-diem-trung-tuyen-dai-hoc-nam-2026-a212116.html',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bao Can Tho (bao dang dia phuong nha nuoc) dua tin truc tiep viec TDU "chinh thuc cong bo" diem trung tuyen 2026 qua 5 phuong thuc: thi TN THPT (15-20/30, cao nhat Duoc/Luat/Luat kinh te/Luat quoc te 20,0), hoc ba (16,5-21,8), DGNL DHQG TPHCM (500-600), V-SAT (225-270), hoc ba+phong van (16,5-21,8). Trang truong (tdu.edu.vn) xac nhan 5 phuong thuc va to hop mon qua anh nhung khong lo van ban trich xuat duoc.',
  },
];
