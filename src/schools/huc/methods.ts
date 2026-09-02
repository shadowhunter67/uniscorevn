import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hucKnowledgeGaps } from './knowledgeGaps';

/**
 * Batch 2026-09-02 — HUC (Trường Đại học Văn hóa Hà Nội) 2025: điểm chuẩn theo ngành + tổ hợp,
 * nguồn tuyensinh247 (`sources.ts`), cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (20/20 ngành khớp từng
 * số). Method[0] = baseline (không cần chọn ngành, dùng dải điểm chuẩn thấp nhất/cao nhất trong 20
 * ngành đã mô hình hoá). Method[1] = nhánh exact theo TỪNG NGÀNH + TỪNG TỔ HỢP cụ thể
 * (`exactCalculator: true`, KHÔNG gắn `knowledgeGaps` — cùng tiền lệ `schools/qbu`, `schools/
 * vnussh`) — các gap còn lại (`knowledgeGaps.ts`: giá trị điểm ưu tiên judgment call, X70/X78 chưa
 * mô hình hoá, Sáng tác văn học chưa modeled, nguồn gốc trường là SPA/ảnh) đều KHÔNG chặn exact
 * cho đúng phạm vi 20 ngành x tổ hợp đã mô hình hoá.
 */
export const hucAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huc-thpt-exam-2025',
    schoolId: 'huc',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2025',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hucKnowledgeGaps,
  },
  {
    id: 'huc-thpt-exam-exact-2025',
    schoolId: 'huc',
    name: 'Xét điểm thi TN THPT — Điểm chuẩn theo ngành và tổ hợp',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 20 ngành đại học chính quy của HUC'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
