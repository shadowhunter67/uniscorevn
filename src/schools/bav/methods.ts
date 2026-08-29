import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { bavKnowledgeGaps } from './knowledgeGaps';

export const bavAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bav-thpt-exam-2026',
    schoolId: 'bav',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (PTXT4)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: bavKnowledgeGaps,
  },
  /**
   * Nhánh exact — "Thông tin tuyển sinh năm 2026" công bố bảng ĐẦY ĐỦ 45 mã xét tuyển với tổ hợp +
   * môn chính (`thresholds.ts`); "Thông báo ngưỡng đảm bảo chất lượng đầu vào..." công bố công thức
   * quy đổi (môn chính nhân đôi, quy đổi thang 30) và ngưỡng theo loại chương trình (chuẩn/CLC
   * 21,50; liên kết quốc tế 19,00). 3 mã lĩnh vực Pháp luật bị loại (ngưỡng chưa công bố). Điểm ưu
   * tiên dùng công thức BAV tự công bố (mốc 22,50, chia 7,5) với GIÁ TRỊ bảng chuẩn quốc gia
   * (judgment call, `priority.ts`) — `priority: true` phản ánh phần giá trị bảng vẫn là judgment
   * call dù công thức đã xác nhận trực tiếp.
   */
  {
    id: 'bav-thpt-exam-exact-2026',
    schoolId: 'bav',
    name: 'Xét điểm thi TN THPT — Điểm xét theo mã xét tuyển (PTXT4)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo một mã xét tuyển BAV cụ thể (không thuộc lĩnh vực Pháp luật)'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
