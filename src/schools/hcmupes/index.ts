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
    'Calculator exact cho ngành Giáo dục thể chất, Phương thức 405 (thi TN THPT + năng khiếu TDTT): đọc trực tiếp Thông báo 05/TB-HĐTS (13/07/2026, PDF chính thức tải trực tiếp qua vision, không qua tuyensinh247) xác nhận ĐẦY ĐỦ bảng ngưỡng theo khu vực ưu tiên: KV3 >= 19,00; KV2 >= 18,75; KV2-NT >= 18,50; KV1 >= 18,25 (thang 30, điểm tổ hợp 2 môn văn hóa + năng khiếu TDTT, không nhân hệ số). Số liệu chính thức, không phải judgment call. Cần nhập thêm điểm năng khiếu TDTT (không có trong hồ sơ chung). Đối tượng ưu tiên (UT1/UT2), Huấn luyện thể thao/Quản lý TDTT, và phương thức học bạ (406) chưa mô hình hoá — xem knowledgeGaps.',
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
