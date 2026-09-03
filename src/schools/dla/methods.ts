import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * DLA (Trường Đại học Kinh tế Công nghiệp Long An) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (9/9
 * ngành đại học chính quy, 15,00–20,00/30), nguồn ảnh CHÍNH CHỦ điểm chuẩn + tổ hợp môn (`sources.ts`),
 * năm 2026. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả
 * thi TN THPT 2026.
 */
export const dlaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dla-thpt-exam-exact-2026',
    schoolId: 'dla',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 9 ngành đại học chính quy của DLA'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
