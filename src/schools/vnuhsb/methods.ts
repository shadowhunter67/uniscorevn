import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

export const vnuhsbAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuhsb-thpt-exam-exact-2026',
    schoolId: 'vnuhsb',
    name: 'Phương thức 100 — Xét kết quả thi TN THPT — Điểm trúng tuyển theo chương trình',
    year: 2026,
    applicantTypes: ['Thí sinh xét Phương thức 100 (kết quả thi TN THPT 2026), chọn 1 trong 6 chương trình đào tạo của VNU-HSB'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
