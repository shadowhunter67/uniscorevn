import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hvtaKnowledgeGaps } from './knowledgeGaps';

export const hvtaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hvta-thpt-exam-2026',
    schoolId: 'hvta',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (Mã phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, đã "Đạt sơ tuyển" tại Tòa án nhân dân/Học viện'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hvtaKnowledgeGaps,
  },
  /**
   * Nhánh HẸP kiểm tra ngưỡng điều kiện xét tuyển (ngành Luật duy nhất, thi TN THPT). Trích nguyên
   * văn `evidence.ts:hvtaThptExamThresholdEvidence`: ngưỡng thực tế 18,0/30 (max của 60% thang điểm
   * theo Chuẩn chương trình đào tạo Pháp luật QĐ678 và ngưỡng riêng 15,0/30 của HVTA) + điều kiện
   * môn Toán/Ngữ văn (môn nào có trong tổ hợp) ≥6/10. So RAW (nguồn không nói rõ đã gồm ưu tiên hay
   * chưa — judgment call, cùng tiền lệ TBDU/CTU); điểm ưu tiên chỉ hiển thị tham khảo. "Đủ điều kiện
   * xét tuyển" ⟺ đạt ngưỡng điểm, KHÔNG đảm bảo đã "Đạt sơ tuyển" (điều kiện hồ sơ riêng, xem
   * `hvta-pre-screening-not-modeled`). KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'hvta-thpt-exam-exact-2026',
    schoolId: 'hvta',
    name: 'Xét kết quả thi TN THPT (ngành Luật) — kiểm tra ngưỡng điều kiện xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào ngành Luật HVTA, đã "Đạt sơ tuyển"'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
