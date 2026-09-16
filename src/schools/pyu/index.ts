import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pyuAdmissionMethods } from './methods';

export const pyuModule: SchoolModule = {
  id: 'pyu',
  name: 'Trường Đại học Phú Yên',
  shortName: 'PYU',
  about: 'Trường đại học công lập tại Phú Yên, đào tạo khối ngành sư phạm và các ngành ngoài sư phạm.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 (đợt 1) của PYU qua Thông báo điểm trúng tuyển (Quyết định số 497/QĐ-ĐHPY, 10/8/2026): 10/11 ngành đại học chính quy, nhánh xét kết quả thi TN THPT — Điểm xét = tổng 3 môn + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). Giáo dục Mầm non (tổ hợp năng khiếu M03/M09) chưa mô hình hoá. Phương thức học bạ và ĐGNL ĐHQG TP.HCM (cùng công bố trong Thông báo) chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(pyuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Phú Yên - Cổng thông tin tuyển sinh',
      url: 'https://tuyensinh.pyu.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Thông báo điểm trúng tuyển Đại học hệ chính quy năm 2026 (đợt 1) — Quyết định số 497/QĐ-ĐHPY',
      url: 'https://tuyensinh.pyu.edu.vn/tuyen-sinh/tin-tuc/diem-trung-tuyen-dai-hoc-chinh-quy-n-m-2026-dot-1',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
