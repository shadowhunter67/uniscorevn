import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tvuKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — TVU (Trường Đại học Trà Vinh) 2025: điểm chuẩn 5/47+ ngành (khối sức khỏe),
 * nguồn FPTShop (`sources.ts`), cross-check Sforum/CellphoneS. Method[0] = baseline (không cần
 * chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất trong 5 ngành đã mô hình hoá). Method[1] =
 * nhánh exact theo TỪNG NGÀNH + tổ hợp cụ thể (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps`
 * — cùng tiền lệ `schools/hpmu`, `schools/vnueb`, `schools/vnued`) — các gap còn lại
 * (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, 42 ngành khác chưa mô hình hoá, nguồn
 * gốc ảnh không đọc trực tiếp được) đều KHÔNG chặn exact cho đúng phạm vi 5 ngành đã mô hình hoá.
 */
export const tvuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tvu-thpt-exam-2025',
    schoolId: 'tvu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tvuKnowledgeGaps,
  },
  {
    id: 'tvu-thpt-exam-exact-2025',
    schoolId: 'tvu',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành (khối sức khỏe)',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 5 ngành khối sức khỏe của TVU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
