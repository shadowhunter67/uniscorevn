import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hmuKnowledgeGaps } from './knowledgeGaps';

export const hmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  /**
   * "Thông báo số 3142/TB-ĐHYHN" công bố TRỰC TIẾP ngưỡng theo NGÀNH (không phải theo nhóm khối
   * như HUST) và xác nhận rõ ngưỡng là tổng thô 3 môn, không cộng ưu tiên/điểm khuyến khích — nhánh
   * exact so trực tiếp tổng thô với ngưỡng ngành, không cần judgment call điểm ưu tiên.
   * `priority: false`/`bonus: false` phản ánh đúng: 2 yếu tố này KHÔNG áp dụng cho ngưỡng sàn này.
   */
  {
    id: 'hmu-thpt-exam-exact-2026',
    schoolId: 'hmu',
    name: 'Xét điểm thi TN THPT — kiểm tra ngưỡng đảm bảo chất lượng đầu vào theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, khu vực 3, xét theo một ngành HMU cụ thể'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
    knowledgeGaps: hmuKnowledgeGaps,
  },
];
