import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hunreAdmissionMethods } from './methods';

export const hunreModule: SchoolModule = {
  id: 'hunre',
  name: 'Trường Đại học Tài nguyên và Môi trường Hà Nội',
  shortName: 'HUNRE',
  about: 'Trường đại học công lập trực thuộc Bộ Nông nghiệp và Môi trường, đào tạo khối ngành tài nguyên/môi trường và kinh tế/kỹ thuật: Quản lý tài nguyên và môi trường, Công nghệ kỹ thuật môi trường, Marketing, Ngôn ngữ Anh, Công nghệ thông tin... (khác HCMUNRE — cơ sở TP.HCM tên gần giống).',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HUNRE 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành, nguồn Viettelstore (`sources.ts:hunre-threshold-2025`), cross-check dải điểm + ngành cao nhất với Giaoduc.net.vn (`hunre-threshold-secondary-2025`, khớp tuyệt đối 15-26,65 và Marketing cao nhất). Xác nhận trực tiếp điểm chuẩn "đã bao gồm điểm ưu tiên (nếu có)". Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 22/22 ngành đại học chính quy, điểm chuẩn từ 15,00 đến 26,65/30, mỗi ngành công bố 1 mức chung (không phân biệt theo tổ hợp) — CHỈ mô hình hoá tổ hợp D01 (xác nhận riêng dải điểm D01 khớp chính xác bảng công bố; các tổ hợp khác của trường chưa xác minh cho đúng năm 2025). Mã ngành dùng mã ngành đào tạo chuẩn quốc gia (đối chiếu qua tuyensinh247).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hunreAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Đại học Tài nguyên và Môi trường Hà Nội (DMT) 2025 mới nhất – Chi tiết theo từng ngành',
      url: 'https://viettelstore.vn/tin-tuc/diem-chuan-dai-hoc-tai-nguyen-va-moi-truong-ha-noi-dmt-2025-moi-nhat-chi-tiet-theo-tung-nganh',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Tài nguyên và Môi trường Hà Nội năm 2025: Ngành Marketing cao nhất (Giaoduc.net.vn)',
      url: 'https://giaoduc.net.vn/diem-chuan-truong-dai-hoc-tai-nguyen-va-moi-truong-ha-noi-nam-2025-nganh-marketing-cao-nhat-post253935.gd',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
