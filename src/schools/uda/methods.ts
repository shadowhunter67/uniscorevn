import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { udaKnowledgeGaps } from './knowledgeGaps';

export const udaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uda-thpt-exam-2026',
    schoolId: 'uda',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành thường)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: udaKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT, nhóm ngành thường (TRỪ khối Sức
   * khỏe và Pháp luật — ngưỡng riêng cao hơn, xem `uda-health-law-thresholds-not-modeled`). Trích
   * nguyên văn trang chính thức (`evidence.ts:udaThptExamExactThresholdEvidence`): "điểm sàn xét
   * tuyển là tổng điểm thi 3 môn tốt nghiệp THPT đạt ≥ 15 điểm, KHÔNG BAO GỒM điểm ưu tiên và điểm
   * cộng" — trường hợp HIẾM khi nguồn tự loại trừ hẳn ưu tiên/cộng khỏi điều kiện đạt, nên so
   * TỔNG THÔ trực tiếp, không cần judgment call cho phần so ngưỡng. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'uda-thpt-exam-exact-2026',
    schoolId: 'uda',
    name: 'Xét kết quả thi TN THPT — Điểm sàn (nhóm ngành thường, trừ Sức khỏe/Pháp luật)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành UDA thuộc nhóm ngành thường (ngoài Sức khỏe và Pháp luật)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
