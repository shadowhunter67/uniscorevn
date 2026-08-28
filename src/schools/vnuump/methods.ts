import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuumpKnowledgeGaps } from './knowledgeGaps';

export const vnuumpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuump-thpt-exam-2026',
    schoolId: 'vnuump',
    name: 'THPT exam admission baseline (Phuong thuc 2 - 96% chi tieu)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuumpKnowledgeGaps,
  },
  /**
   * Nhánh exact — phương thức thi TN THPT (96% chỉ tiêu), theo từng ngành. Thông báo 2468/TB-ĐHYD
   * mục 1 xác nhận bảng ngưỡng theo ngành (thô, không tính điểm cộng, mức cho thí sinh KV3); trang
   * tuyển sinh chính thức xác nhận công thức chung CỘNG điểm ưu tiên khu vực/đối tượng theo Điều 7
   * Quy chế của Bộ GD&ĐT.
   */
  {
    id: 'vnuump-thpt-exam-exact-2026',
    schoolId: 'vnuump',
    name: 'Xét kết quả thi TN THPT theo ngành — Ngưỡng đảm bảo chất lượng đầu vào 2026',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào VNU-UMP (6 ngành, phương thức 96% chỉ tiêu)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
