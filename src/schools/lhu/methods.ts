import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { lhuKnowledgeGaps } from './knowledgeGaps';

export const lhuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'lhu-thpt-exam-2026',
    schoolId: 'lhu',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (không gồm Dược/Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: lhuKnowledgeGaps,
  },
  /**
   * Nhánh exact — thông báo chính thức lhu.edu.vn (đọc trực tiếp qua curl 2026-08-30) công bố
   * NGUYÊN VĂN "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm" cho mọi ngành trừ Dược/Luật/Luật
   * kinh tế (ngưỡng riêng theo Bộ GD&ĐT, chưa mô hình hoá). Nguồn im lặng về điểm ưu tiên khu
   * vực/đối tượng => áp judgment call chuẩn quốc gia (`priority.ts`) — `priority: true` phản ánh
   * đúng đây là judgment call, không phải trường tự công bố bảng.
   */
  {
    id: 'lhu-thpt-exam-exact-2026',
    schoolId: 'lhu',
    name: 'Xét điểm thi TN THPT — Điểm xét tuyển (ngành đại trà, trừ Dược/Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành ngoài Dược, Luật và Luật kinh tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
