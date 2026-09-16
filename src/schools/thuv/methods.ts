import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { thuvKnowledgeGaps } from './knowledgeGaps';

export const thuvAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'thuv-thpt-exam-2026',
    schoolId: 'thuv',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 2)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thuvKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 2 (thi TN THPT), phạm vi thí sinh KHÔNG
   * có chứng chỉ JLPT (KK=0). Trích nguyên văn Quyết định 260306/001/QĐ-THUV mục 2.2: "ĐXT = Đ1 +
   * Đ2 + Đ3 + ƯT + KK". Điểm ưu tiên judgment call Điều 7 TT06/2026 (`priority.ts`). Điểm chuẩn
   * trúng tuyển 2026 (Thông báo 260809/001/TB-THUV) = 18,0/30, đồng nhất 4 ngành — so trực tiếp ĐXT
   * (đã gồm ưu tiên) với 18,0. Phạm vi tổ hợp: 6 tổ hợp chung cho cả 4 ngành, nằm trong taxonomy môn
   * học hiện có (A00/A01/A02/B00/B08/D07) — xem `knowledgeGaps.ts:thuv-combination-scope-not-full`.
   * KHÔNG gắn `knowledgeGaps` ở descriptor này (auditMethods coi exact + gaps là lỗi).
   */
  {
    id: 'thuv-thpt-exam-exact-2026',
    schoolId: 'thuv',
    name: 'Xét kết quả thi TN THPT (Phương thức 2) — Điểm xét tuyển (không chứng chỉ JLPT)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 4 ngành THUV, không có chứng chỉ JLPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
