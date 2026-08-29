import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uttKnowledgeGaps } from './knowledgeGaps';

export const uttAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'utt-thpt-exam-2026',
    schoolId: 'utt',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uttKnowledgeGaps,
  },
  /**
   * Nhánh exact — "Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026"
   * (đọc trực tiếp qua curl 2026-08-29) công bố công thức TRỰC TIẾP (ĐXT = tổng 3 môn + điểm ưu
   * tiên) + bảng ngưỡng đầy đủ 75 mã xét tuyển (`thresholds.ts`), và xác nhận ngưỡng ĐÃ BAO GỒM
   * điểm ưu tiên. Nguồn không in bảng giá trị KV/ĐT cụ thể => `priority: true` phản ánh judgment
   * call chuẩn quốc gia cho giá trị bảng (`priority.ts`), không phải trường tự công bố số.
   */
  {
    id: 'utt-thpt-exam-exact-2026',
    schoolId: 'utt',
    name: 'Xét điểm thi TN THPT — Điểm xét tuyển theo mã xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo một mã xét tuyển UTT cụ thể'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
