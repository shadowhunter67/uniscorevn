import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HAT (Trường Du lịch - Đại học Huế) 2025 — điểm chuẩn theo NGÀNH (7/7 ngành đại học chính quy,
 * 15,00–21,50/30), nguồn 3 báo/tổng hợp ĐỘC LẬP khớp TUYỆT ĐỐI (`sources.ts`), cùng năm 2025. Chỉ 1
 * method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT
 * 2025 (huht.hueuni.edu.vn không fetch trực tiếp được — connection refused, xem `sources.ts`).
 */
export const hatAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hat-thpt-exam-exact-2025',
    schoolId: 'hat',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 7 ngành đại học chính quy của HAT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
