import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * DNU (Trường Đại học Đồng Nai) 2025 — điểm trúng tuyển chính thức theo NGÀNH (9/11 ngành có
 * phương thức thi TN THPT, 16.00–26.51/30), nguồn CHÍNH CHỦ dnpu.edu.vn cho cả điểm trúng tuyển
 * (`sources.ts:dnu-threshold-2025`) và tổ hợp/công thức (`sources.ts:dnu-thongtin-2025`), cùng năm
 * 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), phương thức xét kết
 * quả thi TN THPT 2025 (mã phương thức 100 trong Thông tin tuyển sinh 2025).
 */
export const dnuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dnu-thpt-exam-exact-2025',
    schoolId: 'dnu',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 9 ngành đại học chính quy của DNU có phương thức này'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
