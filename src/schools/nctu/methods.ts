import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { nctuKnowledgeGaps } from './knowledgeGaps';

export const nctuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'nctu-thpt-exam-2026',
    schoolId: 'nctu',
    name: 'Xet tuyen theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thi sinh su dung điểm thi tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: nctuKnowledgeGaps,
  },
  /**
   * Batch 2026-08-26 — bài hướng dẫn chính sách ưu tiên tự đăng trên tuyensinh.nctu.edu.vn
   * (`nctu-priority-guide-2026`) xác nhận trực tiếp bảng ưu tiên đầy đủ + "không nhân hệ số" cho
   * công thức điểm 3 môn → `exactCalculator: true` cho nhóm ngành ngoài Sức khỏe/Luật (ngưỡng
   * 15/30 chung, `name` đã nêu rõ phạm vi). KHÔNG gắn `knowledgeGaps` (auditMethods() coi
   * exactCalculator:true + knowledgeGaps non-empty là lỗi EXACT_METHOD_HAS_UNRESOLVED_GAPS).
   */
  {
    id: 'nctu-thpt-exam-standard-2026',
    schoolId: 'nctu',
    name: 'Xet tuyen theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoai Sức khỏe/Luật)',
    year: 2026,
    applicantTypes: ['Thi sinh tốt nghiệp THPT 2026, nhóm ngành ngoai Sức khỏe/Luật'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
