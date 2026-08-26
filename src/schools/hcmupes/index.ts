import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hcmupesAdmissionMethods } from './methods';

export const hcmupesModule: SchoolModule = {
  id: 'hcmupes',
  name: 'Trường Đại học Sư phạm Thể dục Thể thao Thành phố Hồ Chí Minh',
  shortName: 'HCMUPES',
  about: 'Trường đại học công lập tại TP.HCM đào tạo giáo viên và cán bộ ngành thể dục thể thao.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp Thông báo 05/TB-HĐTS (13/07/2026, đọc từ PDF Google Drive chính thức) cho ngành Giáo dục thể chất: điểm tổ hợp (2 môn văn hóa + năng khiếu TDTT, không nhân hệ số) phải đạt ngưỡng theo khu vực ưu tiên (18,25-19,00/30). Cần nhập thêm điểm năng khiếu TDTT (không có trong hồ sơ chung) — vào trang so sánh HCMUPES để nhập. Huấn luyện thể thao/Quản lý TDTT và phương thức học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hcmupesAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 05/TB-HĐTS: Ngưỡng đảm bảo chất lượng đầu vào ngành Giáo dục thể chất năm 2026 (HCMUPES)',
      url: 'https://tuyensinh.upes.edu.vn/2026/07/13/nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
