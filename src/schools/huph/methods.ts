import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huphKnowledgeGaps } from './knowledgeGaps';

/**
 * HUPH (Trường Đại học Y tế công cộng, mã trường YTC) 2026 — 1 phương thức exact:
 * - `huph-thpt-exam-exact-2026`: xét kết quả thi tốt nghiệp THPT năm 2026 (trường gọi là "phương
 *   thức gốc"). ĐXT = [M1 + M2 + M3 + điểm khuyến khích] (trần 30) + điểm ưu tiên. Điểm trúng
 *   tuyển đợt 1 CHÍNH THỨC cho cả 6/6 ngành (18,80-22,90/30, Thông báo 743/TB-ĐHYTCC 09/8/2026).
 */
export const huphAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huph-thpt-exam-exact-2026',
    schoolId: 'huph',
    name: 'Xét tuyển dựa trên kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh dự thi kỳ thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: huphKnowledgeGaps,
  },
];
