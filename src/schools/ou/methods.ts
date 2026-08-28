import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ouKnowledgeGaps } from './knowledgeGaps';

export const ouAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ou-thpt-exam-2026',
    schoolId: 'ou',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ouKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm sàn (exact), phương thức thi TN THPT, phạm vi 37 mã "chương trình
   * chuẩn" KHÔNG hậu tố (loại Luật/Luật kinh tế — điều kiện Toán/Văn≥60%; Ngôn ngữ Anh — điều kiện
   * Tiếng Anh≥60%; "C" Tiên tiến/"D" Phân hiệu Đồng Nai/CTLK quốc tế — biến thể riêng ngoài phạm
   * vi). Trích nguyên văn Phụ lục (`evidence.ts:ouThptExamExactThresholdEvidence`): tổng điểm 3
   * môn KHÔNG nhân hệ số, KHÔNG cộng điểm cộng/ưu tiên — so TỔNG THÔ trực tiếp, không cần judgment
   * call. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'ou-thpt-exam-exact-2026',
    schoolId: 'ou',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đầu vào (chương trình chuẩn)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một chương trình chuẩn OU (ngoài Luật/Luật kinh tế, Ngôn ngữ Anh, Tiên tiến, Phân hiệu Đồng Nai, CTLK quốc tế)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
