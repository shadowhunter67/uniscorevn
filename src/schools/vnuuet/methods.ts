import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuuetKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — VNU-UET (Trường Đại học Công nghệ - ĐHQGHN) 2025: điểm chuẩn theo ngành,
 * nguồn tuyensinh247 (`sources.ts`), cross-check dải điểm với VnExpress. Method[0] = baseline
 * (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất). Method[1] = nhánh exact theo
 * TỪNG NGÀNH (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/vnued`,
 * `schools/hdiu`, `schools/tlu`, `schools/hpmu`, `schools/vnueb`) — các gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, X06/X26 chưa mô hình hoá, nguồn gốc ảnh
 * không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 20/20 ngành đã mô hình hoá.
 */
export const vnuuetAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuuet-thpt-exam-2025',
    schoolId: 'vnuuet',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuuetKnowledgeGaps,
  },
  {
    id: 'vnuuet-thpt-exam-exact-2025',
    schoolId: 'vnuuet',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 20 ngành đại học chính quy của VNU-UET'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
