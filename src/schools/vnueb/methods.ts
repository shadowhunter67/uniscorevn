import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuebKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — VNU-UEB (Trường Đại học Kinh tế - ĐHQGHN) 2025: điểm chuẩn theo ngành,
 * cross-check 2 báo độc lập (`sources.ts`), 6/6 ngành đại học chính quy hệ thi TN THPT.
 * Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất). Method[1] =
 * nhánh exact theo TỪNG NGÀNH cụ thể (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng
 * tiền lệ `schools/hdiu`, `schools/tlu`, `schools/hpmu`) — các gap còn lại (`knowledgeGaps.ts`:
 * giá trị điểm ưu tiên judgment call, tiêu chí phụ Toán khi bằng điểm, nguồn gốc 403 không đọc
 * trực tiếp được, các phương thức khác chưa mô hình hoá) đều KHÔNG chặn exact cho đúng phạm vi
 * nhánh thi TN THPT theo ngành đã chọn.
 */
export const vnuebAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnueb-thpt-exam-2025',
    schoolId: 'vnueb',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuebKnowledgeGaps,
  },
  {
    id: 'vnueb-thpt-exam-exact-2025',
    schoolId: 'vnueb',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 6 ngành đại học chính quy của VNU-UEB'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
