import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dueudnAdmissionMethods } from './methods';

export const dueudnModule: SchoolModule = {
  id: 'dueudn',
  name: 'Trường Đại học Kinh tế - Đại học Đà Nẵng',
  shortName: 'DUE',
  about: 'Trường thành viên khối kinh tế - quản trị của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của DUE) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 17-24/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dueudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'DUE - Trang tuyển sinh chính thức',
      url: 'http://due.udn.vn',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
