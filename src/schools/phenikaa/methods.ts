import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { phenikaaKnowledgeGaps } from './knowledgeGaps';

export const phenikaaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'phenikaa-thpt-exam-2026',
    schoolId: 'phenikaa',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: phenikaaKnowledgeGaps,
  },
  /**
   * Nhánh exact — công thức đơn giản (KHÔNG nhân hệ số, KHÔNG điểm cộng) đã xác nhận trực tiếp;
   * ngưỡng theo lĩnh vực/ngành cụ thể (nêu đích danh từng ngành, không phải dải/campus như AOF).
   * `priority: true` phản ánh phần giá trị bảng ưu tiên cho các ngành NGOÀI 2 CTĐT tài năng vẫn là
   * judgment call (`priority.ts`) — 2 CTĐT tài năng loại trừ tuyệt đối điểm ưu tiên (không judgment
   * call, dữ liệu tự công bố).
   */
  {
    id: 'phenikaa-thpt-exam-exact-2026',
    schoolId: 'phenikaa',
    name: 'Xét điểm thi TN THPT — Điểm xét theo lĩnh vực/ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, chọn 1 trong 7 nhóm lĩnh vực/ngành Phenikaa'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
