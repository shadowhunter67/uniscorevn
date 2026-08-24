import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dainamAdmissionMethods } from './methods';

export const dainamModule: SchoolModule = {
  id: 'dainam',
  name: 'Trường Đại học Đại Nam',
  shortName: 'DNU',
  about: 'Trường đại học tư thục đa ngành tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh trang tuyển sinh chính thức Đại Nam 2026 (dainam.edu.vn): ngưỡng chung phương thức xét điểm thi TN THPT là 15,0/30 cho ngành đại trà. Nhóm ngành Y khoa/Dược học/Luật/Luật kinh tế/Điều dưỡng có ngưỡng riêng theo học lực/điểm xét tốt nghiệp THPT, chưa mô hình hoá; các phương thức khác (học bạ, HSA, xét tuyển thẳng) và bảng mã ngành/tổ hợp cũng chưa được nhập.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dainamAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026 - Trường Đại học Đại Nam',
      url: 'https://dainam.edu.vn/vi/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
