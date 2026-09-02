import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { qbuAdmissionMethods } from './methods';

export const qbuModule: SchoolModule = {
  id: 'qbu',
  name: 'Trường Đại học Quảng Bình',
  shortName: 'QBU',
  about: 'Trường đại học công lập tại Quảng Bình, đào tạo đa ngành — batch này mô hình hoá 14/15 ngành đại học chính quy (loại Giáo dục Mầm non, dùng tổ hợp năng khiếu chưa xác minh): các ngành sư phạm/giáo dục, ngôn ngữ, kinh tế, CNTT, nông nghiệp, du lịch, môi trường.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'QBU 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn 14/15 ngành, theo TỪNG TỔ HỢP (không phải 1 mức chung cho cả ngành), cross-check qua 5 nguồn độc lập (Tuyensinh247/Taro.edu.vn bảng chi tiết theo tổ hợp, FPTShop/Sforum/Navigates bảng mức thấp nhất theo ngành — `sources.ts`, tất cả khớp tuyệt đối). Nguồn xác nhận TOÀN BỘ 15 ngành KHÔNG nhân hệ số ("xét 3 môn thi (không nhân hệ số)") và điểm chuẩn công bố ứng với thí sinh khu vực 3 — tương đương mức ĐXT tối thiểu (đã bao hàm điểm ưu tiên theo định nghĩa, không cần judgment call cho việc CÓ áp dụng). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá 14 ngành, dải điểm chuẩn 15,00 - 26,86/30, tổ hợp A00/A01/A02/A09/B00/B03/B08/C00/C01/C02/C03/C04/C14/C19/D01/D07/D09/D10/D14/D15/X01 (đã có sẵn, không cần thêm).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(qbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại Học Quảng Bình 2025 chính xác',
      url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-quang-binh-DQB.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Trường Đại Học Quảng Bình 2025 (Taro.edu.vn)',
      url: 'https://taro.edu.vn/diem-chuan/dai-hoc-quang-binh-DQB',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
