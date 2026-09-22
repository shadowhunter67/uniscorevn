import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vhuAdmissionMethods } from './methods';

export const vhuModule: SchoolModule = {
  id: 'vhu',
  name: 'Trường Đại học Văn Hiến',
  shortName: 'VHU',
  about: 'Trường đại học tư thục tại TP.HCM, đào tạo đa ngành khối kinh tế, xã hội nhân văn, công nghệ, sức khỏe và nghệ thuật (43 ngành).',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'VHU 2026 (thi TN THPT): so tổng thô 3 môn với điểm chuẩn thật theo 39/43 mã ngành (15,00-20,00/30), nguồn điểm sàn (05/7/2026, xác nhận "khu vực 3, không ưu tiên, chưa gồm điểm cộng") + điểm chuẩn chính chủ (10/8/2026, giaoduc.net.vn đăng lại). Điểm ưu tiên chỉ hiển thị tham khảo. Loại 4 mã năng khiếu (Thanh nhạc, Piano, Đạo diễn/Công nghệ điện ảnh-truyền hình). Phương thức học bạ/kết hợp/ĐGNL chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(vhuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Văn Hiến công bố điểm chuẩn đại học chính quy đợt 1 năm 2026',
      url: 'https://giaoduc.net.vn/truong-dai-hoc-van-hien-cong-bo-diem-chuan-dai-hoc-chinh-quy-dot-1-nam-2026-post262034.gd',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
