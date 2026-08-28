import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { apdKnowledgeGaps } from './knowledgeGaps';

export const apdAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'apd-thpt-exam-2026',
    schoolId: 'apd',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: apdKnowledgeGaps,
  },
  /**
   * Nhánh exact — 3 cơ sở đào tạo (Hà Nội/Bắc Ninh/Đà Nẵng), ngưỡng đồng nhất mọi tổ hợp trong
   * cùng 1 cơ sở. Thông báo 180/TB-HVCSPT xác nhận rõ ngưỡng đã bao gồm điểm cộng + điểm ưu tiên
   * (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng). Không có bảng điểm cộng cụ thể cho 2026 —
   * model điểm cộng = 0 (thiếu số liệu, xem knowledgeGaps).
   */
  {
    id: 'apd-thpt-exam-exact-2026',
    schoolId: 'apd',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào theo cơ sở đào tạo',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào APD'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
