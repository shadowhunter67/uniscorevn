import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * TLU-HN (Trường Đại học Thăng Long) 2025 — điểm trúng tuyển theo NGÀNH cho phương thức 1 (xét kết
 * quả thi TN THPT 2025), 22/24 ngành đại học chính quy (16,00–23,75/30, loại trừ Thanh nhạc/Thiết kế
 * đồ hoạ — Nhóm 4, không có bảng quy đổi tổ hợp). Chỉ 1 method — nhánh exact theo NGÀNH cụ thể
 * (`exactCalculator: true`).
 */
export const thanglongAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'thanglong-thpt-exam-exact-2025',
    schoolId: 'thanglong',
    name: 'Xét kết quả thi TN THPT (phương thức 1) — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 22 ngành đại học chính quy của TLU-HN (trừ Thanh nhạc, Thiết kế đồ hoạ)'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
