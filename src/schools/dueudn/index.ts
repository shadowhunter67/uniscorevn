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
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của DUE qua trang hệ thống ts.udn.vn (09/8/2026, bảng HTML text thật): 19/36 mã xét tuyển (chương trình "ST - Tiêu chuẩn"), nhánh xét kết quả thi TN THPT thuần — Điểm xét = tổng 3 môn + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). 17 mã chương trình song ngữ/toàn phần tiếng Anh (PR/GB/EL, cần học bạ + chứng chỉ quốc tế) chưa mô hình hoá. Trường không công bố tổ hợp môn riêng theo mã — chấp nhận tổ hợp bất kỳ.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
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
      title: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026',
      url: 'https://ts.udn.vn/DHCD/Chinhquy/diemchuan/19567',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
