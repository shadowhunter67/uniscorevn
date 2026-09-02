import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuedKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — VNU-UED (Trường Đại học Giáo dục - ĐHQGHN) 2025: điểm chuẩn theo ngành +
 * tổ hợp, nguồn tuyensinh247 (`sources.ts`), cross-check dải điểm với VnExpress. Method[0] =
 * baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất). Method[1] = nhánh exact
 * theo TỪNG NGÀNH + tổ hợp cụ thể (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền
 * lệ `schools/hdiu`, `schools/tlu`, `schools/hpmu`, `schools/vnueb`) — các gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, nhóm ngành gộp chưa mô hình hoá, nguồn
 * gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 10/11 ngành đã mô hình
 * hoá.
 */
export const vnuedAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnued-thpt-exam-2025',
    schoolId: 'vnued',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuedKnowledgeGaps,
  },
  {
    id: 'vnued-thpt-exam-exact-2025',
    schoolId: 'vnued',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành và tổ hợp',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 10 ngành sư phạm/giáo dục đại học chính quy của VNU-UED'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
