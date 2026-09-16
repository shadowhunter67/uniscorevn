import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tnueAdmissionMethods } from './methods';

export const tnueModule: SchoolModule = {
  id: 'tnue',
  name: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen',
  shortName: 'TNUE',
  about: 'Public teacher-training member school of Thai Nguyen University.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của TNUE qua trang chính chủ tuyensinh.tnue.edu.vn (09/8/2026, HTML text thật): 19/22 ngành, nhánh xét kết quả thi TN THPT — Điểm xét = tổng 3 môn theo tổ hợp gốc đã công bố + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). 3 ngành tổ hợp năng khiếu (Giáo dục Thể chất, Sư phạm Âm nhạc, Huấn luyện thể thao) chưa mô hình hoá. Phương thức học bạ/đánh giá năng lực chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(tnueAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Su pham - Dai hoc Thai Nguyen cong bo nguong dam bao chat luong dau vao nam 2026',
      url: 'https://tnu.edu.vn/dao-tao/thong-tin-tuyen-sinh/thong-tin-tuyen-sinh-dh-cd/truong-dai-hoc-su-pham-dai-hoc-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo điểm trúng tuyển đại học chính quy năm 2026',
      url: 'https://tuyensinh.tnue.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
