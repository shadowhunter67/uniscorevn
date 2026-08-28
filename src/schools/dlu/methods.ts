import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dluKnowledgeGaps } from './knowledgeGaps';

export const dluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dlu-thpt-exam-2026',
    schoolId: 'dlu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dluKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Bảng điểm sàn 41 mã ngành
   * trích nguyên văn Thông báo 1145/TB-ĐHĐL (`sources.ts:dlu-threshold-notice-2026`). Ngưỡng ĐÃ
   * GỒM điểm ưu tiên (ghi chú cuối bảng) ⇒ ĐXT = tổng thô 3 môn (không hệ số, không phân biệt tổ
   * hợp) + điểm ưu tiên (Điều 7 TT 06/2026, judgment call — `priority.ts`), so trực tiếp với
   * ngưỡng ngành. Điều kiện phụ: Ngôn ngữ Anh/Sư phạm Tiếng Anh (Anh ≥6,0), Kỹ thuật hạt nhân
   * (Toán và Lý mỗi môn ≥6,5). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'dlu-thpt-exam-exact-2026',
    schoolId: 'dlu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo mã ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 41 mã ngành DLU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
