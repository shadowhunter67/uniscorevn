import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnusshKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — VNU-USSH (Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN) 2025: điểm
 * chuẩn theo ngành + tổ hợp, nguồn tuyensinh247 (`sources.ts`), cross-check với VietnamNet.
 * Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất trong 28
 * ngành đã mô hình hoá). Method[1] = nhánh exact theo TỪNG NGÀNH + TỪNG TỔ HỢP cụ thể
 * (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/qbu`, `schools/
 * vnued`) — các gap còn lại (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, tổ hợp ngoại
 * ngữ D66/D04/D06/DD2 chưa mô hình hoá, Truyền thông đa phương tiện chưa modeled) đều KHÔNG chặn
 * exact cho đúng phạm vi 28 ngành x tổ hợp đã mô hình hoá.
 */
export const vnusshAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnussh-thpt-exam-2025',
    schoolId: 'vnussh',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnusshKnowledgeGaps,
  },
  {
    id: 'vnussh-thpt-exam-exact-2025',
    schoolId: 'vnussh',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành và tổ hợp',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 28 ngành đại học chính quy của VNU-USSH'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
