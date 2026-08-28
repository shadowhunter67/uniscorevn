import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vwaKnowledgeGaps } from './knowledgeGaps';

export const vwaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vwa-thpt-exam-2026',
    schoolId: 'vwa',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vwaKnowledgeGaps,
  },
  {
    id: 'vwa-transcript-2026',
    schoolId: 'vwa',
    name: 'Xét tuyển học bạ THPT (điểm trung bình 6 học kỳ) năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vwaKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Bảng ngưỡng 15 mã xét
   * tuyển (17 mã có số, trừ 2 mã CLC cần chứng chỉ ngoại ngữ không model) trích nguyên văn Thông
   * báo 96/TB-HVPNVN (`sources.ts:vwa-quality-threshold-2026`). ĐXT = tổng thô 3 môn + điểm ưu
   * tiên (Điều 7 TT 06/2026, judgment call — thông báo không in công thức/bảng ưu tiên tường
   * minh, `priority.ts`). CNTT/Thiết kế và phát triển Game: thêm điều kiện Toán THPT ≥ 6,0.
   * Ngoài phạm vi: Luật/Luật Kinh tế (chưa có số), QTKD CLC/Kinh tế CLC (điều kiện chứng chỉ
   * ngoại ngữ không model). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'vwa-thpt-exam-exact-2026',
    schoolId: 'vwa',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo mã xét tuyển (trừ Luật, chương trình Chất lượng cao)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 15 mã xét tuyển VWA'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
