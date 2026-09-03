import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * TNUT (Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên) 2025 — điểm trúng tuyển chính
 * thức theo NGÀNH/mã xét tuyển (26 mã, 15,00–24,50/30), nguồn CHÍNH CHỦ tnut.edu.vn cho cả điểm
 * trúng tuyển (`sources.ts:tnut-threshold-2025`) và công thức/tổ hợp
 * (`sources.ts:tnut-huongdan-2025`, `sources.ts:tnut-nganh-chitieu-2025`), cùng năm 2025. Chỉ 1
 * method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), phương thức xét kết quả thi TN
 * THPT 2025.
 */
export const tnutAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnut-thpt-exam-exact-2025',
    schoolId: 'tnut',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành/mã xét tuyển',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 26 mã xét tuyển đại học chính quy của TNUT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
