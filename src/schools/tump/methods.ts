import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * TUMP (Trường Đại học Y - Dược, Đại học Thái Nguyên) 2025 — điểm trúng tuyển chính thức theo
 * NGÀNH (9/9 ngành đại học chính quy, 18,30–26,15/30), nguồn CHÍNH CHỦ tuyensinh.tump.edu.vn cho cả
 * điểm trúng tuyển (`sources.ts:tump-threshold-2025`) và tổ hợp/công thức
 * (`sources.ts:tump-thongtin-2025`), cùng năm 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể
 * (`exactCalculator: true`), phương thức xét kết quả thi TN THPT 2025 (mã phương thức 100).
 */
export const tumpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tump-thpt-exam-exact-2025',
    schoolId: 'tump',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 9 ngành đại học chính quy của TUMP'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
