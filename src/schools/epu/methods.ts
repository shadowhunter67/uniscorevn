import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { epuKnowledgeGaps } from './knowledgeGaps';

/**
 * EPU (Trường Đại học Điện lực, mã trường DDL) 2026 — 1 phương thức exact:
 * - `epu-thpt-exam-exact-2026`: Phương thức 3, xét kết quả thi TN THPT 2026. Điểm xét tuyển =
 *   tổng điểm 3 môn theo tổ hợp + điểm ưu tiên (Thông báo 466/TB-ĐHĐL mục II.2.3). Điểm trúng
 *   tuyển CHÍNH THỨC theo NGÀNH (38/38 mã xét tuyển, 16,00–24,60/30) từ Thông báo 3020/TB-ĐHĐL
 *   ngày 09/8/2026.
 */
export const epuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'epu-thpt-exam-exact-2026',
    schoolId: 'epu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 3)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo điểm thi TN THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: epuKnowledgeGaps,
  },
];
