import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tbuKnowledgeGaps } from './knowledgeGaps';

export const tbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tbu-thpt-exam-2026',
    schoolId: 'tbu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (ngưỡng nhận hồ sơ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tbuKnowledgeGaps,
  },
  /**
   * Nhánh exact — CHỈ nhóm "các ngành khác" (trừ Luật, PT1-Luật không có ngưỡng cố định, xem
   * `eligibility.ts`). Thông báo 565/TB-ĐHTB xác nhận công thức ĐXT = tổng 3 môn + điểm ưu tiên +
   * điểm cộng (mục 3.1.1), điểm ưu tiên theo đúng quy định Bộ GD&ĐT (mục 4.1), bảng điểm cộng cụ
   * thể (mục 4.2, model được nhánh IELTS - có input field; giải HSG cấp tỉnh/thành chưa có input
   * field tương ứng, xem knowledgeGaps).
   */
  {
    id: 'tbu-thpt-exam-exact-2026',
    schoolId: 'tbu',
    name: 'Xét kết quả thi TN THPT (PT1) — Ngưỡng đảm bảo chất lượng đầu vào (các ngành trừ Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào TBU (các ngành trừ Luật)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
