import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface StuSource {
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

export const stuSources: StuSource[] = [
  {
    id: 'stu-cutoff-2026',
    publisher: 'Truong Dai hoc Cong nghe Sai Gon (STU)',
    title: 'STU cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026 - Dot 1',
    url: 'https://tuyensinhdaihoc.stu.edu.vn/2026/08/12/stu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026-dot-1/',
    accessedAt: '2026-09-26',
    publishedAt: '2026-08-12',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tuyen sinh chinh thuc cong bo bang diem chuan theo 20 nganh, can cu Quyet dinh 614/QD-DSG-DT ngay 09/08/2026. PT02 la xet diem thi tot nghiep THPT nam 2026; diem chuan ap dung chung cho cac to hop trong cung mot phuong thuc, danh cho thi sinh khu vuc 3 va nhom doi tuong khong uu tien.',
  },
  {
    id: 'stu-admission-methods-2026',
    publisher: 'Truong Dai hoc Cong nghe Sai Gon (STU)',
    title: 'Dai hoc Cong nghe Sai Gon (STU) tuyen sinh Dai hoc 2026',
    url: 'https://tuyensinhdaihoc.stu.edu.vn/',
    accessedAt: '2026-09-26',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Homepage tuyen sinh chinh thuc neu cong thuc PT02: DXT = diem mon 01 + diem mon 02 + diem mon 03, thang 30, chua cong diem uu tien/diem cong; dieu kien khac: nhom Ky thuat - Cong nghe phai co mon Toan, nhom Kinh te/quan tri/Luat/Thiet ke my thuat/Du lich phai co mon Toan hoac Van, diem Toan/Van trong to hop >= 1/3 diem chuan chua uu tien.',
  },
];
