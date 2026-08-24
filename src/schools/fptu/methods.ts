import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fptuKnowledgeGaps } from './knowledgeGaps';

export const fptuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fptu-thpt-exam-2026',
    schoolId: 'fptu',
    name: 'Xét tuyển kết hợp điểm thi tốt nghiệp THPT và học bạ lớp 12 năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, mọi cơ sở đào tạo FPTU trên toàn quốc'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fptuKnowledgeGaps,
  },
];
