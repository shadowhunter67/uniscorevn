import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuaKnowledgeGaps } from './knowledgeGaps';

export const vnuaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnua-thpt-exam-2026',
    schoolId: 'vnua',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuaKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ ngưỡng đầu vào (exact), phương thức thi TN THPT, CHỈ 19/23 nhóm ngành có
   * ngưỡng số công bố (HVN13/HVN19 theo quy định Bộ GD&ĐT, ngoài phạm vi). Ngưỡng im lặng về việc
   * đã gồm ưu tiên (judgment call so tổng thô, cùng tiền lệ HCMUE); điểm ưu tiên khu vực/đối tượng
   * (trích từ chính thông báo tuyển sinh VNUA, `priority.ts`) chỉ dùng để tính ĐXT tham khảo. Điểm
   * cộng (giải thưởng/chứng chỉ, tối đa 3,0) không được cộng vì thiếu bảng quy đổi cụ thể (xem
   * `vnua-bonus-detail-not-modeled`).
   */
  {
    id: 'vnua-thpt-exam-exact-2026',
    schoolId: 'vnua',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đầu vào theo nhóm ngành (19/23 nhóm)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 19 nhóm ngành VNUA có ngưỡng số công bố'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];

