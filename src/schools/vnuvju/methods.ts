import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

export const vnuvjuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuvju-thpt-exam-exact-2026',
    schoolId: 'vnuvju',
    name: 'Phương thức 100 — Xét kết quả thi TN THPT — Điểm trúng tuyển theo chương trình',
    year: 2026,
    applicantTypes: ['Thí sinh xét Phương thức 100 (kết quả thi TN THPT 2026), chọn 1 trong 9 chương trình đào tạo của VJU'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
  },
];
