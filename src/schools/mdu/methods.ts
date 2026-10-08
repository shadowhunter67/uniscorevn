import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { mduKnowledgeGaps } from './knowledgeGaps';

export const mduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'mdu-thpt-exam-2026',
    schoolId: 'mdu',
    name: 'Xet kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thi sinh xét tuyển bằng kết quả thi tốt nghiệp THPT năm 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: mduKnowledgeGaps,
  },
  {
    id: 'mdu-thpt-exam-exact-2026',
    schoolId: 'mdu',
    name: 'Xet kết quả thi TN THPT - ngưỡng điểm chuẩn theo ngành',
    year: 2026,
    applicantTypes: ['Thi sinh xét kết quả thi TN THPT 2026 vao các ngành MDU/MIT trong phạm vi exact (tru Dược học, Luật kinh tế)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
