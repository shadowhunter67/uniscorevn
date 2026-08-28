import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hcmueAdmissionMethods } from './methods';

/**
 * Metadata NHẸ — KHÔNG import `HcmuePage` (xem `hcmut/meta.ts` cho rationale đầy đủ về tách
 * meta/Page phục vụ code splitting). `index.ts` compose `{ ...hcmueMeta, Page: HcmuePage }`.
 */
export const hcmueMeta: Omit<SchoolModule, 'Page'> = {
  id: 'hcmue',
  name: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh (HCMUE, TPHCM)',
  shortName: 'HCMUE',
  about:
    'Đại học công lập thành lập năm 1976, một trong hai trường sư phạm trọng điểm của cả nước, đào tạo giáo viên và khoa học giáo dục.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh phương thức và ngưỡng đầu vào 47 ngành tại trụ sở chính TP.HCM năm 2026 — nhánh exact tính tổng điểm thô 3 môn thi TN THPT so với ngưỡng từng ngành (nguồn im lặng về việc gồm ưu tiên nên so tổng thô, điểm ưu tiên Điều 7 TT 06/2026 chỉ hiển thị ĐXT tham khảo). 15 ngành 2 phân hiệu Long An/Gia Lai chưa có ngưỡng công bố riêng, ngoài phạm vi nhánh exact. Runtime chưa tính điểm trúng tuyển (cutoff) chính thức.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hcmueAdmissionMethods),
  },
};
