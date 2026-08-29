import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { cmcuKnowledgeGaps } from './knowledgeGaps';

export const cmcuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'cmcu-thpt-exam-2026',
    schoolId: 'cmcu',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: cmcuKnowledgeGaps,
  },
  /**
   * Nhánh exact — ngưỡng theo TỪNG LĨNH VỰC/NGÀNH cụ thể (9 dòng, nêu đích danh), công thức "môn
   * chính x2 + 2 môn bất kỳ" (thang 40) đã xác nhận trực tiếp. `priority: true` phản ánh điểm ưu
   * tiên dùng judgment call chuẩn quốc gia (`priority.ts`, quy đổi ×4/3 sang thang 40) — nguồn im
   * lặng hoàn toàn về điểm ưu tiên.
   */
  {
    id: 'cmcu-thpt-exam-exact-2026',
    schoolId: 'cmcu',
    name: 'Xét điểm thi TN THPT — Điểm sàn nhận hồ sơ theo lĩnh vực/ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, chọn 1 trong 9 lĩnh vực/ngành CMCU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
