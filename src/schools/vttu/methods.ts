import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * VTTU (Trường Đại học Võ Trường Toản) 2025 — mức điểm nhận hồ sơ xét tuyển theo NGÀNH (9/9 ngành đại
 * học chính quy, 15,00–20,50/30), nguồn ảnh CHÍNH CHỦ mức điểm + tổ hợp môn (`sources.ts`), năm 2025.
 * Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN
 * THPT (hoặc THPT quốc gia), mã xét tuyển 100/101.
 */
export const vttuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vttu-thpt-exam-exact-2025',
    schoolId: 'vttu',
    name: 'Xét kết quả thi TN THPT — Mức điểm nhận hồ sơ theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT (hoặc THPT quốc gia) 2025, chọn 1 trong 9 ngành đại học chính quy của VTTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
