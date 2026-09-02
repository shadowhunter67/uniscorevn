import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuhusKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — VNU-HUS (Trường Đại học Khoa học Tự nhiên - ĐHQGHN) 2025: điểm chuẩn theo
 * ngành, nguồn tuyensinh247 (`sources.ts`), cross-check dải điểm với Đại biểu Nhân dân. Method[0] =
 * baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất). Method[1] = nhánh exact
 * theo TỪNG NGÀNH (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/
 * vnuuet`, `schools/vnued`, `schools/hdiu`, `schools/tlu`, `schools/hpmu`, `schools/vnueb`) — các
 * gap còn lại (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, X-series chưa mô hình hoá,
 * nguồn gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 28/28 ngành đã mô
 * hình hoá.
 */
export const vnuhusAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuhus-thpt-exam-2025',
    schoolId: 'vnuhus',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuhusKnowledgeGaps,
  },
  {
    id: 'vnuhus-thpt-exam-exact-2025',
    schoolId: 'vnuhus',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 28 ngành đại học chính quy của VNU-HUS'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
