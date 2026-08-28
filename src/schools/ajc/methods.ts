import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ajcKnowledgeGaps } from './knowledgeGaps';

export const ajcAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ajc-thpt-exam-2026',
    schoolId: 'ajc',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ajcKnowledgeGaps,
  },
  /**
   * Nhánh exact — cùng 2 nhóm ngành đã có ngưỡng (Báo chí-Xuất bản thang 40; Lý luận/Lịch sử/
   * Truyền thông-Quảng cáo-Quan hệ quốc tế thang 30). Công thức điểm xét tuyển (cộng điểm ưu tiên,
   * điểm cộng theo hệ số riêng cho nhóm thang 40) đã xác minh qua đối chiếu chéo (xem `priority.ts`,
   * `evidence.ts`). Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call).
   */
  {
    id: 'ajc-thpt-exam-exact-2026',
    schoolId: 'ajc',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào theo nhóm ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào AJC (2 nhóm ngành đã có ngưỡng công bố)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
