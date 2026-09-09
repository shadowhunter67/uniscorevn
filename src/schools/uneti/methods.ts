import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { unetiKnowledgeGaps } from './knowledgeGaps';

/**
 * UNETI (Trường Đại học Kinh tế - Kỹ thuật Công nghiệp, mã trường DKK) 2026 — 1 phương thức exact:
 * - `uneti-thpt-exam-exact-2026`: Phương thức 2, xét kết quả kỳ thi TN THPT 2026.
 *   ĐXT = (M1 x 4,5 + M2 x 3,5 + M3 x 2) x 3/10 + KK + UT (trần 30) — có HỆ SỐ THEO VỊ TRÍ MÔN,
 *   nên `scoreConversion: true`. Điểm trúng tuyển CHÍNH THỨC theo từng mã xét tuyển và từng cơ sở
 *   (Thông báo 826/TB-ĐHKTKTCN, 09/8/2026): 27 mã Hà Nội (20,00-24,50/30) + 22 mã Ninh Bình
 *   (19,00-21,00/30).
 */
export const unetiAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uneti-thpt-exam-exact-2026',
    schoolId: 'uneti',
    name: 'Xét kết quả kỳ thi tốt nghiệp THPT năm 2026 (Phương thức 2)',
    year: 2026,
    applicantTypes: ['Thí sinh dự thi kỳ thi tốt nghiệp THPT năm 2026 và đăng ký sử dụng kết quả để xét tuyển đại học'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: unetiKnowledgeGaps,
  },
];
