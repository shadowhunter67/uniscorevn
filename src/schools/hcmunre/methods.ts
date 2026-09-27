import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * HCMUNRE (Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh) 2026 — điểm chuẩn trúng tuyển
 * theo NGÀNH (20/20 ngành đại học chính quy, 15,00–21,00/30), nguồn Quyết định về điểm trúng tuyển
 * đại học chính quy đợt 1 năm 2026 + file đính kèm PT1.pdf (`sources.ts`). Chỉ 1 method — nhánh
 * exact Phương thức 1 (xét kết quả điểm thi TN THPT 2026, `exactCalculator: true`).
 */
export const hcmunreAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hcmunre-thpt-exam-exact-2026',
    schoolId: 'hcmunre',
    name: 'Phương thức 1 — Xét kết quả thi TN THPT — Điểm trúng tuyển theo ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét Phương thức 1 (kết quả thi TN THPT 2026), chọn 1 trong 20 ngành đại học chính quy của HCMUNRE'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
