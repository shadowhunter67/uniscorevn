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
    'Calculator exact cho PT1 (mã 405, thi TN THPT + năng khiếu TDTT), nhóm ngành Huấn luyện thể thao/Quản lý TDTT/Y sinh học TDTT: ngưỡng đầu vào 15,0/30 (2 môn văn hóa + năng khiếu, KHÔNG cộng ưu tiên) đồng thời năng khiếu ≥ 5,0/10, đọc trực tiếp Quyết định 58/QĐ-TDTTHCM (06/03/2026, PDF chính thức USH, 13 trang, đọc qua vision). Văn bản còn công bố công thức ĐXT = ĐVH1+ĐVH2+ĐNK+Điểm ưu tiên+Điểm cộng dùng để xếp hạng cạnh tranh (hiển thị tham khảo, KHÔNG ảnh hưởng đạt/chưa đạt ngưỡng đầu vào) — mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call, trường chỉ dẫn chiếu Điều 7 Quy chế của Trường). Điểm cộng riêng của trường (mục 8.b) chưa tìm được bảng cụ thể. Ngành Giáo dục thể chất (ngưỡng riêng, không nêu số) và phương thức học bạ chưa mô hình hoá. Cần nhập thêm điểm năng khiếu TDTT (không có trong hồ sơ chung) — vào trang so sánh USH để nhập.',
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
    {
      title: 'Quyết định 58/QĐ-TDTTHCM (06/03/2026): Thông tin tuyển sinh năm 2026',
      url: 'https://ush.edu.vn/thong-bao/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-1500.html',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
