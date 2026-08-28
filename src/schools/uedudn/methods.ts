import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uedudnKnowledgeGaps } from './knowledgeGaps';

export const uedudnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uedudn-thpt-exam-2026',
    schoolId: 'uedudn',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uedudnKnowledgeGaps,
  },
  /**
   * Nhánh exact — ảnh chính thức tuyensinh.ued.udn.vn xác nhận đầy đủ: công thức "tổng 3 môn +
   * điểm ưu tiên KV/ĐT" (mục GHI CHÚ, tuyên bố trực tiếp — không phải judgment call) và bảng
   * ngưỡng 33/37 ngành công thức chuẩn (3 mức: 15,5/17,0/20,0). 4 ngành công thức riêng (năng
   * khiếu) không mô hình hoá.
   */
  {
    id: 'uedudn-thpt-exam-exact-2026',
    schoolId: 'uedudn',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đầu vào đầy đủ theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
