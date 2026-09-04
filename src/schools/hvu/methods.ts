import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HVU (Trường Đại học Hùng Vương, Phú Thọ) 2026 — điểm chuẩn trúng tuyển đợt 1 theo NGÀNH (7/27 ngành
 * đại học chính quy, 22,63–26,50/30, đã cộng điểm ưu tiên theo suy luận chuẩn), nguồn cross-check điểm
 * chuẩn (`sources.ts`) + tổ hợp CHÍNH CHỦ (Quyết định 226/QĐ-ĐHHV). Chỉ 1 method — nhánh exact theo
 * NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN THPT 2026 (TS01).
 */
export const hvuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hvu-thpt-exam-exact-2026',
    schoolId: 'hvu',
    name: 'Xét kết quả thi TN THPT 2026 (TS01) — Điểm chuẩn đợt 1 theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 7 ngành đại học chính quy đã mô hình hoá của HVU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
