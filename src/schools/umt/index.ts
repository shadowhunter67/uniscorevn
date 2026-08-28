import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { umtAdmissionMethods } from './methods';

export const umtModule: SchoolModule = {
  id: 'umt',
  name: 'Trường Đại học Quản lý và Công nghệ TP.HCM',
  shortName: 'UMT',
  about: 'Trường đại học tư thục tại TP.HCM, đào tạo các ngành công nghệ thông tin, quản trị, kinh doanh.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển UMT 2026 (PT01 — thi TN THPT, thí sinh không điểm cộng thành tích): ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026) — trích nguyên văn Thông báo 57/2026/TB-UMT mục 1 ("Điểm ngưỡng ĐBCLĐV = Điểm quy đổi thang 30 + Điểm cộng nếu có + Điểm ưu tiên nếu có"); đủ điều kiện xét tuyển khi ĐXT ≥ 15,0/30, đồng nhất cả 10 ngành đào tạo. Phương thức học bạ (PT02, 18/30), ĐGNL (PT03), V-SAT (PT04) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(umtAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 57/2026/TB-UMT về điểm ngưỡng đảm bảo chất lượng đầu vào 2026',
      url: 'https://umt.edu.vn/tin-tuc/truong-dai-hoc-umt-cong-bo-muc-diem-nhan-ho-so-xet-tuyen-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
