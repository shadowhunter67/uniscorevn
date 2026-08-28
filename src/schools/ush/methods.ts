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
  /**
   * Nhánh exact — cùng nhóm ngành (Huấn luyện thể thao/Quản lý TDTT/Y sinh học TDTT), PT1 (mã
   * 405). Quyết định 58/QĐ-TDTTHCM mục 2.1 xác nhận công thức ĐXT = ĐVH1 + ĐVH2 + ĐNK + Điểm ưu
   * tiên + Điểm cộng (nếu có), mục 3.2.b xác nhận ngưỡng đầu vào (KHÔNG cộng ưu tiên) 15,00/30 +
   * năng khiếu ≥ 5,00/10.
   */
  {
    id: 'ush-thpt-plus-talent-exact-2026',
    schoolId: 'ush',
    name: 'Xét kết quả thi TN THPT + năng khiếu TDTT (mã 405) — Ngưỡng đầu vào và điểm xét tuyển tham khảo',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT + năng khiếu TDTT 2026 vào USH (Huấn luyện thể thao, Quản lý TDTT, Y sinh học TDTT)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
