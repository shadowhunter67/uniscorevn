import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ulsaKnowledgeGaps } from './knowledgeGaps';

/**
 * ULSA (Trường Đại học Lao động - Xã hội) 2026 — 1 phương thức exact:
 * - `ulsa-thpt-exam-exact-2026`: Phương thức 100 (PT gốc), xét kết quả thi TN THPT 2026.
 *   Điểm xét tuyển = tổng 3 môn theo tổ hợp + điểm ưu tiên (thang 30, không hệ số). Điểm trúng
 *   tuyển CHÍNH THỨC theo từng chương trình đào tạo và từng địa điểm đào tạo (Thông báo
 *   2752/TB-HĐTSĐH2026, 11/8/2026): 28 chương trình Hà Nội (DLX, 16,50-24,78/30) + 14 chương
 *   trình Cơ sở II TP.HCM (DLS, 16,00-25,05/30).
 */
export const ulsaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ulsa-thpt-exam-exact-2026',
    schoolId: 'ulsa',
    name: 'Xét kết quả kỳ thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh có kết quả kỳ thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: ulsaKnowledgeGaps,
  },
];
