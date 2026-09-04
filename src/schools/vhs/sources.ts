import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VhsSource {
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

/**
 * Trường Đại học Văn hóa Thành phố Hồ Chí Minh (VHS, mã trường VHS, trực thuộc Bộ Văn hóa, Thể thao
 * và Du lịch). www.hcmuc.edu.vn nhúng thông báo tuyển sinh qua Google Drive — tải trực tiếp file
 * PDF gốc thay vì chỉ đọc preview/WebFetch summary (cùng kỹ thuật đã dùng cho HVU). Điểm trúng tuyển
 * đợt 1 năm 2026 lấy từ ảnh scan 2 trang của chính Thông báo 207/TB-ĐHVHHCM, có chữ ký + con dấu
 * Hiệu trưởng, được Cổng thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn) đăng lại nguyên
 * văn ở độ phân giải đầy đủ (không phải diễn giải/tóm tắt lại số liệu).
 */
export const vhsSources: VhsSource[] = [
  {
    id: 'vhs-admission-scheme-2026',
    publisher: 'Trường Đại học Văn hóa Thành phố Hồ Chí Minh — Hiệu trưởng Lâm Nhân',
    title: 'Thông báo 34/TB-ĐHVHHCM — Thông tin tuyển sinh trình độ đại học chính quy năm 2026',
    url: 'https://www.hcmuc.edu.vn/truong-dai-hoc-van-hoa-tp-ho-chi-minh-thong-bao-thong-tin-tuyen-sinh-trinh-do-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-09-04',
    publishedAt: '2026-02-04',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tin nhúng link Google Drive tới file PDF gốc (Thông báo số 34/TB-ĐHVHHCM ngày 04/02/2026, "Thông tin tuyển sinh trình độ đại học chính quy năm 2026", 16 trang, đóng dấu tròn Trường ở mỗi trang) — tải trực tiếp và đọc đầy đủ bằng vision. Mục 4 (trang 3-8) liệt kê Mã ngành / Tổ hợp xét tuyển cho 20 dòng mã phương thức xét tuyển (mã 100 = thi TN THPT, 200 = học bạ, 405/406 = kết hợp thi năng khiếu); mô hình hoá 14/16 dòng mã 100 dùng tổ hợp thi TN THPT thông thường (loại 7229042C — "Tổ chức, dàn dựng chương trình văn hóa nghệ thuật" — chỉ có dòng mã 405/406, không có mã 100). Mục 3 nêu công thức "tổng điểm các bài thi/môn thi theo thang điểm 10... cộng với điểm ưu tiên đối tượng, khu vực theo quy định". Mục 7.1 (trang 10-11) là bảng mức điểm ưu tiên TỰ CÔNG BỐ của trường (UT1=2,0/UT2=1,0/KV1=0,75/KV2-NT=0,5/KV2=0,25) và công thức giảm khi tổng điểm >= 22,5 — trích dẫn căn cứ Điều 7 Thông tư 08/2022/TT-BGDĐT nhưng tự liệt kê lại nguyên văn trong chính thông báo (không phải chỉ dẫn chiếu suông).',
  },
  {
    id: 'vhs-threshold-2026',
    publisher: 'Trường Đại học Văn hóa Thành phố Hồ Chí Minh — Hiệu trưởng Lâm Nhân (đăng lại bởi Cổng thông tin điện tử Chính phủ)',
    title: 'Thông báo 207/TB-ĐHVHHCM — Về việc công nhận điểm trúng tuyển trình độ đại học hệ chính quy Đợt 1 năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-van-hoa-tphcm-2026-119260810150715141.htm',
    accessedAt: '2026-09-04',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại NGUYÊN VĂN 2 trang ảnh scan độ phân giải đầy đủ của Thông báo 207/TB-ĐHVHHCM (10/8/2026, ký tên + đóng dấu tròn Hiệu trưởng Lâm Nhân) — không phải tóm tắt/diễn giải. Ảnh gốc lấy trực tiếp từ CDN của Chính phủ (xdcs.cdnchinhphu.vn, bỏ tiền tố thumb_w để lấy độ phân giải gốc 2000x2830), đọc bằng vision. Bảng liệt kê 30 dòng (Mã ngành xét tuyển / Tên ngành / Mã phương thức xét tuyển / Mức điểm) cho cả mã 100 (thi TN THPT) và mã 200 (học bạ) — mô hình hoá 14/16 dòng mã 100 (20,30–24,40/30), loại 7229042C (chỉ có mã 405/406). Cuối văn bản ghi rõ: "Điểm trúng tuyển trên đã cộng điểm đối tượng và khu vực ưu tiên theo quy định của Quy chế tuyển sinh hiện hành."',
  },
];
