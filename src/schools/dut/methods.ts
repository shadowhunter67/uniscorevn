import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dutKnowledgeGaps } from './knowledgeGaps';

/**
 * DUT (Trường Đại học Bách khoa - Đại học Đà Nẵng) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (49/49
 * ngành/chuyên ngành, nguồn hệ thống ts.udn.vn, năm 2026). Chỉ 1 method — nhánh exact theo NGÀNH cụ
 * thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const dutAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dut-thpt-exam-exact-2026',
    schoolId: 'dut',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành (49/49 ngành/chuyên ngành)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào DUT, chọn 1 trong 49 ngành/chuyên ngành đại học chính quy'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: dutKnowledgeGaps,
  },
];
