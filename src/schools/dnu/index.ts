import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dnuAdmissionMethods } from './methods';

export const dnuModule: SchoolModule = {
  id: 'dnu',
  name: 'Trường Đại học Đồng Nai',
  shortName: 'DNU',
  about: 'Trường đại học công lập trực thuộc UBND tỉnh Đồng Nai (mã trường DNU), đào tạo khối ngành sư phạm, ngoại ngữ, kinh tế và kỹ thuật.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'DNU 2025 (Phương thức 1 — xét kết quả thi TN THPT, mã phương thức 100): điểm trúng tuyển CHÍNH THỨC theo 9/11 ngành có phương thức này (16,00–26,51/30), nguồn CHÍNH CHỦ dnpu.edu.vn cho cả điểm trúng tuyển (Quyết định 1408/QĐ-HĐTS, `sources.ts:dnu-threshold-2025`) và công thức/tổ hợp (Thông tin tuyển sinh 2025, `sources.ts:dnu-thongtin-2025`) — trường xác nhận điểm chuẩn theo ngành áp dụng như nhau cho mọi tổ hợp/phương thức. Cùng năm 2025. Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — xem `knowledgeGaps.ts`). Điểm cộng không có bảng cụ thể — mặc định 0. Ngành Sư phạm còn điều kiện hộ khẩu/thường trú Đồng Nai KHÔNG được kiểm tra. 2 ngành Giáo dục Mầm non và các phương thức học bạ/tuyển thẳng/năng khiếu/chứng chỉ quốc tế chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dnuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định số 1408/QĐ-HĐTS — Công bố điểm chuẩn trúng tuyển đại học, cao đẳng chính quy năm 2025',
      url: 'https://dnpu.edu.vn/diem-chuan-trung-tuyen-dai-hoc-cao-dang-chinh-quy-nam-2025',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông tin tuyển sinh năm 2025',
      url: 'https://dnpu.edu.vn/thong-tin-tuyen-sinh-nam-2025',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
