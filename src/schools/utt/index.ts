import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uttAdmissionMethods } from './methods';

export const uttModule: SchoolModule = {
  id: 'utt',
  name: 'Trường Đại học Công nghệ Giao thông vận tải',
  shortName: 'UTT',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo kỹ thuật giao thông vận tải và công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh UTT 2026 (2 nguồn báo chí độc lập dẫn thông báo chính thức, khớp nhau) xác nhận điểm sàn thi TN THPT dao động 15-20/30 tuỳ ngành. UniscoreVN mới kiểm tra được ngưỡng theo khoảng, chưa có bảng ngưỡng từng ngành cụ thể.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uttAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Đại học Công nghệ Giao thông Vận tải công bố điểm sàn xét tuyển năm 2026',
      url: 'https://bnews.vn/dai-hoc-cong-nghe-giao-thong-van-tai-cong-bo-diem-san-xet-tuyen-nam-2026/428962.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
