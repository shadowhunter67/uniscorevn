import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HTU (Trường Đại học Hà Tĩnh) 2025 — điểm trúng tuyển chính thức theo NGÀNH/mã xét tuyển (18 mã),
 * nguồn CHÍNH CHỦ ts.htu.edu.vn cho cả điểm trúng tuyển (`sources.ts:htu-threshold-2025`) và công
 * thức/tổ hợp (`sources.ts:htu-dean-2025`), cùng năm 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ
 * thể (`exactCalculator: true`), phương thức 1: xét kết quả thi TN THPT 2025.
 */
export const htuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'htu-thpt-exam-exact-2025',
    schoolId: 'htu',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành/mã xét tuyển',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 18 mã xét tuyển đại học chính quy của HTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
