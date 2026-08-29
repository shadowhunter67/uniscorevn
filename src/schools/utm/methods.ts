import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { utmKnowledgeGaps } from './knowledgeGaps';

export const utmAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'utm-thpt-exam-2026',
    schoolId: 'utm',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (không gồm Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: utmKnowledgeGaps,
  },
  /**
   * Nhánh exact — thông báo chính thức utm.edu.vn (đọc trực tiếp qua curl 2026-08-29) công bố
   * NGUYÊN VĂN ngưỡng 15/30 cho "các ngành đào tạo" (phương thức thi TN THPT), trừ Luật/Luật kinh
   * tế (ngưỡng riêng theo Bộ GD&ĐT, chưa mô hình hoá). Nguồn im lặng về điểm ưu tiên khu vực/đối
   * tượng => áp judgment call chuẩn quốc gia (`priority.ts`) — `priority: true` phản ánh đúng đây
   * là judgment call, không phải trường tự công bố bảng.
   */
  {
    id: 'utm-thpt-exam-exact-2026',
    schoolId: 'utm',
    name: 'Xét điểm thi TN THPT — Điểm xét tuyển (ngành đại trà, trừ Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành ngoài Luật và Luật kinh tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
