import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * BLU (Trường Đại học Bạc Liêu) 2026 — điểm chuẩn trúng tuyển theo NGÀNH (13/15 ngành đại học chính
 * quy, 15,00–24,66/30, loại trừ Giáo dục Mầm non — trình độ cao đẳng + tổ hợp năng khiếu), nguồn ảnh
 * chụp thông báo điểm chuẩn chính thức + trang tổ hợp/priority chính thức (`sources.ts`), năm 2026.
 * Chỉ 1 method — nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`), nhánh xét kết quả thi TN
 * THPT 2026 (mã phương thức 100/405).
 */
export const bluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'blu-thpt-exam-exact-2026',
    schoolId: 'blu',
    name: 'Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 13 ngành đại học chính quy của BLU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
