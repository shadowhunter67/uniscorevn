import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hatAdmissionMethods } from './methods';

export const hatModule: SchoolModule = {
  id: 'hat',
  name: 'Trường Du lịch - Đại học Huế',
  shortName: 'HAT',
  about: 'Trường đại học thành viên Đại học Huế, đào tạo khối ngành du lịch - khách sạn - nhà hàng: Quản trị dịch vụ du lịch và lữ hành, Quản trị khách sạn, Quản trị nhà hàng và dịch vụ ăn uống...',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HAT 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành, nguồn 3 báo/tổng hợp ĐỘC LẬP khớp TUYỆT ĐỐI (tuyensinh247 `sources.ts:hat-threshold-2025`, Báo Hà Tĩnh `hat-threshold-secondary-2025`, Sforum/CellphoneS `hat-threshold-tertiary-2025`) — nguồn gốc chính thức huht.hueuni.edu.vn không fetch trực tiếp được (connection refused). Xác nhận trực tiếp điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (đã cộng ưu tiên). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ, cùng tiền lệ HUMP). Mô hình hoá 7/7 ngành đại học chính quy, điểm chuẩn từ 15,00 đến 21,50/30, mỗi ngành 1 mức chung mọi tổ hợp. Điểm cộng và phương thức học bạ/tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hatAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Du Lịch - Đại Học Huế 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/truong-du-lich-dai-hoc-hue-DHD.html',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Trường Du Lịch - Đại Học Huế 2025 – Theo ngành và tổ hợp xét tuyển (Báo Hà Tĩnh)',
      url: 'https://baohatinh.vn/cong-cu/diem-chuan/dhd-truong-du-lich-dai-hoc-hue',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Điểm chuẩn Trường Du lịch - Đại học Huế 2025 (Sforum/CellphoneS)',
      url: 'https://cellphones.com.vn/sforum/diem-chuan-truong-du-lich-dai-hoc-hue-2025',
      type: 'secondary',
      checkedAt: '2026-09-03',
    },
  ],
};
