import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface ThanhdoSource {
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

export const thanhdoSources: ThanhdoSource[] = [
  {
    id: 'thanhdo-cutoff-2026',
    publisher: 'Truong Dai hoc Thanh Do (Thanh Do University)',
    title: 'Truong Dai hoc Thanh Do chinh thuc cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
    url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-chinh-thuc-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc thanhdo.edu.vn cong bo diem chuan 2026 theo 4 phuong thuc: thi TN THPT (16,0-20,0/30 tuy nganh, 14 nganh), hoc ba (18,0/30 cho 13 nganh, 20,0 Duoc hoc), danh gia nang luc/tu duy (HSA >=75/150, TSA >=50/100), va chuong trinh lien ket quoc te.',
  },
  {
    id: 'thanhdo-admission-info-2026',
    publisher: 'Truong Dai hoc Thanh Do (Thanh Do University)',
    title: 'Truong Dai hoc Thanh Do cong bo thong tin tuyen sinh dai hoc chinh quy 2026',
    url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc liet ke to hop mon xet tuyen theo nhom nganh (Cong nghe, Kinh te-Luat, Suc khoe, Ngon ngu-Xa hoi) nhung khong neu lai muc diem chuan cu the (xem thanhdo-cutoff-2026 cho muc diem).',
  },
];
