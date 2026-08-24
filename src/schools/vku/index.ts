import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vkuAdmissionMethods } from './methods';

export const vkuModule: SchoolModule = {
  id: 'vku',
  name: 'Trường Đại học Công nghệ Thông tin và Truyền thông Việt - Hàn',
  shortName: 'VKU',
  about: 'Trường thành viên đào tạo CNTT và truyền thông của Đại học Đà Nẵng (UDN), hợp tác Việt - Hàn.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của VKU) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 17-21/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vkuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'VKU - Thông tin tuyển sinh năm 2026 (cập nhật 09/4/2026)',
      url: 'https://ts.udn.vn/files/2026/2026_4_10_48_48_174_3.vku_-_thong_tin_tuyen_sinh_cap_nhat_09.4.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
