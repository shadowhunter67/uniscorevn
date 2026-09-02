import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hpmuKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — HPMU (Đại học Y Dược Hải Phòng) 2025: điểm chuẩn theo ngành, cross-check 2
 * báo độc lập (`sources.ts`), 7/7 ngành đại học chính quy hệ thi TN THPT. Method[0] = baseline
 * (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất). Method[1] = nhánh exact theo
 * TỪNG NGÀNH cụ thể (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ
 * `schools/hdiu`, `schools/tlu`) — các gap còn lại (`knowledgeGaps.ts`: caveat quy đổi tương đương
 * giữa 2 phương thức, giá trị điểm ưu tiên/điểm thưởng judgment call, tiêu chí phụ Toán/Hóa khi
 * bằng điểm, nguồn gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi nhánh
 * thi TN THPT theo ngành đã chọn.
 */
export const hpmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hpmu-thpt-exam-2025',
    schoolId: 'hpmu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hpmuKnowledgeGaps,
  },
  {
    id: 'hpmu-thpt-exam-exact-2025',
    schoolId: 'hpmu',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 7 ngành đại học chính quy của HPMU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
