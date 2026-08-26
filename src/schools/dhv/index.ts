import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dhvAdmissionMethods } from './methods';

export const dhvModule: SchoolModule = {
  id: 'dhv',
  name: 'Trường Đại học Hùng Vương TP.HCM',
  shortName: 'DHV',
  about: 'Trường đại học tư thục tại TP.HCM, tuyển sinh 20 ngành học năm 2026.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh ngưỡng đảm bảo chất lượng đầu vào 2026 của DHV qua báo chí nhà nước (Báo Tuổi Trẻ, 04/07/2026): ngưỡng đồng nhất 15/30 (thi TN THPT) cho các ngành trừ Luật và Tâm lý học (chưa công bố, chờ Bộ GD&ĐT). Phương thức học bạ (18/30) và ĐGNL ĐHQG-HCM (600 điểm) chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dhvAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trang tuyển sinh Trường Đại học Hùng Vương TP.HCM',
      url: 'https://tuyensinh.dhv.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Điểm sàn xét tuyển Trường đại học Văn Hiến và Hùng Vương TP.HCM (Báo Tuổi Trẻ)',
      url: 'https://tuoitre.vn/diem-san-xet-tuyen-truong-dai-hoc-van-hien-va-hung-vuong-tphcm-100260704104342801.htm',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
