import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ndunKnowledgeGaps } from './knowledgeGaps';

/**
 * NDUN (Trường Đại học Điều dưỡng Nam Định, mã trường YDD) 2026 — 1 phương thức exact:
 * - `ndun-thpt-exam-exact-2026`: Phương thức 100, xét kết quả kỳ thi TN THPT 2026.
 *   ĐXT = (M1 + M2 + M3 + KK) + UT, trần 30. Điểm chuẩn CHÍNH THỨC cho cả 3/3 ngành
 *   (16,25-21,10/30, Thông báo 2058/TB-ĐDN ngày 10/8/2026). Có mô hình hoá thêm ngưỡng đảm bảo
 *   chất lượng đầu vào theo ngành và nguồn tuyển (tổng thô 3 môn tối thiểu).
 */
export const ndunAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ndun-thpt-exam-exact-2026',
    schoolId: 'ndun',
    name: 'Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tham dự kỳ thi tốt nghiệp THPT năm 2026 và đăng ký sử dụng kết quả để xét tuyển đại học'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: ndunKnowledgeGaps,
  },
];
