import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vhuKnowledgeGaps } from './knowledgeGaps';

export const vhuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vhu-thpt-exam-2026',
    schoolId: 'vhu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vhuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP so TỔNG THÔ với điểm chuẩn theo mã ngành (39/43 mã, loại 4 mã năng khiếu). Nguồn nói
   * RÕ ngưỡng/điểm chuẩn áp dụng cho khu vực 3, không gồm ưu tiên/điểm cộng — so RAW, điểm ưu tiên
   * chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'vhu-thpt-exam-exact-2026',
    schoolId: 'vhu',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo mã ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 39 mã ngành VHU (trừ 4 mã năng khiếu)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
