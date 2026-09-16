import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnulawKnowledgeGaps } from './knowledgeGaps';

/**
 * VNU-Luật (Trường Đại học Luật - Đại học Quốc gia Hà Nội) 2026 — điểm chuẩn trúng tuyển theo NGÀNH
 * (3/3 ngành, phương thức 100, nguồn Cổng TTĐT Chính phủ đăng lại thông báo chính thức, năm 2026).
 * Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`).
 */
export const vnulawAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnulaw-thpt-exam-exact-2026',
    schoolId: 'vnulaw',
    name: 'Xét kết quả thi TN THPT (Phương thức 100) — Điểm chuẩn theo ngành (3/3 ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào VNU-Luật, chọn 1 trong 3 ngành'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: vnulawKnowledgeGaps,
  },
];
