import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { mduAdmissionMethods } from './methods';

export const mduModule: SchoolModule = {
  id: 'mdu',
  name: 'Trường Đại học Công nghệ Miền Đông',
  shortName: 'MDU/MIT',
  about: 'Trường đại học tư thục tại Đồng Nai, legacy catalog id MDU, hiện sử dụng thương hiệu MIT Uni.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'MDU/MIT 2026 (thi TN THPT): trang chính chủ MIT xác nhận tổ hợp 3 môn phải có Toán hoặc Văn va tổng điểm từ 15/30. Bang điểm chuẩn 2026 cross-check cho 19 dong THPT; module exact chi mô hình hóa 17 ngành ngưỡng 15/30, loai Dược học (19) va Luật kinh tế (18) vi co rui ro ngưỡng/ điều kiện theo khoi sức khỏe-pháp luật. Nguon không nói rõ điểm ưu tiên trong điểm chuẩn, nen so tổng thô va hien thi ưu tiên chi để tham khảo.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(mduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Công nghệ Miền Đông công bố các phương thức xét tuyển năm 2026',
      url: 'https://mit.vn/cong-bo-cac-phuong-thuc-xet-tuyen-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Công nghệ Miền Đông 2026',
      url: 'https://dulieuphapluat.vn/cong-cu/diem-chuan-dai-hoc/dai-hoc-cong-nghe-mien-dong-mit.html',
      type: 'secondary',
      checkedAt: '2026-09-26',
    },
  ],
};
