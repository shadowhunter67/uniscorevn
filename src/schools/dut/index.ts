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
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của DUT qua trang hệ thống ts.udn.vn (09/8/2026, bảng HTML text thật): 49/49 ngành/chuyên ngành, nhánh xét kết quả thi TN THPT — Điểm xét = tổng 3 môn + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). Trường không công bố tổ hợp môn riêng theo ngành — chấp nhận tổ hợp bất kỳ. Phương thức Đánh giá tư duy ĐHBK Hà Nội/xét tuyển thẳng chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
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
      title: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/diemchuan/19567',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
