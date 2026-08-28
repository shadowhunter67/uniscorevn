import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fptuKnowledgeGaps } from './knowledgeGaps';

export const fptuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fptu-thpt-exam-2026',
    schoolId: 'fptu',
    name: 'Xét tuyển kết hợp điểm thi tốt nghiệp THPT và học bạ lớp 12 năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, mọi cơ sở đào tạo FPTU trên toàn quốc'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fptuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm sàn (exact), áp dụng mọi ngành/mọi cơ sở đào tạo FPTU. Trích nguyên văn
   * trang chính thức (`evidence.ts:fptuThptExamExactThresholdEvidence`): điểm sàn xét tuyển là
   * tổng điểm 3 môn thi TN THPT (tổ hợp Axx/Cxx) >= 15,0/30, nguồn TỰ PHÂN BIỆT đây là "điều kiện
   * tổ hợp thô, KHÔNG phải điểm xét tuyển cuối cùng (ĐXT)" — nên so trực tiếp tổng thô, không cần
   * judgment call ưu tiên/điểm cộng (khác ĐXT thật, vẫn ngoài scope vì công thức ĐKH còn mơ hồ, xem
   * `fptu-final-admission-score-formula-ambiguous`). KHÔNG gắn `knowledgeGaps` cho nhánh này.
   */
  {
    id: 'fptu-thpt-exam-exact-2026',
    schoolId: 'fptu',
    name: 'Xét kết quả thi TN THPT — Điểm sàn (điều kiện tổ hợp thô, mọi ngành/cơ sở)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026 xét vào FPTU bằng tổ hợp Axx/Cxx, mọi ngành/cơ sở'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
