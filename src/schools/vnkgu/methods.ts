import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * VNKGU (Trường Đại học Kiên Giang) 2026 — điểm trúng tuyển theo MÃ XÉT TUYỂN (28/28 ngành đại học
 * chính quy, 15,00–28,55/30), nguồn PDF ký tên/đóng dấu + Đề án tuyển sinh chính thức (`sources.ts`),
 * năm 2026. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), Phương thức 2
 * (thi TN THPT). Điểm cộng thành tích (tối đa 3,00) KHÔNG mô hình hoá — xem `knowledgeGaps.ts`.
 */
export const vnkguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnkgu-thpt-exam-exact-2026',
    schoolId: 'vnkgu',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 28 ngành đại học chính quy của VNKGU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
