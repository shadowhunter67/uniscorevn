import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hulKnowledgeGaps } from './knowledgeGaps';

export const hulAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hul-thpt-exam-2026',
    schoolId: 'hul',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hulKnowledgeGaps,
  },
  /**
   * Batch 2026-08-26 — đọc trực tiếp Thông tin tuyển sinh 2026 của Đại học Huế (PDF 77 trang,
   * `hul-hueuni-ttts-2026`): mục 2 (công thức, không hệ số cho tổ hợp Trường Đại học Luật), mục IV
   * (bảng tổ hợp 10 mã cho Luật/Luật Kinh tế), mục V.2 + Bảng 1 (điểm ưu tiên tự công bố đầy đủ)
   * đều verified → `exactCalculator: true` cho cả 2 ngành (ngưỡng 20/30 chung). KHÔNG gắn
   * `knowledgeGaps` (auditMethods() coi exactCalculator:true + knowledgeGaps non-empty là lỗi
   * EXACT_METHOD_HAS_UNRESOLVED_GAPS).
   */
  {
    id: 'hul-thpt-exam-exact-2026',
    schoolId: 'hul',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (điểm xét tuyển đầy đủ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Luật hoặc Luật Kinh tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
