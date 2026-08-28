import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dainamKnowledgeGaps } from './knowledgeGaps';

export const dainamAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dainam-thpt-exam-2026',
    schoolId: 'dainam',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành đào tạo đại trà'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dainamKnowledgeGaps,
  },
  /**
   * Nhánh exact — thông báo chính thức tuyensinh.dainam.edu.vn xác nhận đầy đủ: ngưỡng đảm bảo
   * chất lượng đầu vào 15,0/30 cho phương thức thi TN THPT (ngành ngoài Sức khoẻ/Pháp luật), TUYÊN
   * BỐ TRỰC TIẾP rằng ngưỡng này KHÔNG bao gồm điểm cộng/điểm ưu tiên khu vực-đối tượng — nên
   * `priority: false` (không phải chưa xử lý, mà là nguồn xác nhận không áp dụng cho so sánh này).
   */
  {
    id: 'dainam-thpt-exam-exact-2026',
    schoolId: 'dainam',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào (ngành đại trà)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành ngoài lĩnh vực Sức khoẻ và Pháp luật'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
