import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * NAEM (Học viện Quản lý giáo dục) 2025 — điểm trúng tuyển chính thức theo NGÀNH (7/7 ngành đại học
 * chính quy, 15,00–25,50/30), nguồn CHÍNH CHỦ naem.edu.vn cho cả điểm trúng tuyển
 * (`sources.ts:naem-threshold-2025`) và tổ hợp/công thức (`sources.ts:naem-thongtin-2025`,
 * `sources.ts:naem-priority-formula-2025`), cùng năm 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ
 * thể (`exactCalculator: true`), phương thức xét kết quả thi TN THPT 2025 (mã phương thức 100).
 */
export const naemAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'naem-thpt-exam-exact-2025',
    schoolId: 'naem',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 7 ngành đại học chính quy của NAEM'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
