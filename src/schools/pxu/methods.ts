import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { pxuKnowledgeGaps } from './knowledgeGaps';

/**
 * PXU (Trường Đại học Phú Xuân) 2026 — 2 phương thức exact:
 * - `pxu-thpt-exam-exact-2026`: PT1, xét điểm thi TN THPT. Điểm xét = (T1+T2+T3) + điểm ưu tiên
 *   (điểm cộng CHƯA modeled, xem `knowledgeGaps.ts`). Ngưỡng trúng tuyển CHÍNH THỨC 16/8/2026 =
 *   15,00/30, đồng nhất 9/9 ngành.
 * - `pxu-transcript-exact-2026`: PT2, xét học bạ THPT (kết hợp phỏng vấn — không mô phỏng được
 *   phần phỏng vấn). Điểm xét = (H1+H2+H3, TB cả năm lớp 10/11/12 mỗi môn) + điểm ưu tiên. Ngưỡng
 *   trúng tuyển CHÍNH THỨC 16/8/2026 = 18,00/30, đồng nhất 9/9 ngành.
 */
export const pxuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pxu-thpt-exam-exact-2026',
    schoolId: 'pxu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo điểm thi TN THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: pxuKnowledgeGaps,
  },
  {
    id: 'pxu-transcript-exact-2026',
    schoolId: 'pxu',
    name: 'Xét kết quả học tập bậc THPT — học bạ (Phương thức 2)',
    year: 2026,
    applicantTypes: ['Thí sinh xét học bạ THPT (TB cả năm lớp 10, 11, 12)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: pxuKnowledgeGaps,
  },
];
