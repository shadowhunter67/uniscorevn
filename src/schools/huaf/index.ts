import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huafAdmissionMethods } from './methods';

export const huafModule: SchoolModule = {
  id: 'huaf',
  name: 'Trường Đại học Nông Lâm, Đại học Huế',
  shortName: 'HUAF',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các lĩnh vực nông nghiệp, lâm nghiệp, thủy sản, thú y, cơ khí và quản lý tài nguyên.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh HUAF 2026 chính thức đã xác minh 19 ngành, 4 phương thức xét tuyển và ngưỡng tổng điểm 3 môn thi TN THPT tối thiểu 15/30 (điều kiện chung cho phương thức xét học bạ). Quy đổi chứng chỉ ngoại ngữ, điểm cộng/ưu tiên và bảng ngưỡng theo từng ngành chưa được chuẩn hóa vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huafAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 của Trường Đại học Nông Lâm, Đại học Huế',
      url: 'https://tuyensinh.huaf.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-nong-lam-dai-hoc-hue-chinh-thuc-2/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
