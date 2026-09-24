import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huflKnowledgeGaps } from './knowledgeGaps';

export const huflAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hufl-thpt-exam-2026',
    schoolId: 'hufl',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huflKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính Điểm xét tuyển (exact), đủ 13/13 ngành (điểm chuẩn thật, ảnh infographic chính
   * chủ). Chỉ tổ hợp dùng môn đã có trong `SubjectId` (D01/D14/D15/C00/X78) — KHÔNG mô hình hoá điểm
   * cộng thành tích (app chưa thu thập input này). KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'hufl-thpt-exam-exact-2026',
    schoolId: 'hufl',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo ngành (Phương thức 1)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào 1 trong 13 ngành HUFL, dùng tổ hợp D01/D14/D15/C00/X78'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
