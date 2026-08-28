import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ctumpKnowledgeGaps } from './knowledgeGaps';

export const ctumpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ctump-thpt-exam-2026',
    schoolId: 'ctump',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ctumpKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ mức điểm nhận hồ sơ đợt 1 (exact), phương thức thi TN THPT, 4 nhóm ngành đã
   * công bố (Thông báo 197/TB-ĐHYDCT, mục II.1). Nguồn nói rõ mức điểm này đã BAO GỒM điểm ưu tiên
   * khu vực/đối tượng và tự trích công thức giảm dần điểm ưu tiên nguyên văn — KHÁC HCMUE (silent,
   * judgment call so tổng thô); mức KV/ĐT cụ thể vẫn là mức chuẩn toàn quốc (judgment call, xem
   * `priority.ts`). Nhóm ngành do người dùng tự chọn (`ctump-program-mapping-not-imported` —
   * non-blocking). Phương thức V-SAT (mục II.2) ngoài phạm vi nhánh này.
   */
  {
    id: 'ctump-thpt-exam-exact-2026',
    schoolId: 'ctump',
    name: 'Xét kết quả thi TN THPT — Mức điểm nhận hồ sơ đợt 1 (4 nhóm ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào CTUMP'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
