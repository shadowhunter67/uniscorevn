import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huitAdmissionMethods } from './methods';

/**
 * Module HUIT (Trường Đại học Công Thương TP.HCM, mã trường DCT) — research 2026-08-21, browser
 * thật (chrome-devtools, đọc trực tiếp `ts.huit.edu.vn`). Ngưỡng đảm bảo chất lượng đầu vào theo
 * 2 nhóm ngành (Luật/Luật kinh tế: 20; các ngành còn lại: 16) cho Phương thức thi TN THPT, và
 * ngưỡng 20/20 cho Phương thức xét học tập THPT, đã verified từ 1 bài công bố chính thức. Chưa có
 * `Page` riêng (chỉ data/eligibility layer, như AGU/VLU) — chưa đủ scope dựng UI calculator khi
 * danh mục ngành, bảng ưu tiên/điểm cộng, và phương pháp tính điểm học bạ vẫn còn là knowledge gap
 * (xem `knowledgeGaps.ts`).
 */
export const huitModule: SchoolModule = {
  id: 'huit',
  name: 'Trường Đại học Công Thương TP.HCM',
  shortName: 'HUIT',
  about:
    'Trường đại học công lập trực thuộc Bộ Công Thương (mã trường DCT), đào tạo mạnh về công nghệ thực phẩm, công nghệ sinh học, công nghệ thông tin và kinh tế - quản trị.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Ngưỡng đảm bảo chất lượng đầu vào theo nhóm ngành (thi TN THPT: 16/20; học tập THPT: 20/20 — Luật/Luật kinh tế so với các ngành còn lại) đã xác minh từ 1 bài công bố chính thức trên ts.huit.edu.vn · Khi chọn ngành (39 ngành chính quy, bảng tổ hợp chính thức): kiểm tra ngưỡng thi TN THPT — Luật/Luật kinh tế ≥ 20 kèm Toán, Ngữ văn ≥ 6, ngành còn lại ≥ 16, tổng thô ≥ 15; đủ điều kiện khi tổng thô ≥ ngưỡng, không đủ khi cộng ưu tiên tối đa vẫn < ngưỡng, còn lại chưa kết luận (nguồn không nói ưu tiên tính trước hay sau ngưỡng). Chưa có điểm xét tuyển cuối, điểm chuẩn, phương thức học bạ/ĐGNL, chương trình liên kết quốc tế',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huitAdmissionMethods),
  },
};
