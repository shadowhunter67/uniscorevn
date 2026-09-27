import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * VNU-IS (Trường Quốc tế - Đại học Quốc gia Hà Nội) 2026 — điểm chuẩn trúng tuyển theo CHƯƠNG TRÌNH
 * (14/14 chương trình, 19,00–21,25/30), nguồn thông báo tổng hợp ĐHQGHN + thông báo chi tiết của
 * chính Trường Quốc tế (`sources.ts`). Chỉ 1 method — nhánh exact xét kết quả thi TN THPT 2026
 * (`exactCalculator: true`).
 */
export const vnuisAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuis-thpt-exam-exact-2026',
    schoolId: 'vnuis',
    name: 'Xét kết quả thi TN THPT 2026 — Điểm trúng tuyển theo chương trình',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 14 chương trình đào tạo đại học của Trường Quốc tế - ĐHQGHN'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
