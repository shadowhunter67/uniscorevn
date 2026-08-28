import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { sguKnowledgeGaps } from './knowledgeGaps';

export const sguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'sgu-thpt-exam-2026',
    schoolId: 'sgu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: sguKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức THPT, phạm vi 29 mã xét tuyển KHÔNG
   * thuộc nhóm đào tạo giáo viên và KHÔNG phải ngành Luật (xem `thresholds.ts:SGU_EXACT_EXCLUDED_PROGRAM_CODES`
   * — 2 nhóm này có điều kiện phụ ngoài phạm vi), và tổ hợp môn KHÔNG hệ số/quy đổi chứng chỉ
   * (mục 4.1: DTHXT = tổng thô khi w1=w2=w3=1). Trích nguyên văn Thông báo 1098/TB-HĐTS
   * (`evidence.ts:sguThptExamExactFormulaEvidence`): ngưỡng đạt ⟺ tổng thô + ưu tiên ≥ ngưỡng
   * ngành (mục 2.1.a, KHÔNG cộng điểm cộng ĐC); ĐXT = tổng thô + ĐƯT (mục 4.5, scope ĐC=0 — thí
   * sinh không có điểm cộng khuyến khích/thưởng). Điểm ưu tiên trích Điều 7 Quy chế tuyển sinh
   * (`priority.ts`) — quy định quốc gia, KHÔNG phải judgment call riêng SGU. KHÔNG gắn
   * `knowledgeGaps`.
   */
  {
    id: 'sgu-thpt-exam-exact-2026',
    schoolId: 'sgu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (ngành ngoài sư phạm/Luật, tổ hợp không hệ số, không điểm cộng)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành SGU ngoài nhóm đào tạo giáo viên và ngành Luật, không có điểm cộng khuyến khích/thưởng'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
