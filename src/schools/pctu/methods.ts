import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

/**
 * Batch 2026-09-03 — PCTU (Trường Đại học Phan Châu Trinh) 2025: điểm chuẩn theo ngành (chung cho
 * mọi tổ hợp trong ngành đó), nguồn chính chủ pctu.edu.vn (`sources.ts`) cho cả formula
 * (`pctu-admission-info-2025`) và threshold (`pctu-threshold-2025`), cùng năm 2025. Chỉ 1 method —
 * nhánh exact theo NGÀNH cụ thể (`exactCalculator: true`) — KHÔNG cần baseline dải điểm riêng vì
 * PCTU chỉ có 6 ngành với biên độ điểm hẹp và mỗi ngành ứng với đúng 1 threshold.
 */
export const pctuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pctu-thpt-exam-exact-2025',
    schoolId: 'pctu',
    name: 'Xét điểm thi TN THPT (PT2) — Điểm chuẩn theo ngành',
    year: 2025,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2025, chọn 1 trong 6 ngành đại học chính quy của PCTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
