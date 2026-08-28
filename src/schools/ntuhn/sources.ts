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
