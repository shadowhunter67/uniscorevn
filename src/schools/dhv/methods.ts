import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dhvKnowledgeGaps } from './knowledgeGaps';

/**
 * DHV (Trường Đại học Hùng Vương TP.HCM) 2026 — điểm chuẩn trúng tuyển theo MÃ XÉT TUYỂN (23/23 mã,
 * nguồn CHÍNH CHỦ ảnh công bố điểm chuẩn trên dhv.edu.vn, năm 2026). Chỉ 1 method — nhánh exact theo
 * mã xét tuyển cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const dhvAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dhv-thpt-exam-exact-2026',
    schoolId: 'dhv',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo mã xét tuyển (23/23 mã)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào DHV, chọn 1 trong 23 mã xét tuyển đại học chính quy'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: dhvKnowledgeGaps,
  },
];
