import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ushAdmissionMethods } from './methods';

export const ushModule: SchoolModule = {
  id: 'ush',
  name: 'Trường Đại học Thể dục Thể thao Thành phố Hồ Chí Minh',
  shortName: 'USH',
  about: 'Trường đại học công lập tại TP.HCM trực thuộc Bộ Văn hóa, Thể thao và Du lịch, đào tạo khối ngành thể dục thể thao.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp Thông báo 10/TB-TDTTHCM (05/03/2026, đọc từ PDF chính thức): 3 ngành (Huấn luyện thể thao, Quản lý TDTT, Y sinh học TDTT) yêu cầu tổng điểm 2 môn văn hóa + điểm năng khiếu TDTT ≥ 15/30, đồng thời điểm năng khiếu riêng ≥ 5/10. Cần nhập thêm điểm năng khiếu TDTT (không có trong hồ sơ chung) mới tính được — vào trang so sánh USH để nhập. Ngành Giáo dục thể chất (ngưỡng riêng, không nêu số) và phương thức học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ushAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 10/TB-TDTTHCM: Tuyển sinh đại học chính quy năm 2026 (Trường ĐH Thể dục Thể thao TP.HCM)',
      url: 'https://ush.edu.vn/thong-bao/thong-bao-chinh-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-1505.html',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
