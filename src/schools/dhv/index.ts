import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dhvAdmissionMethods } from './methods';

export const dhvModule: SchoolModule = {
  id: 'dhv',
  name: 'Trường Đại học Hùng Vương TP.HCM',
  shortName: 'DHV',
  about: 'Trường đại học tư thục tại TP.HCM, tuyển sinh 23 mã xét tuyển năm 2026.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh điểm chuẩn trúng tuyển chính thức 2026 (đợt 1) của DHV qua ảnh công bố CHÍNH CHỦ trên dhv.edu.vn (09/8/2026, đối chiếu 2 báo nhà nước độc lập): 23/23 mã xét tuyển, nhánh xét kết quả thi TN THPT — Điểm xét = tổng 3 môn + điểm ưu tiên KV/ĐT (khung quốc gia hiện hành). Tâm lý học/Luật/Luật kinh tế 20/30, 20 mã còn lại 15/30. Trường không công bố tổ hợp môn riêng theo mã — chấp nhận tổ hợp bất kỳ. Phương thức học bạ và ĐGNL ĐHQG-HCM chưa được mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: true,
    ...aggregateSchoolCapabilities(dhvAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trang tuyển sinh Trường Đại học Hùng Vương TP.HCM',
      url: 'https://tuyensinh.dhv.edu.vn/',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Trường Đại học Hùng Vương TP. Hồ Chí Minh công bố điểm chuẩn trúng tuyển Đại học chính quy 2026',
      url: 'https://dhv.edu.vn/truong-dai-hoc-hung-vuong-tp-ho-chi-minh-cong-bo-diem-trung-tuyen-dai-hoc-he-chinh-quy-dot-1-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-16',
    },
  ],
};
