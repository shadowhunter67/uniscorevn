import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hubtKnowledgeGaps } from './knowledgeGaps';

export const hubtAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hubt-thpt-exam-2026',
    schoolId: 'hubt',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành đào tạo đại trà'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hubtKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT, ngành đại trà (TRỪ nhóm sức
   * khoẻ Y khoa/Dược/Răng-Hàm-Mặt/Điều dưỡng — điều kiện học lực + ngưỡng riêng, xem
   * `hubt-health-program-threshold-not-modeled`), scope không có điểm cộng (ĐC=0). Trích nguyên
   * văn `hubt.edu.vn/tuyen-sinh` (`evidence.ts:hubtThptExamExactFormulaEvidence`): ĐXT = tổng thô 3
   * môn + điểm ưu tiên (judgment call Điều 7 TT 06/2026, `priority.ts` — trường không công bố bảng
   * riêng); ngưỡng 15/30. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'hubt-thpt-exam-exact-2026',
    schoolId: 'hubt',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (ngành đại trà, không điểm cộng)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành đại trà HUBT (ngoài nhóm sức khoẻ), không có điểm cộng'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
