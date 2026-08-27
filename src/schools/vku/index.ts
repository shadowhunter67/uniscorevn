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
    'Tính đủ Điểm xét tuyển (exact) cho Phương thức 2 - xét tuyển kết hợp: học bạ (tổng TB 3 năm, 3 môn) × 60% + thi TN THPT (tổng 3 môn) × 40% + điểm cộng chứng chỉ (Phụ lục II) + điểm ưu tiên KV/ĐT (công thức giảm khi ≥ 22,5) — đều trích nguyên văn từ PDF thông tin tuyển sinh 2026 · Lưu ý: VKU CHƯA công bố ngưỡng đảm bảo chất lượng đầu vào PT2 nên kết quả không kết luận đạt/không đạt · Chưa mô hình hoá: Phương thức 3 (ĐGNL), quy đổi chứng chỉ thay điểm môn, điểm thưởng thành tích ngoài chứng chỉ.',
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
