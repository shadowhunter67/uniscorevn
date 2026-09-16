import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnueKnowledgeGaps } from './knowledgeGaps';

/**
 * TNUE (Trường Đại học Sư phạm - Đại học Thái Nguyên) 2026 — điểm chuẩn trúng tuyển theo NGÀNH
 * (19/22 ngành, nguồn chính chủ tuyensinh.tnue.edu.vn, năm 2026). Chỉ 1 method — nhánh exact theo
 * NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const tnueAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnue-thpt-exam-exact-2026',
    schoolId: 'tnue',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (19/22 ngành, 3 ngành năng khiếu chưa mô hình hoá)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào TNUE, chọn 1 trong 19 ngành đại học chính quy không thuộc nhóm năng khiếu'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: tnueKnowledgeGaps,
  },
];
