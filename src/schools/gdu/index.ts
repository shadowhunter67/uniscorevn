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
    'Tính chính xác điểm xét tuyển GDU 2026 theo thi TN THPT cho nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế (ngưỡng sàn 15,0/30, không hệ số môn, cộng điểm ưu tiên theo Điều 7 Bộ GDĐT — Đề án tuyển sinh 2026, Số 01/2026/DA-GDU). Khối Sức khỏe (Răng Hàm Mặt, Điều dưỡng, Kỹ thuật phục hồi chức năng) và Luật theo ngưỡng riêng của Bộ GDĐT, CHƯA nằm trong runtime.',
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
    {
      title: 'Đề án tuyển sinh năm 2026 (Số 01/2026/DA-GDU)',
      url: 'https://giadinh.edu.vn/gt-ck-de-an-tuyen-sinh',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
