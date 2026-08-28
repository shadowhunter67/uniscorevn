import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uhdAdmissionMethods } from './methods';

export const uhdModule: SchoolModule = {
  id: 'uhd',
  name: 'Trường Đại học Hải Dương',
  shortName: 'UHD',
  about: 'Trường đại học công lập tại Hải Dương, đào tạo đa ngành và sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức xét kết quả thi TN THPT, nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV: ngưỡng đầu vào 15/30, đọc trực tiếp Quyết định 289/QĐ-ĐHHD (02/04/2026, PDF chính thức UHD) xác nhận công thức Điểm xét tuyển = Môn1+Môn2+Môn3+Điểm UT (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng) và trường KHÔNG áp dụng điểm cộng năm 2026. Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call). Nhóm ngành Sư phạm và Giáo dục thể chất có ngưỡng riêng do Bộ GD&ĐT quyết định hàng năm, chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uhdAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Hải Dương thông báo điểm sàn xét tuyển dao động từ 15-20 điểm',
      url: 'https://giaoduc.net.vn/truong-dai-hoc-hai-duong-thong-bao-diem-san-xet-tuyen-dao-dong-tu-15-20-diem-post261304.gd',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Quyết định 289/QĐ-ĐHHD (02/04/2026) - Thông tin tuyển sinh năm 2026',
      url: 'https://uhd.edu.vn/tin-tuc/thong-tin-tuyen-sinh-nam-2026-postrLJ9g9Q3ANsYWpaprpzY',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
