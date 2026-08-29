import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { houKnowledgeGaps } from './knowledgeGaps';

export const houAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hou-thpt-exam-2026',
    schoolId: 'hou',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: houKnowledgeGaps,
  },
  /**
   * Nhánh exact — ngưỡng theo TỪNG NGÀNH cụ thể (16/22 ngành, nêu đích danh — xem
   * thresholds.ts/knowledgeGaps.ts cho 6 ngành loại trừ), so với TỔNG ĐÃ CỘNG điểm ưu tiên (khác
   * Phenikaa/AOF so với tổng thô). `priority: true` phản ánh điểm ưu tiên dùng judgment call
   * chuẩn quốc gia cho GIÁ TRỊ bảng (nguồn xác nhận CÓ áp dụng, không phải judgment call cho việc
   * áp dụng).
   */
  {
    id: 'hou-thpt-exam-exact-2026',
    schoolId: 'hou',
    name: 'Xét điểm thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, chọn 1 trong 16 ngành đã mô hình hoá của HOU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
