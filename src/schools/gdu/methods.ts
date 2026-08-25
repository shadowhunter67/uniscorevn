import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { gduKnowledgeGaps } from './knowledgeGaps';

export const gduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'gdu-thpt-exam-2026',
    schoolId: 'gdu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoài Sức khỏe/Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: gduKnowledgeGaps,
  },
];
