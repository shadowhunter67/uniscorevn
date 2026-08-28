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
    'Calculator exact cho 4 ngành đào tạo giáo viên ngoại ngữ (Sư phạm tiếng Anh/Pháp/Trung Quốc/Hàn Quốc): ngưỡng 20,00/30 = tổng điểm 3 môn thi TN THPT + điểm ưu tiên khu vực/đối tượng, đọc trực tiếp qua vision ảnh "Ngưỡng đầu vào xét tuyển đại học chính quy năm 2026" trên trang chính thức, kết hợp công thức điểm ưu tiên (Thông tư 06/2026/TT-BGDĐT) từ PDF chính thức "Thông tin tuyển sinh năm 2026". Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call). Các ngành cử nhân còn lại (16 ngành, ngưỡng 15,5-17,5/30) cần điểm học bạ — chưa mô hình hoá.',
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
