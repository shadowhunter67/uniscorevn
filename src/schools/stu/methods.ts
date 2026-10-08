import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';

export const stuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'stu-thpt-exam-exact-2026',
    schoolId: 'stu',
    name: 'Xet điểm thi tốt nghiệp THPT 2026 - điểm chuẩn theo ngành',
    year: 2026,
    applicantTypes: ['Thi sinh xét PT02 bảng điểm thi tốt nghiệp THPT năm 2026 vao STU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
