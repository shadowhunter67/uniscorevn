import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vhsAdmissionMethods } from './methods';

export const vhsModule: SchoolModule = {
  id: 'vhs',
  name: 'Trường Đại học Văn hóa Thành phố Hồ Chí Minh',
  shortName: 'VHS',
  about:
    'Trường đại học công lập trực thuộc Bộ Văn hóa, Thể thao và Du lịch (mã trường VHS, 2 cơ sở tại Quốc Hương và Đỗ Xuân Hợp, TP. Hồ Chí Minh), đào tạo 16 ngành/chuyên ngành đại học chính quy 2026: Văn hóa các dân tộc thiểu số Việt Nam (2 chuyên ngành), Văn hóa học (3 chuyên ngành), Quản lý văn hóa (3 chuyên ngành), Di sản học (2 chuyên ngành), Thông tin - Thư viện, Kinh doanh xuất bản phẩm, Du lịch, Quản trị dịch vụ du lịch và lữ hành (2 chuyên ngành).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'VHS 2026 (nhánh mã phương thức 100 — xét kết quả thi TN THPT): điểm trúng tuyển đợt 1 theo NGÀNH/CHUYÊN NGÀNH cho 14/16 dòng mã 100. Công thức + bảng ưu tiên TỰ CÔNG BỐ + tổ hợp môn CHÍNH CHỦ từ Thông báo 34/TB-ĐHVHHCM (04/02/2026, PDF gốc 16 trang có đóng dấu, nhúng qua Google Drive trên hcmuc.edu.vn — tải trực tiếp thay vì chỉ đọc preview) (`sources.ts:vhs-admission-scheme-2026`). Điểm trúng tuyển đợt 1 năm 2026 (Thông báo 207/TB-ĐHVHHCM, 10/8/2026, ký tên + đóng dấu Hiệu trưởng Lâm Nhân, đăng lại nguyên văn độ phân giải đầy đủ trên Cổng TTĐT Chính phủ) cho 20,30–24,40/30 (`vhs-threshold-2026`) — văn bản tự xác nhận "đã cộng điểm đối tượng và khu vực ưu tiên". Loại trừ 1/16 ngành (7229042C, chỉ có mã phương thức 405/406 kết hợp thi năng khiếu, không có điểm năng khiếu trong ApplicantProfile), tổ hợp D04 (Tiếng Trung, không có SubjectId) ở các ngành có tổ hợp này, và điều kiện "môn chính x2 >= 2 môn còn lại" gắn theo từng mã tổ hợp (Điều 9 Thông tư 08/2022, không ảnh hưởng công thức tính điểm nhưng chưa được kiểm tra khi chọn tổ hợp) — xem knowledgeGaps.ts.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vhsAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 34/TB-ĐHVHHCM — Thông tin tuyển sinh trình độ đại học chính quy năm 2026',
      url: 'https://www.hcmuc.edu.vn/truong-dai-hoc-van-hoa-tp-ho-chi-minh-thong-bao-thong-tin-tuyen-sinh-trinh-do-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Văn hóa TPHCM 2026 (Thông báo 207/TB-ĐHVHHCM đăng lại)',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-van-hoa-tphcm-2026-119260810150715141.htm',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
  ],
};
