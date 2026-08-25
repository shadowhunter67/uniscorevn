import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { halonguAdmissionMethods } from './methods';

export const halonguModule: SchoolModule = {
  id: 'halongu',
  name: 'Trường Đại học Hạ Long',
  shortName: 'HALONGU',
  about: 'Trường đại học công lập tại Quảng Ninh, đào tạo đa ngành gồm cả các ngành sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp (uhl.edu.vn) ngưỡng PT1 (thi TN THPT) HALONGU 2026 cho nhóm ngành NGOÀI sư phạm: 15,00/30 điểm. Nhóm sư phạm (kể cả Sư phạm Âm nhạc) theo quy định riêng, CHƯA nằm trong runtime. Module chỉ kiểm tra ngưỡng PT1; PT2 (học bạ), PT3-PT5 (năng khiếu/chứng chỉ/ĐGNL Sư phạm Hà Nội) và bảng 26 ngành/tổ hợp chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(halonguAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh trình độ đại học chính quy năm 2026 - Trường Đại học Hạ Long',
      url: 'https://uhl.edu.vn/TuyensinhHeDaihoc_8699.htm',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Phương thức tuyển sinh năm 2026 - Trường Đại học Hạ Long',
      url: 'https://uhl.edu.vn/Phuongthuctuyensinh_5000.htm',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
