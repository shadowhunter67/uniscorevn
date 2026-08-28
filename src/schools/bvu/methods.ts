import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { bvuKnowledgeGaps } from './knowledgeGaps';

export const bvuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bvu-transcript-2026',
    schoolId: 'bvu',
    name: 'Transcript (học bạ) admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using grade-12 academic transcript results'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: bvuKnowledgeGaps,
  },
  /**
   * Nhánh exact — phương thức xét điểm thi TN THPT (khác phương thức học bạ ở trên). Bài đăng
   * công bố điểm trúng tuyển 10/08/2026 xác nhận rõ 4 nhóm ngành (Dược 20/Điều dưỡng 18/Luật
   * 20/khác 15) và KHÔNG cộng điểm ưu tiên khu vực, đối tượng — điều kiện đơn giản, không cần
   * priority/bonus module.
   */
  {
    id: 'bvu-thpt-exam-exact-2026',
    schoolId: 'bvu',
    name: 'Xét điểm thi TN THPT — Ngưỡng đầu vào theo nhóm ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét điểm thi TN THPT 2026 vào BVU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
