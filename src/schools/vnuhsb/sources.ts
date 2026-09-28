import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuhsbSource {
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

export const vnuhsbSources: VnuhsbSource[] = [
  {
    id: 'vnuhsb-cutoff-vnu-2026',
    publisher: 'Đại học Quốc gia Hà Nội',
    title: 'Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026',
    url: 'https://vnu.edu.vn/diem-chuan-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-post40358.html',
    accessedAt: '2026-09-28',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục 11 "Trường Quản trị và Kinh doanh" (mã trường QHD), bảng 6 chương trình: Quản trị doanh nghiệp và công nghệ (7340401) 19,5; Marketing và truyền thông (7340101) 20,75; Quản trị nhân lực và nhân tài (7340101) 19; Quản trị và An ninh (7340401) 19; Khoa học quản lý (chương trình Quản trị An ninh phi truyền thống) (7340401) 19; Quản trị kinh doanh (chương trình Quản trị dịch vụ khách hàng và Chăm sóc sức khỏe) (7340101) 19. Ghi chú nguyên văn: "Điểm trúng tuyển đã bao gồm điểm ưu tiên theo đối tượng và khu vực." Bảng chỉ in tổ hợp ở dòng đầu (ô gộp) — xem `vnuhsb-notice-2026` để xác nhận áp dụng chung cho cả 6 chương trình.',
  },
  {
    id: 'vnuhsb-notice-2026',
    publisher: 'Trường Quản trị và Kinh doanh - Đại học Quốc gia Hà Nội (HSB)',
    title: 'Thông tin tuyển sinh Đại học năm 2026',
    url: 'https://www.hsb.edu.vn/admissions/undergrad-admissions-2026',
    accessedAt: '2026-09-28',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục "Tổ hợp xét tuyển theo ngành đào tạo": cả 6 chương trình (mã xét tuyển MET/MAC/HAT/MAS/BNS/HAS) đều ghi "Sử dụng tất cả các tổ hợp (A01, D01, D07, D08, D09, D10, X25, X26, X27, X28)", cột "Chênh lệch điểm xét tuyển" = "Không quy định" (không combo nào bị trừ điểm riêng). Mục Phương thức 100 công bố nguyên văn công thức điểm xét = tổng 3 môn (đã cộng ưu tiên), thang 30. Chương trình thứ 7 (BBNS — Kinh doanh, chuyên ngành kép Marketing và Phân tích kinh doanh) có thông báo riêng (link riêng), KHÔNG có trong bảng điểm chuẩn ĐHQGHN đã thu thập — không mô hình hoá. Tổ hợp X27 (Toán, Công nghệ công nghiệp, Tiếng Anh) và X28 (Toán, Công nghệ nông nghiệp, Tiếng Anh) không có SubjectId tương ứng trong hệ thống — loại khỏi combinationIds.',
  },
];
