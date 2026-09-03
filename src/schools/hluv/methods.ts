import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HLUV (Trường Đại học Hoa Lư) 2025 — điểm trúng tuyển theo NGÀNH (8/9 ngành đại học chính quy,
 * 16,00–27,07/30, loại trừ Giáo dục Mầm non dùng tổ hợp năng khiếu), nguồn ảnh chụp thông báo gốc +
 * 2 nguồn tổng hợp cross-check khớp tuyệt đối (`sources.ts`), cùng năm 2025. Chỉ 1 method — nhánh
 * exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT 2025.
 */
export const hluvAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hluv-thpt-exam-exact-2025',
    schoolId: 'hluv',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 8 ngành đại học chính quy của HLUV'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
