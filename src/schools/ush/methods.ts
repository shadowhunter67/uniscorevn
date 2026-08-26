import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ushKnowledgeGaps } from './knowledgeGaps';

export const ushAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ush-thpt-plus-talent-2026',
    schoolId: 'ush',
    name: 'Xét kết quả thi tốt nghiệp THPT kết hợp điểm năng khiếu TDTT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026 (Huấn luyện thể thao, Quản lý TDTT, Y sinh học TDTT)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ushKnowledgeGaps,
  },
];
