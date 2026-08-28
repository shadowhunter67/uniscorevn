import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ntuhnKnowledgeGaps } from './knowledgeGaps';

export const ntuhnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ntuhn-thpt-exam-2026',
    schoolId: 'ntuhn',
    name: 'Xet tuyen theo ket qua thi tot nghiep THPT nam 2026',
    year: 2026,
    applicantTypes: ['Thi sinh su dung diem thi tot nghiep THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ntuhnKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức xét kết quả thi TN THPT. Ngưỡng 15/30
   * đồng nhất 11 ngành trích nguyên văn Thông báo điểm sàn 29/06/2026
   * (`sources.ts:ntuhn-threshold-notice-2026`). Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là
   * judgment call (thông báo không in công thức tường minh) theo Điều 7 TT 06/2026
   * (`priority.ts`), cùng tiền lệ `schools/ctu`/`schools/ttn`. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'ntuhn-thpt-exam-exact-2026',
    schoolId: 'ntuhn',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (ngưỡng 15/30 đồng nhất 11 ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 11 ngành đào tạo NTU-HN'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
