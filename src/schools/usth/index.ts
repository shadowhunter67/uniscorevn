import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { usthAdmissionMethods } from './methods';

export const usthModule: SchoolModule = {
  id: 'usth',
  name: 'Trường Đại học Khoa học và Công nghệ Hà Nội',
  shortName: 'USTH',
  about: 'Trường đại học công lập liên kết Việt-Pháp trực thuộc Viện Hàn lâm Khoa học và Công nghệ Việt Nam, đào tạo 20 ngành/chương trình khối khoa học-kỹ thuật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'USTH 2026, Phương thức 4 (thi TN THPT): Điểm xét tuyển = tổng thô 3 môn + điểm ưu tiên, so với điểm chuẩn thật theo 16/17 mã ngành (19,00-23,00/30), nguồn Quyết định 171/QĐ-ĐHKHCN (công thức) + trang điểm chuẩn chính chủ, cùng năm 2026, 8 tổ hợp không chênh lệch điểm. Loại Kỹ thuật Hàng không và 3 chương trình song bằng (chỉ xét PT1/PT2/PT3, thang 100). PT1/PT2/PT3 chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(usthAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 171/QĐ-ĐHKHCN (11/3/2026) ban hành Thông tin tuyển sinh trình độ đại học năm 2026',
      url: 'https://usth.edu.vn/wp-content/uploads/2026/05/171.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'USTH công bố điểm chuẩn năm 2026',
      url: 'https://tuyensinh.usth.edu.vn/usth-cong-bo-diem-chuan-nam-2026-4045',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
