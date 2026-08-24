import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hduAdmissionMethods } from './methods';

export const hduModule: SchoolModule = {
  id: 'hdu',
  name: 'Trường Đại học Hồng Đức',
  shortName: 'HDU',
  about: 'Trường đại học công lập đa ngành tại Thanh Hóa, trực thuộc UBND tỉnh Thanh Hóa.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HDU 2026 công bố 4 phương thức xét tuyển, nhưng chỉ ngành Luật/Luật Kinh tế có ngưỡng cụ thể (tổng 3 môn >= 18,0/30, Ngữ văn >= 6,0). Các ngành khác ghi "công bố sau khi có kết quả thi" và nhóm ngành sư phạm theo ngưỡng Bộ GDĐT chưa công bố, nên module chỉ kiểm tra được điều kiện cho ngành Luật/Luật Kinh tế.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đào tạo trình độ đại học năm 2026',
      url: 'https://tuyensinh.hdu.edu.vn/thong-tin-tuyen-sinh-dao-tao-trinh-do-dai-hoc-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
