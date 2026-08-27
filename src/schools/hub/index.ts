import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hubAdmissionMethods } from './methods';

/**
 * Module HUB (Trường Đại học Ngân hàng TP. Hồ Chí Minh, mã trường NHS) — research 2026-08-21,
 * đọc trực tiếp thông báo chính thức `tuyensinh.hub.edu.vn` (xem `sources.ts`). Ngưỡng đảm bảo
 * chất lượng đầu vào theo nhóm ngành cho cả 3 phương thức (thi TN THPT/Tổng hợp/V-SAT: 15/30
 * chung, 20/30 khối Luật kèm điều kiện môn, IELTS≥5.5 riêng Elite Class) đã verified từ 1 thông
 * báo chính thức đọc trực tiếp qua browser thật. Chưa có `Page` riêng (chỉ data/eligibility
 * layer, như VLU/AGU) — quy đổi điểm trúng tuyển tương đương giữa các phương thức/tổ hợp (Phụ
 * lục I/II) vẫn là knowledge gap (xem `knowledgeGaps.ts`).
 */
export const hubModule: SchoolModule = {
  id: 'hub',
  name: 'Trường Đại học Ngân hàng TP. Hồ Chí Minh',
  shortName: 'HUB',
  about: 'Trường đại học công lập trực thuộc Ngân hàng Nhà nước Việt Nam, đào tạo mạnh về tài chính - ngân hàng, kinh tế và luật kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HUB 2026 — Phương thức 1 (thi TN THPT), khối Luật (Luật/Luật kinh tế/Luật kinh tế TA bán phần), thí sinh khu vực 3: ĐXT = tổng thô 3 môn + điểm ưu tiên (Điều 7 Thông tư 06/2026, công thức giảm ≥ 22,5), so với ngưỡng 20/30 + điều kiện Toán ≥ 6 (và Ngữ văn ≥ 6 nếu tổ hợp có Văn) — công thức và ngưỡng trích nguyên văn thông báo chính thức 11/07/2026. Các nhóm/phương thức khác (ngưỡng 15/30 chung, Elite Class IELTS ≥ 5.5, Tổng hợp/V-SAT, ngưỡng khối Luật cho khu vực khác) và bảng quy đổi Phụ lục I/II vẫn chỉ kiểm tra điều kiện.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hubAdmissionMethods),
  },
};
