import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HatSource {
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
 * Nguồn gốc chính thức của trường (huht.hueuni.edu.vn) trả về "connection refused" nhiều lần trong
 * research (cùng hiện tượng đã ghi nhận ở batch trước, xem placeholder cũ trong
 * `remainingCatalog.generated.ts:hat`) — dùng 3 nguồn báo/tổng hợp đăng lại ĐỘC LẬP, khớp TUYỆT ĐỐI
 * 7/7 ngành, cùng kỹ thuật cross-check đã chấp nhận cho HUMP/HUC/VNU-UET/HUS/USSH.
 */
export const hatSources: HatSource[] = [
  {
    id: 'hat-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Du lịch - Đại học Huế)',
    title: 'Điểm chuẩn Trường Du Lịch - Đại Học Huế 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/truong-du-lich-dai-hoc-hue-DHD.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT (thang 30), trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên). 7/7 ngành, mỗi ngành 1 mức áp dụng chung cho mọi tổ hợp (8 tổ hợp/ngành: A00/C00/C14/C19/D01/D10/X01/X70, riêng Du lịch điện tử dùng A00/A01/C14/D01/D10/X01/X02): Quản trị du lịch và khách sạn 21,50; Quản trị dịch vụ du lịch và lữ hành 19,75; Quản trị kinh doanh 19,50; Du lịch 19,50; Quản trị khách sạn 18,50; Quản trị nhà hàng và dịch vụ ăn uống 16,75; Du lịch điện tử 15,00. Trang cũng có bảng điểm chuẩn phương thức xét học bạ (không mô hình hoá).',
  },
  {
    id: 'hat-threshold-secondary-2025',
    publisher: 'Báo Hà Tĩnh (đăng lại/tổng hợp thông báo chính thức Trường Du lịch - Đại học Huế)',
    title: 'Điểm chuẩn Trường Du Lịch - Đại Học Huế 2025 – Theo ngành và tổ hợp xét tuyển',
    url: 'https://baohatinh.vn/cong-cu/diem-chuan/dhd-truong-du-lich-dai-hoc-hue',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hat-threshold-2025` (tuyensinh247) — bảng đầy đủ theo mã ngành x TỪNG tổ hợp riêng lẻ, khớp TUYỆT ĐỐI 7/7 ngành, mọi tổ hợp, không có dòng nào mâu thuẫn. Cột mã ngành: Quản trị kinh doanh 7340101; Du lịch 7810101; Du lịch điện tử 7810102; Quản trị dịch vụ du lịch và lữ hành 7810103; Quản trị du lịch và khách sạn 7810104; Quản trị khách sạn 7810201; Quản trị nhà hàng và dịch vụ ăn uống 7810202.',
  },
  {
    id: 'hat-threshold-tertiary-2025',
    publisher: 'Sforum / CellphoneS (tổng hợp thông báo chính thức Trường Du lịch - Đại học Huế)',
    title: 'Điểm chuẩn Trường Du lịch - Đại học Huế 2025',
    url: 'https://cellphones.com.vn/sforum/diem-chuan-truong-du-lich-dai-hoc-hue-2025',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check ĐỘC LẬP thứ 3 (nguồn thứ 2 không cùng gốc kỹ thuật với tuyensinh247/Báo Hà Tĩnh) — khớp TUYỆT ĐỐI cả 7/7 mức điểm theo ngành với 2 nguồn trên (21,50 / 19,75 / 19,50 / 19,50 / 18,50 / 16,75 / 15,00), không tách theo tổ hợp.',
  },
];
