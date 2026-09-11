import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hmtuKnowledgeGaps } from './knowledgeGaps';

/**
 * HMTU (Trường Đại học Kỹ thuật Y tế Hải Dương) 2026 — 1 phương thức exact:
 * - `hmtu-thpt-exam-exact-2026`: Phương thức 2, xét kết quả điểm thi tốt nghiệp THPT năm 2026.
 *   Điểm xét tuyển = (2 × Toán + môn 2 + môn 3) × 3/4 + ƯT + KK, trần 30 — có hệ số nên
 *   `scoreConversion: true`. Điểm trúng tuyển CHÍNH THỨC cho cả 5/5 ngành (22,50-25,00/30,
 *   Thông báo 706/TB-ĐHKTYTHD ngày 10/8/2026).
 */
export const hmtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hmtu-thpt-exam-exact-2026',
    schoolId: 'hmtu',
    name: 'Xét tuyển căn cứ vào kết quả điểm thi tốt nghiệp THPT năm 2026 (Phương thức 2)',
    year: 2026,
    applicantTypes: ['Thí sinh tham gia kỳ thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: hmtuKnowledgeGaps,
  },
];
