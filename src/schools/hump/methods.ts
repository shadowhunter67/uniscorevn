import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { humpKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — HUMP (Trường Đại học Y - Dược, Đại học Huế) 2025: điểm chuẩn theo ngành,
 * nguồn tuyensinh247 (`sources.ts`), cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (10/11 ngành khớp từng
 * số theo tổ hợp). Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao
 * nhất). Method[1] = nhánh exact theo TỪNG NGÀNH (`exactCalculator: true`, KHÔNG gắn
 * `knowledgeGaps` — cùng tiền lệ `schools/vnuuet`, `schools/hunre`) — gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, nguồn gốc trường chưa fetch trực tiếp)
 * KHÔNG chặn exact cho đúng phạm vi 11/11 ngành đã mô hình hoá.
 */
export const humpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hump-thpt-exam-2025',
    schoolId: 'hump',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: humpKnowledgeGaps,
  },
  {
    id: 'hump-thpt-exam-exact-2025',
    schoolId: 'hump',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 11 ngành đại học chính quy của HUMP'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
