import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { uflsudnAdmissionMethods } from './methods';

export const uflsudnModule: SchoolModule = {
  id: 'uflsudn',
  name: 'Trường Đại học Ngoại ngữ - Đại học Đà Nẵng',
  shortName: 'UFLS',
  about: 'Trường thành viên khối ngoại ngữ của Đại học Đà Nẵng (UDN).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của UFLS) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 15.5-20/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(uflsudnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'UFLS - Thông tin tuyển sinh năm 2026 (bản FINAL)',
      url: 'https://tuyensinh.ufl.udn.vn/wp-content/uploads/2026/06/2026.06.02-Thong-tin-tuyen-sinh-nam-2026-FINAL.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
