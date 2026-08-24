import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dutAdmissionMethods } from './methods';

export const dutModule: SchoolModule = {
  id: 'dut',
  name: 'Trường Đại học Bách khoa - Đại học Đà Nẵng',
  shortName: 'DUT',
  about: 'Trường thành viên kỹ thuật của Đại học Đà Nẵng (UDN), đào tạo các ngành kỹ thuật - công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh lại nguồn tuyển sinh chính thức 2026 (thông báo hệ thống ĐHĐN + trang/tài liệu tuyển sinh riêng của DUT) · Ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) khoảng 16-22.75/30 theo ngành · Chưa nhập bảng ngành chi tiết, phụ lục quy đổi và bảng điểm cộng/ưu tiên.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dutAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'DUT - Phương thức tuyển sinh 2026',
      url: 'https://tuyensinh.dut.udn.vn/phuong-thuc-tuyen-sinh',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
