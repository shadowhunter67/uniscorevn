import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NtuhnSource {
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

export const ntuhnSources: NtuhnSource[] = [
  {
    id: 'ntuhn-admission-score-2026',
    publisher: 'Bao Dau tu (Vietnam Investment Review) — dua tren cong bo cua Truong Dai hoc Nguyen Trai',
    title: 'Dai hoc Nguyen Trai cong bo diem chuan 2026: Xet diem thi tu 15, hoc ba tu 18 diem',
    url: 'https://baodautu.vn/dai-hoc-nguyen-trai-cong-bo-diem-chuan-2026-xet-diem-thi-tu-15-hoc-ba-tu-18-diem-d668518.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Dai hoc Nguyen Trai (NTU-HN) cong bo diem trung tuyen dot 1 nam 2026 tren website chinh thuc daihocnguyentrai.edu.vn (truc tiep tai daihocnguyentrai.edu.vn/diem-chuan-he-dai-hoc-chinh-quy-truong-dai-hoc-nguyen-trai-2026, khong lay duoc noi dung so lieu qua WebFetch trong lan nay); so lieu duoc doi chieu qua bai bao chinh thuc cua Bao Dau tu (co quan bao chi nha nuoc), xac nhan nguong 15/30 (thi TN THPT) va 18/30 (hoc ba) ap dung dong nhat cho ca 11 nganh, khong co chenh lech giua cac nganh trong cung phuong thuc.',
  },
];
