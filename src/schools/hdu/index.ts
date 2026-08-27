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
    'Tính chính xác Điểm xét tuyển HDU 2026 (PT1 - thi TN THPT) cho ngành Luật và Luật Kinh tế: Điểm xét tuyển = min(30, tổng thô 3 môn + điểm khuyến khích) + điểm ưu tiên (công thức giảm [(30 − A − B)/7,5] × mức khi tổng > 22,5) — công thức mục 7.5.b và ngưỡng 18,00/30 + Ngữ văn ≥ 6,0 đều trích nguyên văn Thông tin tuyển sinh 2026. Điểm khuyến khích (giải HSG tỉnh / lớp chuyên) chưa có mức chính thức nên nhánh exact áp dụng cho thí sinh không có điểm khuyến khích. Các ngành khác và nhóm sư phạm vẫn chưa có ngưỡng để kiểm tra.',
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
