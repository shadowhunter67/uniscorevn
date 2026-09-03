import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * CTUET (Trường Đại học Kỹ thuật - Công nghệ Cần Thơ, mã trường KCC) 2025 — điểm trúng tuyển chính
 * thức theo NGÀNH (22 ngành, 20.15–24.68/30), nguồn CHÍNH CHỦ cho cả formula
 * (`sources.ts:ctuet-thongtin-2025`) và điểm trúng tuyển (`sources.ts:ctuet-threshold-2025`), cùng
 * năm 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), phương thức xét
 * kết quả thi TN THPT 2025 (mã xét tuyển 100 trong Thông tin tuyển sinh 2025).
 */
export const ctuetAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ctuet-thpt-exam-exact-2025',
    schoolId: 'ctuet',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 22 ngành đại học chính quy của CTUET'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
