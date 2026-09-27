import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

export const stuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'stu-thpt-exam-exact-2026',
    schoolId: 'stu',
    name: 'Xet diem thi tot nghiep THPT 2026 - diem chuan theo nganh',
    year: 2026,
    applicantTypes: ['Thi sinh xet PT02 bang diem thi tot nghiep THPT nam 2026 vao STU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
