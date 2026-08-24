import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hulAdmissionMethods } from './methods';

export const hulModule: SchoolModule = {
  id: 'hul',
  name: 'Trường Đại học Luật, Đại học Huế',
  shortName: 'HUL',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo ngành Luật và Luật Kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh HUL 2026 chính thức đã xác minh mức điểm sàn 20,0/30 (không nhân hệ số) cho phương thức xét điểm thi TN THPT, áp dụng chung cho cả 2 ngành. Công thức xét học bạ, điểm cộng/ưu tiên chưa được chuẩn hóa vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hulAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Các phương thức tuyển sinh và tổ hợp xét tuyển vào Trường Đại học Luật, Đại học Huế năm 2026',
      url: 'https://tuyensinh.hul.edu.vn/News/Detail/cac-phuong-thuc-tuyen-sinh-va-to-hop-xet-tuyen-vao-truong-dai-hoc-luat-dai-hoc-hue-nam-2026_20260227210356',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Ngưỡng đảm bảo chất lượng đầu vào và điểm chuẩn năm 2026',
      url: 'https://hul.edu.vn/vi/news/detail/nguong-dam-bao-chat-luong-dau-vao-va-diem-chuan-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
