import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tvuAdmissionMethods } from './methods';

export const tvuModule: SchoolModule = {
  id: 'tvu',
  name: 'Trường Đại học Trà Vinh',
  shortName: 'TVU',
  about: 'Trường đại học công lập tại Trà Vinh (đồng bằng sông Cửu Long), đào tạo đa ngành — batch này chỉ mô hình hoá 5 ngành khối sức khỏe: Y khoa, Răng-Hàm-Mặt, Dược học, Điều dưỡng, Kỹ thuật xét nghiệm y học.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'TVU 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn 5/47+ ngành đã công bố (khối sức khỏe), cross-check qua 2 báo độc lập (FPTShop, Sforum/CellphoneS — `sources.ts:tvu-threshold-2025`/`tvu-threshold-secondary-2025`, khớp số liệu; cổng chính thức tvu.edu.vn/cce.tvu.edu.vn chỉ đăng lại ảnh từ VTC News). Xác nhận TRỰC TIẾP điểm chuẩn "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" — không cần judgment call cho việc CÓ cộng ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá Y khoa (21,25), Răng-Hàm-Mặt (20,75), Dược học (19,00), Điều dưỡng (17,25), Kỹ thuật xét nghiệm y học (21,50) — tổ hợp A00/B00/B08 (đã có sẵn, không cần thêm). 42 ngành còn lại của trường (dùng nhiều tổ hợp riêng chưa xác minh đủ tin cậy) CHƯA mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tvuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Đại học Trà Vinh 2025 chính thức',
      url: 'https://fptshop.com.vn/tin-tuc/danh-gia/diem-chuan-dai-hoc-tra-vinh-2025-185720',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'DVT - Điểm chuẩn Trường Y Dược - Đại học Trà Vinh 2025 đầy đủ (Sforum)',
      url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-y-tra-vinh-2025',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
