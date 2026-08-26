import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dthuAdmissionMethods } from './methods';

export const dthuModule: SchoolModule = {
  id: 'dthu',
  name: 'Trường Đại học Đồng Tháp',
  shortName: 'DTHU',
  about: 'Trường đại học công lập tại tỉnh Đồng Tháp, đào tạo đa ngành, thế mạnh sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp Thông báo 09/07/2026 (Phụ lục I, đọc từ file PDF đính kèm bài đăng chính thức, đủ 59/59 ngành): ngưỡng đầu vào phương thức thi TN THPT — 20,0/30 cho 16 ngành sư phạm (không năng khiếu), 15,0/30 cho 36 ngành khác, 20,0/30 cho Luật (kèm điều kiện phụ chưa model). 6 ngành có môn năng khiếu (Mầm non/GDTC/SP Âm nhạc/SP Mỹ thuật/Huấn luyện Thể thao) chưa model do thiếu field điểm năng khiếu. NĐV đã bao gồm điểm ưu tiên, runtime hiện chỉ so điểm thô 3 môn.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dthuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo ngưỡng bảo đảm chất lượng đầu vào đại học, cao đẳng chính quy theo phương thức kết quả thi tốt nghiệp THPT năm 2026',
      url: 'https://tuyensinh.dthu.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-cao-dang-chinh-quy-theo-phuong-thuc-ket-qua-thi-tot-nghiep-thpt-nam-2026-va-cac-dieu-kien-dang-ky-072818.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
  ],
};
