import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HbuSource {
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
 * Trường Đại học Hòa Bình (HBU, mã trường ETU, Hà Nội) — domain gốc `daihochoabinh.edu.vn` (bao gồm
 * trang thông báo điểm trúng tuyển 2025) bị "connection refused"/timeout từ môi trường research (cả
 * WebFetch lẫn chrome-devtools điều hướng thẳng), nhưng subdomain `tuyensinh.daihochoabinh.edu.vn`
 * (cùng trường, khác server) TRUY CẬP ĐƯỢC bình thường — dùng subdomain này cho công thức + tổ hợp
 * môn CHÍNH CHỦ, và 3 nguồn báo/tổng hợp ĐỘC LẬP đăng lại thông báo điểm trúng tuyển gốc cho bảng
 * điểm chuẩn (cùng kỹ thuật cross-check đã chấp nhận cho HAT/HLUV/HUMP/HUC khi domain chính không
 * fetch được).
 */
export const hbuSources: HbuSource[] = [
  {
    id: 'hbu-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Hòa Bình)',
    title: 'Điểm chuẩn Trường Đại Học Hòa Bình 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-hoa-binh-ETU.html',
    accessedAt: '2026-09-04',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn 2025 (thang 30, mã trường ETU) cho cả 21/21 ngành đại học chính quy, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP các mức dưới đây đã cộng điểm ưu tiên). Mức điểm: Y khoa 20,50; Y học Cổ truyền 19,00; Dược học 19,00; Điều dưỡng 17,00; 17 ngành còn lại (Công nghệ thông tin, Kỹ thuật ô tô, Quản trị kinh doanh, Thương mại điện tử, Logistics & Quản lý chuỗi cung ứng, Kế toán, Tài chính Ngân hàng, Luật kinh tế, Quản trị dịch vụ Du lịch và Lữ hành, Quản trị khách sạn, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Quan hệ công chúng, Truyền thông đa phương tiện, Thiết kế đồ họa, Thiết kế nội thất, Thiết kế thời trang) FLAT 15,00. Trang ghi nhận điểm chuẩn xét học bạ THPT 2025 "cũng tương đương" (không tách riêng, không mô hình hoá nhánh học bạ).',
  },
  {
    id: 'hbu-threshold-secondary-2025',
    publisher: 'Navigates.vn (tổng hợp thông báo chính thức Trường Đại học Hòa Bình)',
    title: 'Điểm chuẩn Đại học Hòa Bình (HBU) năm 2025',
    url: 'https://navigates.vn/truong-hoc/dai-hoc-hoa-binh/diem-chuan/',
    accessedAt: '2026-09-04',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hbu-threshold-2025` — bảng đầy đủ theo MÃ NGÀNH, khớp TUYỆT ĐỐI 21/21 ngành và mức điểm (Y khoa 7720101 20,5; Y học cổ truyền 7720115 19,0; Dược học 7720201 19,0; Điều dưỡng 7720301 17,0; 17 ngành còn lại flat 15,0), mã ngành khớp 1:1 với bảng tổ hợp CHÍNH CHỦ (`hbu-combination-2025`). Đồng thời báo Giáo dục Việt Nam (giaoduc.net.vn, "Trường Đại học Hòa Bình công bố điểm trúng tuyển năm 2025 với 21 ngành đào tạo") và Sforum/CellphoneS xác nhận cùng 4 mức điểm khối sức khỏe (20,5/19,0/19,0/17,0) và "các ngành còn lại đều có mức điểm chuẩn là 15 điểm" — 3 nguồn độc lập khớp tuyệt đối, không nguồn nào mâu thuẫn.',
  },
  {
    id: 'hbu-combination-2025',
    publisher: 'Trường Đại học Hòa Bình (Ban tuyển sinh, ảnh CHÍNH CHỦ)',
    title: 'Trường Đại học Hòa Bình công bố thông tin tuyển sinh đại học hệ chính quy năm 2025 (Dự kiến)',
    url: 'https://tuyensinh.daihochoabinh.edu.vn/truong-dai-hoc-hoa-binh-cong-bo-thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2025-du-kien/',
    accessedAt: '2026-09-04',
    publishedAt: '2025-02-01',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Domain gốc daihochoabinh.edu.vn (bao gồm trang thông báo điểm trúng tuyển 2025 gốc) bị connection refused/timeout từ môi trường research; subdomain tuyensinh.daihochoabinh.edu.vn (cùng trường) truy cập được — bài đăng 02/2025 nhúng ảnh CHÍNH CHỦ "THÔNG TIN TUYỂN SINH CÁC NGÀNH (DỰ KIẾN)" (`wp-content/uploads/2025/02/ThongTinTuyenSinh2025Web-01-scaled.jpg`, đọc bằng vision qua chrome-devtools) liệt kê Mã ngành / Tổ hợp xét tuyển / Chỉ tiêu (dự kiến) cho cả 21/21 ngành, kèm chú giải đầy đủ ký hiệu tổ hợp. Mã ngành khớp 1:1 với `hbu-threshold-secondary-2025`. Chú giải tổ hợp KHÔNG định nghĩa V02/V03 (chỉ định nghĩa V00/V01) dù bảng dùng "V00, V01, V02, V03" cho 3 ngành Thiết kế — lỗ hổng trong chính tài liệu gốc; các ngành Thiết kế dùng tổ hợp năng khiếu "Vẽ" vốn cũng không có SubjectId tương ứng nên KHÔNG mô hình hoá (không liên quan tới lỗ hổng V02/V03). Ngành Ngôn ngữ Trung Quốc (7220204) dùng tổ hợp D65 (Văn, Sử, Tiếng Trung) — Tiếng Trung không có SubjectId, tổ hợp D65 không mô hình hoá (3/4 tổ hợp còn lại của ngành này vẫn tính được: C00/C19/D14).',
  },
  {
    id: 'hbu-formula-2025',
    publisher: 'Trường Đại học Hòa Bình (Ban tuyển sinh)',
    title: 'Tiêu chí, nguyên tắc xét tuyển — Trường Đại học Hòa Bình',
    url: 'https://tuyensinh.daihochoabinh.edu.vn/tieu-chi-nguyen-tac-2/',
    accessedAt: '2026-09-04',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang chính sách chung (không đề năm cụ thể, tự mô tả là quy tắc "hiện hành") trích nguyên văn công thức Phương thức 1 (xét kết quả thi TN THPT): "ĐXT = TĐ1 + ĐUT" trong đó "TĐ1 là tổng điểm các bài thi/môn thi của tổ hợp dùng để xét tuyển" và "ĐUT là điểm ưu tiên khu vực và đối tượng được quy định trong Quy chế tuyển sinh hiện hành của Bộ Giáo dục và Đào tạo và của Trường Đại học Hòa Bình" — trường KHÔNG tự công bố bảng mức điểm ưu tiên cụ thể theo khu vực/đối tượng trong trang này. Khớp về mặt cấu trúc với cách trình bày thang 30 không hệ số của bảng điểm chuẩn (`hbu-threshold-2025`).',
  },
];
