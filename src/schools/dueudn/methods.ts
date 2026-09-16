import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dueudnKnowledgeGaps } from './knowledgeGaps';

/**
 * DUE (Trường Đại học Kinh tế - Đại học Đà Nẵng) 2026 — điểm chuẩn trúng tuyển theo MÃ XÉT TUYỂN
 * (19/36 mã, chương trình "ST - Tiêu chuẩn", nguồn hệ thống ts.udn.vn, năm 2026). Chỉ 1 method —
 * nhánh exact theo MÃ cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT thuần.
 */
export const dueudnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dueudn-thpt-exam-exact-2026',
    schoolId: 'dueudn',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo mã xét tuyển (19/36 mã, chương trình ST - Tiêu chuẩn)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào DUE, chọn 1 trong 19 mã xét tuyển chương trình chuẩn'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: dueudnKnowledgeGaps,
  },
];
