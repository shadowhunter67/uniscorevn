import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hpu2AdmissionMethods } from './methods';

export const hpu2Module: SchoolModule = {
  id: 'hpu2',
  name: 'Truong Dai hoc Su pham Ha Noi 2',
  shortName: 'HPU2',
  about: 'Public teacher-training university based in Xuan Hoa, Phu Tho (formerly Vinh Phuc).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 của HPU2 qua Cổng TTĐT Chính phủ (10/8/2026, đối chiếu VnExpress độc lập): 25/25 ngành nhóm 3-môn chuẩn, nhánh xét kết quả thi TN THPT — Điểm xét = tổng 3 môn + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). Giáo dục Thể chất/Mầm non/Quản lý thể thao (tổ hợp 2 môn + năng khiếu) chưa mô hình hoá. Trường không công bố tổ hợp môn riêng theo ngành — chấp nhận tổ hợp bất kỳ. Phương thức học bạ/SP2E/H-SCA chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(hpu2AdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission information',
      url: 'https://tuyensinh.hpu2.edu.vn/chi-tiet/tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Điểm chuẩn Trường Đại học Sư phạm Hà Nội 2 năm 2026',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-su-pham-ha-noi-2-nam-2026-119260810183816519.htm',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
