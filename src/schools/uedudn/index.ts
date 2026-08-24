import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uedudnAdmissionMethods } from './methods';

export const uedudnModule: SchoolModule = {
  id: 'uedudn',
  name: 'Trường Đại học Sư phạm - Đại học Đà Nẵng',
  shortName: 'UED',
  about: 'Trường thành viên khối sư phạm của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của UED) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 15.5-20/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uedudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'UED - Ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm trúng tuyển năm 2026',
      url: 'https://tuyensinh.ued.udn.vn/index.php/2026/07/10/__trashed/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
