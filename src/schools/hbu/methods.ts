import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HBU (Trường Đại học Hòa Bình) 2025 — điểm chuẩn trúng tuyển theo NGÀNH (18/21 ngành đại học chính
 * quy, 15,00–20,50/30, đã cộng điểm ưu tiên theo xác nhận trực tiếp của nguồn), nguồn cross-check
 * điểm chuẩn (`sources.ts`) + tổ hợp CHÍNH CHỦ (ảnh trường). Chỉ 1 method — nhánh exact theo NGÀNH cụ
 * thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT.
 */
export const hbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hbu-thpt-exam-exact-2025',
    schoolId: 'hbu',
    name: 'Xét kết quả thi TN THPT — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025, chọn 1 trong 18 ngành đại học chính quy đã mô hình hoá của HBU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
