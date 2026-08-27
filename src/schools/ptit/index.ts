import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ptitAdmissionMethods } from './methods';

export const ptitModule: SchoolModule = {
  id: 'ptit',
  name: 'Học viện Công nghệ Bưu chính Viễn thông',
  shortName: 'PTIT',
  about: 'Học viện công lập đào tạo viễn thông, công nghệ thông tin, kinh tế số, truyền thông và quản trị.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển PTIT 2026 cho Phương thức 5 (xét thi TN THPT): ĐXT = tổng thô 3 môn + điểm cộng (bảng IELTS + điểm thành tích) + điểm ưu tiên (Điều 7 Thông tư 06/2026, công thức giảm ≥ 22,5), so với ngưỡng đảm bảo chất lượng đầu vào theo cơ sở đào tạo (BVH 20,00 / BVS 16,50) — công thức và bảng điểm cộng trích nguyên văn TB493, ngưỡng từ thông báo ĐBCL 06/07/2026. Phương thức ĐGNL/ĐGTD có ngưỡng chính thức (V-ACT ≥600, HSA ≥75, TSA ≥50, SPT ≥15) nhưng điểm xét cuối còn bị chặn bởi quy đổi tương đương; chương trình thạc sĩ tài năng / Vi mạch bán dẫn chưa công bố ngưỡng.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ptitAdmissionMethods),
  },
};

