import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uteudnAdmissionMethods } from './methods';

export const uteudnModule: SchoolModule = {
  id: 'uteudn',
  name: 'Trường Đại học Sư phạm Kỹ thuật - Đại học Đà Nẵng',
  shortName: 'UTE',
  about: 'Trường thành viên khối sư phạm kỹ thuật của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của UTE) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 15-20/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uteudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'UTE - Trang tuyển sinh chính thức',
      url: 'https://tuyensinh.ute.udn.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
