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
    'Nguồn tuyển sinh UHD 2026 (cross-check 2 nguồn báo chí độc lập dẫn thông báo chính thức, uhd.edu.vn tồn tại nhưng nội dung không fetch trực tiếp được) xác nhận ngưỡng đầu vào 15/30 cho nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV; nhóm ngành Sư phạm và Giáo dục thể chất có ngưỡng riêng cao hơn (17-20/30), chưa mô hình hoá.',
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
  ],
};
