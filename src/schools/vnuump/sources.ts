import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuumpSource {
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

export const vnuumpSources: VnuumpSource[] = [
  {
    id: 'vnuump-admission-notice-2026',
    publisher: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi (VNU-UMP)',
    title: 'Thong tin tuyen sinh dai hoc chinh quy nam 2026 (Hinh thuc dao tao: Chinh quy)',
    url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official 2026 page (fetched directly, text-readable) lists 4 pathways (2% straight admission, 96% THPT exam, HSA-included, 2% ethnic-minority prep), 6 majors with combos (Y khoa/Rang Ham Mat/Ky thuat xet nghiem/Ky thuat hinh anh/Dieu duong: B00+D08; Duoc hoc: A00+D07), quotas (Y khoa 300, Duoc 180, Rang Ham Mat 60, Ky thuat xet nghiem 60, Ky thuat hinh anh 60, Dieu duong 60, tong 780), and the general score formula: "diem xet tuyen duoc xac dinh bang tong diem cac mon thi trong to hop xet tuyen theo ket qua ky thi tot nghiep THPT cong diem cong va diem uu tien doi tuong/khu vuc (neu co)", xac nhan ap dung "Dieu 7 cua Quy che tuyen sinh dai hoc cua Bo GD&DT" cho phan uu tien. Con bang nguong 15,00/30 chung o note cu (2026-08-25) da duoc THAY THE boi bang nguong theo tung nganh chinh xac hon trong `vnuump-thongbao-2468-2026` (2026-08-28) - xem `thresholds.ts`.',
  },
  {
    id: 'vnuump-thongbao-2468-2026',
    publisher: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi (VNU-UMP)',
    title: 'Thong bao 2468/TB-DHYD (08/07/2026): Ve nguong dam bao chat luong dau vao va quy doi tuong duong diem trung tuyen giua cac phuong thuc xet tuyen dai hoc chinh quy nam 2026',
    url: 'https://ump.vnu.edu.vn/article-thong-bao-ve-nguong-bao-dam-chat-luong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-19782-3490.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang thong bao chi dan chieu file dinh kem Google Drive (link cong khai, tai truc tiep va doc qua vision - 3 trang, ban scan ro net, khong phai secondary). Muc 1: bang nguong theo nganh (Y khoa 22,0; Rang-Ham-Mat 22,0; Duoc hoc 20,0; Ky thuat xet nghiem y hoc 19,0; Ky thuat hinh anh y hoc 19,0; Dieu duong 19,0), noi ro "doi voi thi sinh khu vuc 3 co muc diem toi thieu (khong nhan he so)... khong tinh diem cong". Muc 2: khong co chenh lech diem giua cac to hop. Muc 3: bang quy doi HSA-THPT (khong dung cho nhanh THPT thuan tuy).',
  },
];
