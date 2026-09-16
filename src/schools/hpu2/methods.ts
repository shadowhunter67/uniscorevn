import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hpu2KnowledgeGaps } from './knowledgeGaps';

/**
 * HPU2 (Trường Đại học Sư phạm Hà Nội 2) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (25/25 ngành nhóm
 * 3-môn chuẩn, nguồn Cổng TTĐT Chính phủ đăng lại thông báo chính thức, năm 2026). Chỉ 1 method —
 * nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const hpu2AdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hpu2-thpt-exam-exact-2026',
    schoolId: 'hpu2',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (25/25 ngành nhóm 3-môn chuẩn)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào HPU2, chọn 1 trong 25 ngành nhóm 3-môn chuẩn'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: hpu2KnowledgeGaps,
  },
];
