import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * DUMTP (Trường Đại học Kỹ thuật Y - Dược Đà Nẵng) 2025 — điểm trúng tuyển chính thức theo
 * NGÀNH/chuyên ngành (9 mã), nguồn CHÍNH CHỦ ydn.edu.vn cho cả điểm trúng tuyển
 * (`sources.ts:dumtp-threshold-2025`) và công thức/tổ hợp (`sources.ts:dumtp-dean-2025`), cùng năm
 * 2025. Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), phương thức 1: xét
 * kết quả thi TN THPT 2025 (mã phương thức 100).
 */
export const dumtpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dumtp-thpt-exam-exact-2025',
    schoolId: 'dumtp',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành/chuyên ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 9 mã ngành/chuyên ngành đại học chính quy của DUMTP'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
