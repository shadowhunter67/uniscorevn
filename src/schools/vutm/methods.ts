import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vutmKnowledgeGaps } from './knowledgeGaps';

/**
 * VUTM (Học viện Y Dược học cổ truyền Việt Nam, mã trường HYD) 2026 — 1 phương thức exact:
 * - `vutm-thpt-exam-exact-2026`: xét kết quả thi tốt nghiệp THPT 2026. Điểm xét tuyển = tổng điểm
 *   3 môn theo tổ hợp (thang 10/môn) + điểm cộng + điểm ưu tiên, làm tròn 2 chữ số thập phân.
 *   Điểm chuẩn CHÍNH THỨC cho cả 3/3 ngành (22,00-24,50/30, Thông báo 3036/TB-HVYDCT 10/8/2026).
 */
export const vutmAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vutm-thpt-exam-exact-2026',
    schoolId: 'vutm',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh dự thi kỳ thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: vutmKnowledgeGaps,
  },
];
