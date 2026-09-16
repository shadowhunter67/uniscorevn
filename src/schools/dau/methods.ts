import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dauKnowledgeGaps } from './knowledgeGaps';

export const dauAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dau-thpt-exam-2026',
    schoolId: 'dau',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dauKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT THUẦN (không kết hợp năng khiếu).
   * Trích nguyên văn `evidence.ts`: ngưỡng 15/30, ghi RÕ "KHÔNG BAO GỒM điểm ưu tiên" → so TỔNG
   * THÔ. Điểm ưu tiên chỉ hiển thị tham khảo. LƯU Ý: điểm chuẩn trúng tuyển thật cao hơn (16,5-18),
   * xem `dau-real-cutoff-higher-than-floor`. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'dau-thpt-exam-exact-2026',
    schoolId: 'dau',
    name: 'Xét kết quả thi TN THPT (thuần) — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào DAU, không kết hợp điểm thi năng khiếu'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
