import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pntuAdmissionMethods } from './methods';

export const pntuModule: SchoolModule = {
  id: 'pntu',
  name: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
  shortName: 'PNTU',
  about: 'Trường đại học công lập tại TP.HCM, đào tạo khối ngành sức khoẻ (Y, Răng-Hàm-Mặt, Điều dưỡng, Tâm lý học, ...).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo ngưỡng đảm bảo chất lượng đầu vào 2026 (10/07/2026, khu vực 3): dải điểm sàn toàn trường 15,5-22,5/30, đối chiếu chéo báo chí xác nhận 3 ngành (Y khoa 22.5, Răng-Hàm-Mặt 22.5, Tâm lý học 15.5). Các ngành khối sức khoẻ còn lại và phương thức xét tuyển thẳng chưa được model hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pntuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học năm 2026',
      url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc/thong-tin-tuyen-sinh-dai-hoc-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học chính quy năm 2026',
      url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
