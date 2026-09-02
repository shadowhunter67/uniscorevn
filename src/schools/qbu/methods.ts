import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { qbuKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — QBU (Trường Đại học Quảng Bình) 2025: điểm chuẩn 14/15 ngành (loại Giáo dục
 * Mầm non — tổ hợp năng khiếu chưa xác minh), TOÀN BỘ không nhân hệ số (khác QNU phải loại trừ 1
 * phần), nguồn Tuyensinh247 + Taro.edu.vn (`sources.ts`), cross-check thêm FPTShop/Sforum/
 * Navigates. Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất
 * trong 14 ngành đã mô hình hoá). Method[1] = nhánh exact theo TỪNG NGÀNH + TỪNG TỔ HỢP cụ thể
 * (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/qnu`, `schools/tvu`)
 * — các gap còn lại (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, Giáo dục Mầm non chưa
 * mô hình hoá, tổ hợp riêng của trường chưa xác minh, không tìm được nguồn text chính thức) đều
 * KHÔNG chặn exact cho đúng phạm vi 14 ngành x tổ hợp đã mô hình hoá.
 */
export const qbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'qbu-thpt-exam-2025',
    schoolId: 'qbu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: qbuKnowledgeGaps,
  },
  {
    id: 'qbu-thpt-exam-exact-2025',
    schoolId: 'qbu',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành và tổ hợp',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 14 ngành đại học chính quy của QBU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
