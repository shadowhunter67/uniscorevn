import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * PVU (Trường Đại học Dầu khí Việt Nam) 2026 — Phương thức 1 (mã 100, xét kết quả thi TN THPT).
 * Điểm chuẩn hệ chính quy trong nước 22,50/30 áp dụng ĐỒNG NHẤT cho cả 3 ngành 2026 (Kỹ thuật
 * Địa chất, Kỹ thuật Dầu khí, Kỹ thuật Hóa học) và tất cả 11 tổ hợp — không cần bảng ngành riêng
 * (khác PCTU/HUST). Nguồn CHÍNH CHỦ pvu.edu.vn cho cả formula (`pvu-admission-info-2026`) và
 * threshold (`pvu-threshold-2026`), cùng năm 2026.
 */
export const pvuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pvu-thpt-exam-exact-2026',
    schoolId: 'pvu',
    name: 'Xét kết quả thi TN THPT (PT1) — Điểm chuẩn hệ chính quy trong nước',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào hệ chính quy trong nước PVU (Kỹ thuật Địa chất / Kỹ thuật Dầu khí / Kỹ thuật Hóa học)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
