import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { nluKnowledgeGaps } from './knowledgeGaps';

export const nluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'nlu-thpt-exam-2026',
    schoolId: 'nlu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh sử dụng điểm thi tốt nghiệp THPT 2026 (trừ Giáo dục mầm non, Sư phạm kỹ thuật nông nghiệp)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: nluKnowledgeGaps,
  },
];
