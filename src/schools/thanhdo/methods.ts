import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { thanhdoKnowledgeGaps } from './knowledgeGaps';

export const thanhdoAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'thanhdo-thpt-exam-2026',
    schoolId: 'thanhdo',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thanhdoKnowledgeGaps,
  },
  /**
   * Nhánh exact — trang chính thức thanhdo.edu.vn xác nhận đầy đủ: công thức điểm trúng tuyển
   * (tổng 3 môn, không nhân hệ số, không tính điểm cộng) và bảng ngưỡng theo 14/14 ngành (6 mức
   * 16,0-20,0/30). Điểm ưu tiên KV/ĐT dùng chuẩn toàn quốc (judgment call, xem `priority.ts`).
   */
  {
    id: 'thanhdo-thpt-exam-exact-2026',
    schoolId: 'thanhdo',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển đầy đủ theo ngành',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
