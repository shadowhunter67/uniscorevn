import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vmuAdmissionMethods } from './methods';

export const vmuModule: SchoolModule = {
  id: 'vmu',
  name: 'Trường Đại học Hàng hải Việt Nam',
  shortName: 'VMU',
  about: 'Trường đại học công lập tại Hải Phòng, đào tạo các ngành hàng hải, kỹ thuật, kinh tế, ngôn ngữ và luật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh thông báo VMU 2026: ngưỡng đảm bảo chất lượng đầu vào PT1 (thi TN THPT) chia theo 3 khối ngành - Kỹ thuật/Công nghệ 17/30, Kinh tế/Ngôn ngữ 19/30, Luật 20/30. Bảng quy đổi tương đương giữa 6 phương thức và ánh xạ 55 chương trình theo khối ngành chưa trích xuất được nên chưa hỗ trợ.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.vimaru.edu.vn/tuyensinh/2026-thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026.vmu',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
