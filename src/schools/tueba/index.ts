import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tuebaAdmissionMethods } from './methods';

export const tuebaModule: SchoolModule = {
  id: 'tueba',
  name: 'Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên',
  shortName: 'TUEBA',
  about: 'Trường đại học công lập thành viên Đại học Thái Nguyên, đào tạo khối ngành kinh tế, quản trị kinh doanh, tài chính - ngân hàng, luật kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TUEBA 2026 (phương thức xét kết quả thi TN THPT): ngưỡng đảm bảo chất lượng đầu vào theo NGÀNH — 3 mức 17,0/17,5/20,0 trên thang 30, nguồn CHÍNH CHỦ tuyensinh.tueba.edu.vn cho cả công thức ("tổng điểm bài thi/môn thi theo tổ hợp đã bao gồm điểm ưu tiên", `sources.ts:tueba-threshold-2026`) và ngưỡng — CÙNG NĂM 2026. Điểm ưu tiên KV/ĐT trường không công bố mức cụ thể — dùng khung quốc gia hiện hành (judgment call giá trị, `priority.ts`). Đây là điểm SÀN/điều kiện nộp hồ sơ, không phải điểm chuẩn trúng tuyển cuối cùng (chưa thu thập được). Tổ hợp xét tuyển theo từng ngành chưa được xác minh đầy đủ (`knowledgeGaps.ts`).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tuebaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo Ngưỡng đảm bảo chất lượng đầu vào và Quy đổi điểm trúng tuyển giữa các Phương thức xét tuyển Đại học Chính quy năm 2026',
      url: 'https://tuyensinh.tueba.edu.vn/bai-viet/Thong-Bao-Nguong-Dam-Bao-Chat-Luong-Dau-Vao-Va-Quy-Doi-Diem-Trung-Tuyen-Giua-Cac-Phuong-Thuc-Xet-Tuyen-Dai-Hoc-Chinh-Quy-Nam-2026-149.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
