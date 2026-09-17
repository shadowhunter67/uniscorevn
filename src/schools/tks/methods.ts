import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tksKnowledgeGaps } from './knowledgeGaps';

export const tksAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tks-thpt-exam-2026',
    schoolId: 'tks',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, đã "Đạt sơ tuyển" nếu đăng ký ngành Kiểm sát'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tksKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phạm vi ngành Luật/Luật kinh tế/Ngôn ngữ Anh (KHÔNG bao
   * gồm chuyên ngành Kiểm sát — cutoff riêng theo giới tính). ĐXT quy về D01 = tổng thô tổ hợp đã
   * chọn + độ lệch tổ hợp (Phụ lục II) + điểm ưu tiên (judgment call Điều 7 TT06/2026) — điểm
   * chuẩn công bố "đã bao gồm điểm ưu tiên" nên so ĐXT (không so RAW). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'tks-thpt-exam-exact-2026',
    schoolId: 'tks',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (Luật/Luật kinh tế/Ngôn ngữ Anh)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào ngành Luật, Luật kinh tế hoặc Ngôn ngữ Anh của TKS'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
