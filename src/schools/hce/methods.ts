import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hceKnowledgeGaps } from './knowledgeGaps';

export const hceAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hce-thpt-exam-2026',
    schoolId: 'hce',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hceKnowledgeGaps,
  },
  /**
   * Batch 2026-08-26 — đọc trực tiếp Thông tin tuyển sinh 2026 của Đại học Huế (PDF 77 trang,
   * `hce-hueuni-ttts-2026`) qua Google Drive: mục 2 (công thức, không hệ số cho tổ hợp Trường Đại
   * học Kinh tế), mục IV (bảng tổ hợp môn từng ngành), Phụ lục 1 (ngưỡng từng ngành, mã trường DHK)
   * và mục V.2 + Bảng 1 (điểm ưu tiên tự công bố đầy đủ) đều verified → `exactCalculator: true`
   * cho toàn bộ 18 ngành Trường Đại học Kinh tế (2 nhóm ngưỡng 15/17, cùng công thức). KHÔNG gắn
   * `knowledgeGaps` (auditMethods() coi exactCalculator:true + knowledgeGaps non-empty là lỗi
   * EXACT_METHOD_HAS_UNRESOLVED_GAPS) — điểm cộng (Phụ lục 2, TC1-TC12) chưa mô hình hoá thành bảng
   * tra cứu tự động nhưng không chặn exact (mặc định 0, caller có thể tự cung cấp nếu đã tính).
   */
  {
    id: 'hce-thpt-exam-kinhte-2026',
    schoolId: 'hce',
    name: 'Xét tuyển theo kết quả thi TN THPT năm 2026 (Trường Đại học Kinh tế, Đại học Huế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, các ngành Trường Đại học Kinh tế - Đại học Huế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
