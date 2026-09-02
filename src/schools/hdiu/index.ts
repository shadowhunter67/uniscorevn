import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hdiuAdmissionMethods } from './methods';

export const hdiuModule: SchoolModule = {
  id: 'hdiu',
  name: 'Trường Đại học Đông Đô',
  shortName: 'HDIU',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo đa ngành (Ngôn ngữ, Kinh tế, Công nghệ thông tin, Dược học, Điều dưỡng).',
  year: 2025,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HDIU 2025 (Phương thức 100 — xét kết quả thi TN THPT): Quyết định 129/QĐ-ĐHĐD ngày 26/3/2025 (`sources.ts:hdiu-admission-info-2025`, PDF gốc có chữ ký/con dấu, đọc bằng vision) xác nhận Điểm xét = tổng thô 3 môn (thang 10/môn, làm tròn 0,25) + điểm ưu tiên KV/ĐT, và Ngưỡng đảm bảo chất lượng đầu vào GỒM CẢ điểm ưu tiên (không phải tổng thô). Mức điểm sàn cụ thể theo ngành (`sources.ts:hdiu-threshold-2025`, VietNamNet đăng lại thông báo chính thức): Dược học >= 19,00/30; Điều dưỡng/Kỹ thuật xét nghiệm y học >= 17,00/30; Luật kinh tế >= 18,00/30; 12 ngành còn lại (Quản trị kinh doanh, Thương mại điện tử, Tài chính-Ngân hàng, Kế toán, Công nghệ thông tin, Công nghệ kỹ thuật ô tô, Thú y, Ngôn ngữ Trung Quốc/Nhật/Hàn Quốc, Quản lý nhà nước) >= 14,00/30. Điểm ưu tiên dùng judgment call chuẩn quốc gia (trường không tự công bố mức cụ thể, nguồn chỉ xác nhận CÓ cộng). Mô hình hoá 15/19 mã ngành đại học chính quy (loại trừ 3 tổ hợp riêng dùng Tiếng Trung/Nhật/Hàn không có trong danh mục môn dùng chung). Các phương thức khác (học bạ THPT, ĐGNL/ĐGTD, liên thông/VLVH) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hdiuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định số 129/QĐ-ĐHĐD ngày 26/3/2025 về việc ban hành Thông tin tuyển sinh năm 2025',
      url: 'https://images.tuyensinh247.com/picture/2025/0618/dh-dong-do-2025.pdf',
      type: 'official-document',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Trường Đại học Đông Đô công bố điểm sàn xét tuyển đại học chính quy năm 2025',
      url: 'https://vietnamnet.vn/truong-dai-hoc-dong-do-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2025-2428741.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
