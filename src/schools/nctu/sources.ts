import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NctuSource {
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

export const nctuSources: NctuSource[] = [
  {
    id: 'nctu-threshold-notice-2026',
    publisher: 'Truong Dai hoc Nam Can Tho',
    title: 'Thong bao nguong dam bao chat luong dau vao (diem san) xet tuyen dai hoc chinh quy nam 2026',
    url: 'https://nctu.edu.vn/truong-dai-hoc-nam-can-tho-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official NCTU 2026 notice (fetched via WebSearch summary; direct WebFetch of nctu.edu.vn failed with an expired TLS certificate in this pass, cross-checked against the independent government-affiliated republication phobienphapluat.vn). Confirms a common floor of 15/30 for the THPT-exam method across the majority of NCTU\'s 48 programs, while Health-group majors (Y khoa, RHM, Duoc) and Law-group majors (Luat, Luat Kinh te) require both an academic-rank gate (hoc luc lop 12 xep loai Tot) and a higher score (>=20/30 or diem xet tot nghiep >=8.5 for Health; >=18/30 for Law). Also documents separate hoc ba (18-23/30) and V-SAT (225-290) floor tables not modeled here.',
  },
  {
    id: 'nctu-priority-guide-2026',
    publisher: 'Trường Đại học Nam Cần Thơ',
    title: 'Đối tượng ưu tiên, điểm ưu tiên theo quy chế tuyển sinh đại học năm 2026',
    url: 'https://tuyensinh.nctu.edu.vn/news/2026/doi-tuong-uu-tien-diem-uu-tien-theo-quy-che-tuyen-sinh-dai-hoc-nam-2026',
    accessedAt: '2026-08-26',
    publishedAt: '2026-03-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc trực tiếp qua chrome-devtools 2026-08-26 — bài đăng trên domain chính thức tuyensinh.nctu.edu.vn (không phải trang tổng hợp bên thứ ba), trích khoản 4 Điều 7 Thông tư 06/2026/TT-BGDĐT: bảng đầy đủ KV1=0,75/KV2-NT=0,50/KV2=0,25/KV3=0, UT1=2,00/UT2=1,00, công thức giảm điểm ưu tiên khi tổng ≥22,50/30, và xác nhận "Công thức trên áp dụng cho tổng điểm 3 môn... không nhân hệ số".',
  },
];
