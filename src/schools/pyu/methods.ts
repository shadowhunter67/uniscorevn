import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { pyuKnowledgeGaps } from './knowledgeGaps';

/**
 * PYU (Trường Đại học Phú Yên) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (10/11 ngành đại học chính
 * quy, nguồn CHÍNH CHỦ Thông báo điểm trúng tuyển đợt 1, Quyết định số 497/QĐ-ĐHPY, năm 2026). Chỉ
 * 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const pyuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pyu-thpt-exam-exact-2026',
    schoolId: 'pyu',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (10/11 ngành, Giáo dục Mầm non chưa mô hình hoá)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào PYU, chọn 1 trong 10 ngành đại học chính quy KHÔNG phải Giáo dục Mầm non'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: pyuKnowledgeGaps,
  },
];
