import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { qnuAdmissionMethods } from './methods';

export const qnuModule: SchoolModule = {
  id: 'qnu',
  name: 'Trường Đại học Quy Nhơn',
  shortName: 'QNU',
  about: 'Trường đại học công lập tại Bình Định, đào tạo đa ngành — batch này chỉ mô hình hoá 10 ngành khối sư phạm/giáo dục: Sư phạm Toán/Vật lý/Hoá học/Ngữ văn/Lịch sử/Địa lý/Tiếng Anh, Giáo dục Tiểu học/chính trị, Quản lý Giáo dục.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'QNU 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn 10/52 ngành khối sư phạm/giáo dục, cross-check qua 2-3 báo độc lập (trangedu.com, Sforum/CellphoneS, Báo Gia Lai cho Sư phạm Lịch sử — `sources.ts`; cổng chính thức Cổng TTĐT Chính phủ chỉ đăng ảnh). Điểm chuẩn công bố là mức ĐXT tối thiểu (ĐXT = 3 môn + điểm ưu tiên theo công thức trường công bố) — đã bao hàm ưu tiên theo định nghĩa, không cần judgment call cho việc CÓ áp dụng. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ). Mô hình hoá Sư phạm Lịch sử (27,21) xuống Sư phạm Tiếng Anh (23,59), tổ hợp A00/A01/A02/B00/C00/C02/C03/C04/D01/D07/D10/D14/D15 (đã có sẵn, không cần thêm). LOẠI TRỪ các ngành khối Kinh tế/Kỹ thuật dùng nhân hệ số môn chính (2 nguồn cross-check lệch nhau cho các ngành đó — không đủ tin cậy).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(qnuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn trúng tuyển trường Đại học Quy Nhơn 2025',
      url: 'https://trangedu.com/diem-chuan/diem-chuan-dai-hoc-quy-nhon/',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Điểm chuẩn Đại học Quy Nhơn 2025 (Sforum)',
      url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-quy-nhon-2025',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
