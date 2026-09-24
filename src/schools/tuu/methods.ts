import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tuuKnowledgeGaps } from './knowledgeGaps';

export const tuuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tuu-thpt-exam-2026',
    schoolId: 'tuu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (mã phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tuuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính Điểm xét tuyển (exact), 21/25 ngành (điểm chuẩn thật, ảnh thông báo chính chủ
   * chữ ký + con dấu). Loại 4 ngành có điều kiện phụ (Luật/Luật kinh tế/Ngôn ngữ Anh/QTKD-IPOP).
   * Điểm ưu tiên dùng judgment call khung quốc gia (xem `priority.ts`). KHÔNG gắn `knowledgeGaps`
   * ở descriptor này.
   */
  {
    id: 'tuu-thpt-exam-exact-2026',
    schoolId: 'tuu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo ngành (mã 100)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào 1 trong 21 ngành TUU (loại Luật/Luật kinh tế/Ngôn ngữ Anh/QTKD-IPOP)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
