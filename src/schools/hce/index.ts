import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hceAdmissionMethods } from './methods';

export const hceModule: SchoolModule = {
  id: 'hce',
  name: 'Trường Đại học Kinh tế, Đại học Huế',
  shortName: 'HCE',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các lĩnh vực kinh tế, quản trị, tài chính, kế toán.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh HCE 2026 chính thức đã xác minh 5 phương thức xét tuyển và điểm sàn thi TN THPT 15-17/30 tùy ngành (22 ngành). UniscoreVN mới kiểm tra được ngưỡng theo khoảng, chưa có bảng ngưỡng từng ngành cụ thể.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hceAdmissionMethods),
  },
  catalogSources: [
    {
      title: '5 phương thức tuyển sinh năm 2026',
      url: 'https://tuyensinh.hce.edu.vn/5-phuong-thuc-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Điểm sàn xét tuyển đại học năm 2026',
      url: 'https://tuyensinh.hce.edu.vn/diem-san-xet-tuyen-dai-hoc-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
