import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { umtAdmissionMethods } from './methods';

export const umtModule: SchoolModule = {
  id: 'umt',
  name: 'Trường Đại học Quản lý và Công nghệ TP.HCM',
  shortName: 'UMT',
  about: 'Trường đại học tư thục tại TP.HCM, đào tạo các ngành công nghệ thông tin, quản trị, kinh doanh.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Nguồn báo chí dẫn thông báo chính thức UMT 2026 (2 nguồn độc lập khớp nhau) xác nhận điểm sàn xét tuyển bằng kết quả thi TN THPT là 15/30, áp dụng đồng nhất cho toàn bộ 10 ngành đào tạo.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(umtAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Quản lý và Công nghệ TPHCM công bố điểm sàn xét tuyển',
      url: 'https://giaoducthoidai.vn/truong-dai-hoc-quan-ly-va-cong-nghe-tphcm-cong-bo-diem-san-xet-tuyen-post784293.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
