import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HCA (Học viện Cán bộ Thành phố Hồ Chí Minh) 2025 — phương thức 100 (xét kết quả thi TN THPT
 * 2025), nguồn CHÍNH CHỦ (bản PDF gốc có chữ ký/con dấu, mirror trên tuyensinh247.com vì
 * tuyensinh.hcmca.edu.vn không truy cập được từ môi trường research) cho tổ hợp (`sources.ts:
 * hca-notice-09-2025`) và công thức/điểm ưu tiên/điểm khuyến khích (`sources.ts:hca-de-an-2026`,
 * áp dụng liên tục qua các năm — không thay đổi giữa 2025/2026 ngoài bộ tổ hợp). 5/5 ngành đại học
 * chính quy của Học viện đều mô hình hoá được (khác BMTU chỉ 2/7).
 */
export const hcaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hca-thpt-exam-exact-2025',
    schoolId: 'hca',
    name: 'Xét kết quả thi TN THPT (mã phương thức 100) — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2025 vào HCA, cả 5 ngành đại học chính quy'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
