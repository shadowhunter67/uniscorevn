import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HanuSource {
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

export const hanuSources: HanuSource[] = [
  {
    id: 'hanu-scheme-2026',
    publisher: 'Trường Đại học Hà Nội (HANU)',
    title: 'Thông tin tuyển sinh đại học hình thức chính quy năm 2026 (Quyết định 03.4.2026/NHF)',
    url: 'https://hanu.vn/a/254611/Thong-tin-tuyen-sinh-dai-hoc-hinh-thuc-chinh-quy-nam-2026?c=6909',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ hanu.vn, HTML text (không phải ảnh). Mục 3: công thức nhân hệ số (Ngoại ngữ luôn hệ số 2; tuỳ ngành, Toán HOẶC Ngữ văn hệ số 2), tổng tối đa 50 điểm quy đổi về thang 40. Mục 4: bảng đầy đủ 30 mã ngành/CTĐT kèm tổ hợp và cột "Môn nhân hệ số 2". Mục 6.2.2: "Tổng điểm để xét tuyển bao gồm cả điểm ưu tiên và điểm cộng khuyến khích".',
  },
  {
    id: 'hanu-cutoff-2026',
    publisher: 'Trường Đại học Hà Nội (HANU)',
    title: 'Điểm trúng tuyển đại học hình thức chính quy năm 2026 (Quyết định 3222/QĐ-ĐHHN, 10/8/2026)',
    url: 'https://hanu.vn/a/292793/Diem-trung-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026?c=6910',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ, ảnh văn bản ký/đóng dấu Hiệu trưởng (đọc bằng chrome-devtools screenshot + vision). Bảng 29 mã ngành, cột "Điểm trúng tuyển" thang 40. Ghi chú cuối bảng xác nhận đã gồm điểm cộng + điểm ưu tiên KV/ĐT.',
  },
];
