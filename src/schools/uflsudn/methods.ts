import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uflsudnKnowledgeGaps } from './knowledgeGaps';

export const uflsudnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uflsudn-thpt-exam-2026',
    schoolId: 'uflsudn',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uflsudnKnowledgeGaps,
  },
  /**
   * Nhánh exact — CHỈ 4 ngành đào tạo giáo viên ngoại ngữ (Sư phạm tiếng Anh/Pháp/Trung Quốc/Hàn
   * Quốc). Ảnh "Ngưỡng đầu vào..." (đọc qua vision) xác nhận ngưỡng 4 ngành này = tổng điểm 3 môn
   * thi TN THPT (KHÔNG cần học bạ) + điểm ưu tiên khu vực/đối tượng ≥ 20,00/30. Các ngành cử nhân
   * còn lại cần điểm học bạ (ngoài phạm vi batch này, xem knowledgeGaps).
   */
  {
    id: 'uflsudn-teacher-training-exact-2026',
    schoolId: 'uflsudn',
    name: 'Xét kết quả thi TN THPT — 4 ngành đào tạo giáo viên ngoại ngữ',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Sư phạm tiếng Anh/Pháp/Trung Quốc/Hàn Quốc'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
