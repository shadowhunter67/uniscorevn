import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uteudnKnowledgeGaps } from './knowledgeGaps';

export const uteudnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uteudn-thpt-exam-2026',
    schoolId: 'uteudn',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uteudnKnowledgeGaps,
  },
  /**
   * Nhánh HẸP exact — xét điểm thi TN THPT 2026 KẾT HỢP học bạ THPT, 23/25 ngành/chuyên ngành (trừ Thiết kế
   * vi mạch bán dẫn: ngưỡng theo phân vị; Kiến trúc: tổ hợp Vẽ MT). ĐXT = ĐiểmTHPT × hệ số + ĐiểmHB × hệ số
   * + điểm cộng + ưu tiên (ảnh công thức chính thức); hệ số 0,7/0,3 (CNTT 1/0). So ngưỡng đầu vào theo ngành
   * (ảnh "Điểm ngưỡng đầu vào 2026"). Ngoài phạm vi: điểm cộng thành tích học tập, 2 ngành nêu trên.
   */
  {
    id: 'uteudn-thpt-hocba-exact-2026',
    schoolId: 'uteudn',
    name: 'Xét điểm thi TN THPT 2026 kết hợp học bạ THPT (23 ngành/chuyên ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026 có điểm thi TN THPT và học bạ 3 năm, không có điểm cộng thành tích'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
