import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DluSource {
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

export const dluSources: DluSource[] = [
  {
    id: 'dlu-threshold-notice-2026',
    publisher: 'Trường Đại học Đà Lạt - Hội đồng tuyển sinh',
    title: 'Thông báo 1145/TB-ĐHĐL: Mức điểm sàn đăng ký xét tuyển đại học hệ chính quy năm 2026',
    url: 'https://dlu.edu.vn/thong-bao-muc-diem-san-dang-ky-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026-truong-dai-hoc-da-lat/',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang dlu.edu.vn KHÔNG fetch được bằng curl (lỗi bắt tay TLS/WAF) nhưng mở được bình thường qua chrome-devtools (trình duyệt thật) — bài viết nhúng PDF đính kèm (dlu.edu.vn/wp-content/uploads/2026/07/Diem-san-2026-...pdf, 4 trang scan, tải bằng curl OK, đọc bằng OCR 2026-08-28). Bảng đầy đủ 41 mã ngành phương thức thi TN THPT (thang 30). Ghi chú xác nhận ngưỡng ĐÃ GỒM điểm ưu tiên KV/ĐT (Điều 7 quy chế Bộ), không phân biệt tổ hợp môn. Điều kiện phụ: Ngôn ngữ Anh/Sư phạm Tiếng Anh (Tiếng Anh ≥6,0), Kỹ thuật hạt nhân (Toán và Vật lý mỗi môn ≥6,5).',
  },
];
