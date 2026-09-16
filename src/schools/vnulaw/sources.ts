import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnulawSource {
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

export const vnulawSources: VnulawSource[] = [
  {
    id: 'vnulaw-admission-notice-2026',
    publisher: 'Truong Dai hoc Luat - Dai hoc Quoc gia Ha Noi (VNU-Luat)',
    title: 'Thong tin tuyen sinh Dai hoc chinh quy nam 2026 - VNU-UL',
    url: 'https://law.vnu.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official 2026 page (fetched directly, text-readable) lists 4 methods (100/301/401/500), 3 majors with quotas (Luat 520, Luat Thuong mai quoc te 150, Luat Kinh doanh 320, tong 990), 10 subject combinations (A01, A07, C01, C02, C03, C04, D01, D03, D14, D15, all coefficient 1.0), the common threshold (total >=60% max = 18/30, Toan or Ngu van >=6/10), and the regional/priority-point formula for scores >=22.5/30. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức theo NGÀNH `vnulaw-cutoff-2026` — giữ lại làm nguồn công thức điểm ưu tiên + điều kiện phụ Toán/Văn.',
  },
  {
    id: 'vnulaw-cutoff-2026',
    publisher: 'Cổng Thông tin điện tử Chính phủ (đăng lại thông báo điểm chuẩn chính thức của Đại học Quốc gia Hà Nội)',
    title: 'Điểm chuẩn Đại học Quốc gia Hà Nội 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-dai-hoc-quoc-gia-ha-noi-2026-119260809163517452.htm',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng Thông tin điện tử Chính phủ đăng lại nguyên văn bảng điểm chuẩn chính thức, mục Trường Đại học Luật (VNU-Luật): 7380101 Luật 24,52; 7380107 Luật Kinh tế 24,83; 7380109 Luật Thương mại quốc tế 24,50 (thang 30, phương thức thi TN THPT). Ghi rõ "Điểm trúng tuyển đã bao gồm điểm ưu tiên theo đối tượng và khu vực". Đối chiếu khớp với nguồn báo chí độc lập (VietnamNet, cùng ngày 09/8/2026).',
  },
];
