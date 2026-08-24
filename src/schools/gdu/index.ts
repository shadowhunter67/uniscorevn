import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { gduAdmissionMethods } from './methods';

export const gduModule: SchoolModule = {
  id: 'gdu',
  name: 'Trường Đại học Gia Định',
  shortName: 'GDU',
  about: 'Trường đại học tư thục tại TP.HCM, đào tạo đa ngành: công nghệ thông tin, quản trị, kinh doanh, tài chính - ngân hàng, khoa học xã hội, Sức khỏe, Luật.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh trực tiếp (giadinh.edu.vn) điểm sàn GDU 2026 theo thi TN THPT: 15,0/30 cho nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế. Khối Sức khỏe (Răng Hàm Mặt, Điều dưỡng, Kỹ thuật phục hồi chức năng) và Luật có ngưỡng riêng cao hơn, CHƯA nằm trong runtime — module chỉ áp dụng đúng cho nhóm ngành phổ thông đã nêu.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(gduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Gia Định công bố điểm sàn xét tuyển năm 2026',
      url: 'https://giadinh.edu.vn/truong-dai-hoc-gia-dinh-cong-bo-diem-san-xet-tuyen-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Trường Đại học Gia Định công bố 05 phương thức tuyển sinh đại học chính quy năm 2026',
      url: 'https://giadinh.edu.vn/truong-dai-hoc-gia-dinh-cong-bo-05-phuong-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
