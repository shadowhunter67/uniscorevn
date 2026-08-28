import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { pntuKnowledgeGaps } from './knowledgeGaps';

export const pntuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pntu-thpt-exam-2026',
    schoolId: 'pntu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (mã phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: pntuKnowledgeGaps,
  },
  /**
   * Nhánh exact — toàn bộ 14 ngành đã xác nhận (`thresholds.ts`), điểm ưu tiên KV/ĐT cộng vào tổng
   * thô trước khi so ngưỡng (Quyết định 671/QĐ-TĐHYKPNT mục 6 xác nhận rõ). Trường không áp dụng
   * điểm cộng/điểm thưởng năm 2026 (mục 5.2, xác nhận chính thức — không phải thiếu dữ liệu).
   */
  {
    id: 'pntu-thpt-exam-exact-2026',
    schoolId: 'pntu',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào (14 ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào PNTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
