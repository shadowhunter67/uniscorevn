import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnuflKnowledgeGaps } from './knowledgeGaps';

/**
 * TNUFL (Trường Ngoại ngữ - Đại học Thái Nguyên) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (2/5 ngành
 * liên quan Tiếng Anh, nguồn hệ thống tnu.edu.vn, năm 2026). Chỉ 1 method — nhánh exact theo NGÀNH cụ
 * thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const tnuflAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnufl-thpt-exam-exact-2026',
    schoolId: 'tnufl',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (2/5 ngành liên quan Tiếng Anh)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào TNUFL, ngành Ngôn ngữ Anh hoặc Sư phạm Tiếng Anh'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: tnuflKnowledgeGaps,
  },
];
