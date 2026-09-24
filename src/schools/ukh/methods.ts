import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * UKH (Trường Đại học Khánh Hòa) 2026 — điểm trúng tuyển theo MÃ XÉT TUYỂN (21/21 ngành đại học
 * chính quy, 15,00–24,88/30), nguồn PDF ký tên/đóng dấu + PDF "Thông tin tuyển sinh" (`sources.ts`),
 * năm 2026. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết
 * quả thi TN THPT. Điểm cộng thành tích (tối đa 3,00) KHÔNG mô hình hoá — xem `knowledgeGaps.ts`.
 */
export const ukhAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ukh-thpt-exam-exact-2026',
    schoolId: 'ukh',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 21 ngành đại học chính quy của UKH'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
