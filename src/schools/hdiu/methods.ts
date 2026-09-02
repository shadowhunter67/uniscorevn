import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hdiuKnowledgeGaps } from './knowledgeGaps';

export const hdiuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hdiu-thpt-exam-2025',
    schoolId: 'hdiu',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hdiuKnowledgeGaps,
  },
  /**
   * Nhánh exact — ngưỡng theo TỪNG NGÀNH cụ thể (15/19 mã ngành đại học chính quy, nêu đích danh —
   * xem thresholds.ts/knowledgeGaps.ts cho các tổ hợp loại trừ), so với TỔNG ĐÃ CỘNG điểm ưu tiên
   * (nguồn xác nhận trực tiếp). `priority: true` phản ánh điểm ưu tiên dùng judgment call chuẩn
   * quốc gia cho GIÁ TRỊ bảng (nguồn xác nhận CÓ áp dụng, không phải judgment call cho việc áp
   * dụng).
   */
  {
    id: 'hdiu-thpt-exam-exact-2025',
    schoolId: 'hdiu',
    name: 'Xét điểm thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 15 ngành đã mô hình hoá của HDIU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
