import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { saodoAdmissionMethods } from './methods';

export const saodoModule: SchoolModule = {
  id: 'saodo',
  name: 'Trường Đại học Sao Đỏ',
  shortName: 'SDU',
  about: 'Trường đại học công lập tại Hải Dương (Hải Phòng sau sáp nhập), đào tạo 21 ngành khối kỹ thuật, kinh tế, ngôn ngữ, sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra điểm chuẩn SDU 2026 (thi TN THPT): 18 ngành ≥15,0/30, riêng Luật ≥20,0/30 — điểm chuẩn TRÚNG TUYỂN thật đã công bố 10/8/2026 (2 ngành sư phạm có điểm bất thường cao 26,18/23,50, ngoài phạm vi). Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. Các phương thức kết hợp học bạ, học bạ, ĐGNL, ĐGTD chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(saodoAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm trúng tuyển đại học chính quy năm 2026 — SDU',
      url: 'https://saodo.edu.vn/vi/news/tin-tuyen-sinh/truong-dai-hoc-sao-do-thong-bao-diem-trung-tuyen-va-danh-sach-thi-sinh-trung-tuyen-dai-hoc-chinh-quy-nam-2026-2933.html',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
