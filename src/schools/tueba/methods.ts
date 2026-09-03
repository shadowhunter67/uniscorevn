import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * TUEBA (Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên) 2026 — điểm sàn theo
 * NGÀNH (3 mức: 17,0 / 17,5 / 20,0), nguồn chính chủ tuyensinh.tueba.edu.vn cho cả formula và
 * threshold (`sources.ts:tueba-threshold-2026`), cùng năm 2026. Chỉ 1 method — nhánh exact theo
 * NGÀNH cụ thể (`exactCalculator: true`), phương thức xét kết quả thi TN THPT 2026.
 */
export const tuebaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tueba-thpt-exam-exact-2026',
    schoolId: 'tueba',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 29 mã ngành/chương trình đại học chính quy của TUEBA'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
