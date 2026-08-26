import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hcmupesKnowledgeGaps } from './knowledgeGaps';

export const hcmupesAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hcmupes-thpt-plus-talent-2026',
    schoolId: 'hcmupes',
    name: 'Xét kết quả thi tốt nghiệp THPT kết hợp điểm năng khiếu TDTT năm 2026 (ngành Giáo dục thể chất)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Giáo dục thể chất'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hcmupesKnowledgeGaps,
  },
];
