import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vguKnowledgeGaps } from './knowledgeGaps';

export const vguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vgu-thpt-exam-2026',
    schoolId: 'vgu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vguKnowledgeGaps,
  },
  /**
   * Nhánh HẸP exact — PT5 (thi TN THPT 2026), 12 ngành có tổ hợp công bố (trừ Kiến trúc), tổ hợp mô hình
   * hoá được (A00/A01/A02/B00/D01/D07 theo từng ngành; D03/D05/D26 Pháp/Đức nằm ngoài). Điều kiện xét
   * trúng tuyển (trang /nhaphoc): (a) tổng 3 môn KHÔNG nhân hệ số, GỒM điểm ưu tiên theo Quy chế ≥ điểm sàn
   * theo ngành (ảnh bảng chính thức 09/07/2026); (b) đạt yêu cầu tiếng Anh; (c) tổng thô 3 môn ≥ 15,00.
   * Môn Anh có thể thay bằng điểm IELTS quy đổi (giá trị cao nhất khoảng tương ứng). Ngoài phạm vi:
   * Kiến trúc, bài thi tiếng Anh VGU (75/100), TOEFL iBT, IELTS 5,5, các phương thức 1-4.
   */
  {
    id: 'vgu-thpt-exam-exact-2026',
    schoolId: 'vgu',
    name: 'THPT exam floor check (PT5, modeled programs and combinations)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores (Method 5)'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
