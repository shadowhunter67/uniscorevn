import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pyuAdmissionMethods } from './methods';

export const pyuModule: SchoolModule = {
  id: 'pyu',
  name: 'Trường Đại học Phú Yên',
  shortName: 'PYU',
  about: 'Trường đại học công lập tại Phú Yên, đào tạo khối ngành sư phạm và các ngành ngoài sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm sàn 2026 của PYU qua báo chí nhà nước (Báo Tuổi Trẻ, 10/07/2026): khối ngành sư phạm (6 ngành) 20/30, các ngành khác (5 ngành) 15/30 — cả hai chỉ theo phương thức thi TN THPT. Phương thức học bạ (18/30) và ĐGNL ĐHQG-HCM (500 điểm) chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pyuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Phú Yên - Cổng thông tin tuyển sinh',
      url: 'https://tuyensinh.pyu.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Các ngành sư phạm ở Trường Đại học Phú Yên có điểm sàn 20 điểm (Báo Tuổi Trẻ)',
      url: 'https://tuoitre.vn/cac-nganh-su-pham-o-truong-dai-hoc-phu-yen-co-diem-san-20-diem-100260710185427395.htm',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
