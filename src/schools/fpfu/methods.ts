import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fpfuKnowledgeGaps } from './knowledgeGaps';

export const fpfuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fpfu-thpt-exam-2026',
    schoolId: 'fpfu',
    name: 'Xét tuyển hệ dân sự theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, hệ dân sự (ngoài ngành Công an)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fpfuKnowledgeGaps,
  },
];
