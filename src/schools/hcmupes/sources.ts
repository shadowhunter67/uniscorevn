import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HcmupesSource {
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

export const hcmupesSources: HcmupesSource[] = [
  {
    id: 'hcmupes-gdtc-threshold-2026',
    publisher: 'Trường Đại học Sư phạm Thể dục Thể thao Thành phố Hồ Chí Minh',
    title: 'Thông báo 05/TB-HĐTS: Ngưỡng đảm bảo chất lượng đầu vào xét tuyển đại học chính quy ngành Giáo dục thể chất năm 2026',
    url: 'https://tuyensinh.upes.edu.vn/2026/07/13/nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-13',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang thông báo chỉ có mô tả, PDF thật đính kèm qua link Google Drive (drive.google.com/file/d/1oWlreD-C-dzguzani0pdQQL4Rplymc95) — tải trực tiếp (curl) và đọc qua vision (bản scan, 2 trang, xác nhận lại 2026-08-28). Mục 1 (Phương thức 405, thi TN THPT): điểm tổ hợp (2 môn văn hóa + Năng khiếu TDTT, KHÔNG nhân hệ số 2 môn Năng khiếu) phải đạt: khu vực 3 ≥19,00; khu vực 2 ≥18,75; khu vực 2NT ≥18,50; khu vực 1 ≥18,25 (thang 30) — bảng ngưỡng ĐẦY ĐỦ theo khu vực, không cần judgment call cho mức chênh lệch khu vực (số liệu chính thức). Mục 2 KHÔNG đề cập điểm cộng theo đối tượng ưu tiên (UT1/UT2) — chỉ có chênh lệch theo khu vực. Mục 3: miễn ngưỡng cho vận động viên cấp 1/kiện tướng/huy chương quốc gia-quốc tế, hoặc năng khiếu TDTT ≥9,00 — KHÔNG mô hình hoá diện miễn này. Chỉ áp dụng ngành Giáo dục thể chất (7140206); Huấn luyện thể thao/Quản lý TDTT dùng thông báo khác (chưa tìm được). Tổ hợp T00/T01/T04/T06 (Toán + 1 môn + Năng khiếu TDTT) xác nhận qua tuyensinh247/hocmai, khớp cấu trúc tổ hợp T-series đã xác minh trực tiếp tại USH (trường cùng khối ngành).',
  },
];
