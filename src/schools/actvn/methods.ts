import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

export const actvnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'actvn-thpt-exam-exact-2026',
    schoolId: 'actvn',
    name: 'Xét kết quả thi TN THPT 2026 — Điểm chuẩn theo mã xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026, chọn 1 trong 4 mã xét tuyển hệ kinh tế - xã hội của ACTVN'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
