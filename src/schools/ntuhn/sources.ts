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
    id: 'ntuhn-threshold-notice-2026',
    publisher: 'Trường Đại học Nguyễn Trãi - Hội đồng tuyển sinh',
    title: 'Thông báo điểm sàn xét tuyển theo kết quả học tập bậc THPT & kết quả kỳ thi tốt nghiệp THPT Quốc gia năm 2026',
    url: 'https://daihocnguyentrai.edu.vn/thong-bao-diem-san-xet-tuyen-theo-ket-qua-hoc-tap-bac-thpt-va-ket-qua-ky-thi-tot-nghiep-thpt-quoc-gia-nam-2026/',
    accessedAt: '2026-08-28',
    publishedAt: '2026-06-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng nhúng PDF chính thức qua Google Drive (drive.google.com/file/d/1GjTBb4DJqR582Sd3N0oEpNtvBOfPrmVe), reach qua chrome-devtools (trang có gtranslate, nội dung bài viết là ảnh không lộ qua fetch tĩnh) — tải trực tiếp 2026-08-28 (PDF scan 2 trang, đọc bằng OCR). Bảng đủ 11 ngành: điểm sàn phương thức điểm thi = 15/30, phương thức học bạ = 18/30, ĐỒNG NHẤT mọi ngành (không phân biệt). Không in công thức Điểm xét tuyển tường minh.',
  },
  {
    id: 'ntuhn-admission-score-2026',
    publisher: 'Bao Dau tu (Vietnam Investment Review) — dua tren công bố của Trường Đại học Nguyễn Trãi',
    title: 'Đại học Nguyễn Trãi công bố điểm chuẩn 2026: Xet điểm thi tu 15, học bạ tu 18 điểm',
    url: 'https://baodautu.vn/dai-hoc-nguyen-trai-cong-bo-diem-chuan-2026-xet-diem-thi-tu-15-hoc-ba-tu-18-diem-d668518.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đại học Nguyễn Trãi (NTU-HN) công bố điểm trúng tuyển dot 1 năm 2026 tren website chính thức daihocnguyentrai.edu.vn (truc tiep tai daihocnguyentrai.edu.vn/điểm-chuẩn-he-dai-hoc-chinh-quy-trường-dai-hoc-nguyen-trai-2026, không lay được noi dung so lieu qua WebFetch trong lan nay); so lieu được đối chiếu qua bai bao chính thức của Bao Dau tu (co quan báo chí nhà nước), xác nhận ngưỡng 15/30 (thi TN THPT) va 18/30 (học bạ) áp dụng đồng nhất cho ca 11 ngành, không có chênh lệch giữa các ngành trong cung phương thức.',
  },
];
