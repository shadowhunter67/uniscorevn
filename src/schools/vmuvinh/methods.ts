import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vmuvinhKnowledgeGaps } from './knowledgeGaps';

/**
 * VMU-Vinh (Trường Đại học Y khoa Vinh, mã trường YKV) 2026 — 1 phương thức exact:
 * - `vmuvinh-thpt-exam-exact-2026`: Phương thức 100, xét kết quả kỳ thi TN THPT 2026.
 *   Điểm xét tuyển = tổng điểm 3 môn theo tổ hợp + điểm ưu tiên + điểm cộng, tối đa 30, các môn có
 *   trọng số ngang nhau. Điểm trúng tuyển CHÍNH THỨC đợt 1 cho cả 5/5 chương trình đại học chính
 *   quy (18,00-23,50/30, Thông báo 809/TB-ĐHYKV ngày 10/8/2026).
 */
export const vmuvinhAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vmuvinh-thpt-exam-exact-2026',
    schoolId: 'vmuvinh',
    name: 'Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh đã tốt nghiệp THPT và có điểm thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: vmuvinhKnowledgeGaps,
  },
];
