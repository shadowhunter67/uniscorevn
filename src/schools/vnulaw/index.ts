import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnulawAdmissionMethods } from './methods';

export const vnulawModule: SchoolModule = {
  id: 'vnulaw',
  name: 'Truong Dai hoc Luat - Dai hoc Quoc gia Ha Noi',
  shortName: 'VNU-LS',
  about: 'Public law school under Vietnam National University, Hanoi (VNU-UL), based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'school',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của VNU-Luật qua Cổng TTĐT Chính phủ (09/8/2026, đối chiếu VietnamNet độc lập): 3/3 ngành, phương thức 100 (thi TN THPT) — Điểm xét = tổng 3 môn (9/10 tổ hợp trường công bố) + điểm ưu tiên KV/ĐT (công thức chính trường xác nhận). Vẫn giữ điều kiện phụ Toán/Ngữ văn >=6/10. 3 phương thức còn lại (tuyển thẳng, HSA, dự bị đại học), quy đổi chứng chỉ tiếng Anh, và lựa chọn CLC sau nhập học chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(vnulawAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong tin tuyen sinh Dai hoc chinh quy nam 2026 - VNU-UL',
      url: 'https://law.vnu.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
    {
      title: 'Điểm chuẩn Đại học Quốc gia Hà Nội 2026',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-dai-hoc-quoc-gia-ha-noi-2026-119260809163517452.htm',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
