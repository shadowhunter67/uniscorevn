import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dauAdmissionMethods } from './methods';

export const dauModule: SchoolModule = {
  id: 'dau',
  name: 'Trường Đại học Kiến trúc Đà Nẵng',
  shortName: 'DAU',
  about: 'Trường đại học tư thục tại Đà Nẵng, đào tạo khối ngành kiến trúc, xây dựng, mỹ thuật, kỹ thuật.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Kiểm tra điểm sàn DAU 2026 (thi TN THPT thuần, không kết hợp năng khiếu): đủ điều kiện ⟺ tổng thô 3 môn ≥15,0/30 — điểm sàn ghi rõ "KHÔNG BAO GỒM điểm ưu tiên", điểm ưu tiên chỉ hiển thị tham khảo. LƯU Ý: điểm chuẩn TRÚNG TUYỂN thật theo ngành (16,5-18/30) cao hơn sàn này — "đủ điều kiện" ở đây chỉ có nghĩa đạt sàn nộp hồ sơ, không đảm bảo trúng tuyển. Phương thức kết hợp năng khiếu và học bạ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dauAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Công bố điểm sàn xét tuyển đại học chính quy năm 2026 — DAU',
      url: 'http://tuyensinh.dau.edu.vn/cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026-truong-dai-hoc-kien-truc-da-nang-042035.html',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
