import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { viuAdmissionMethods } from './methods';

export const viuModule: SchoolModule = {
  id: 'viu',
  name: 'Trường Đại học Công nghiệp Việt-Hưng',
  shortName: 'VIU',
  about: 'Trường đại học công lập tại Hà Nội (Bộ Công Thương), đào tạo 21 ngành khối kỹ thuật, công nghệ, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Kiểm tra điểm sàn VIU 2026 (Mã 100 — thi TN THPT): đủ điều kiện ⟺ tổng thô 3 môn ≥15,0/30, đồng nhất cả 21 ngành (Thông báo 234/TB-ĐHVH, 01/7/2026). Nguồn không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. LƯU Ý: đây là điểm sàn nhận hồ sơ, chưa phải điểm chuẩn trúng tuyển cuối cùng. Phương thức học bạ, ĐGNL/ĐGTD chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(viuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 234/TB-ĐHVH — Ngưỡng đảm bảo chất lượng đầu vào hệ ĐH chính quy K50, 2026',
      url: 'https://viu.edu.vn/tuyen-sinh/thong-bao-nguong-dam-bao-chat-luong-dau-vao-he-dai-hoc-chinh-quy-k50-nam-2026-113542.html',
      type: 'official-institution',
      checkedAt: '2026-09-17',
    },
  ],
};
