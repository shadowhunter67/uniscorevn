import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * VHS (Trường Đại học Văn hóa TP.HCM) 2026 — điểm trúng tuyển đợt 1 theo NGÀNH/CHUYÊN NGÀNH (14/16
 * dòng mã phương thức 100, 20,30–24,40/30, đã cộng điểm ưu tiên theo bảng TỰ CÔNG BỐ của trường),
 * nguồn threshold + tổ hợp CHÍNH CHỦ (`sources.ts`). Chỉ 1 method — nhánh exact theo NGÀNH cụ thể
 * (`exactCalculator: true`), mã phương thức 100 (xét kết quả thi TN THPT 2026).
 */
export const vhsAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vhs-thpt-exam-exact-2026',
    schoolId: 'vhs',
    name: 'Xét kết quả thi TN THPT 2026 (mã 100) — Điểm trúng tuyển đợt 1 theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 14 ngành/chuyên ngành đại học chính quy đã mô hình hoá của VHS'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
