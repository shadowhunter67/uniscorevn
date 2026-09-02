import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { humpAdmissionMethods } from './methods';

export const humpModule: SchoolModule = {
  id: 'hump',
  name: 'Trường Đại học Y - Dược, Đại học Huế',
  shortName: 'HUMP',
  about: 'Trường đại học thành viên Đại học Huế, đào tạo khối ngành sức khỏe: Y khoa, Răng - Hàm - Mặt, Dược học, Y học cổ truyền, Điều dưỡng, Kỹ thuật xét nghiệm y học...',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HUMP 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành, nguồn tuyensinh247 (`sources.ts:hump-threshold-2025`), cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (`hump-threshold-secondary-2025`, khớp 10/11 ngành theo từng tổ hợp). Xác nhận trực tiếp điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (đã cộng ưu tiên). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 11/11 ngành đại học chính quy, điểm chuẩn từ 17,00 đến 25,17/30, mỗi ngành 1 mức chung mọi tổ hợp (giống VNU-UET/VNU-HUS/HUNRE), tổ hợp A00/B00/B08/D07 (đã có sẵn, không cần thêm). Mã ngành dùng mã ngành đào tạo chuẩn quốc gia (series 772xxxx).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(humpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Y Dược Huế 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-y-duoc-hue-DHY.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại Học Y Dược Huế 2025 – Theo ngành và tổ hợp xét tuyển (Báo Hà Tĩnh)',
      url: 'https://baohatinh.vn/cong-cu/diem-chuan/dhy-truong-dai-hoc-y-duoc-hue',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
