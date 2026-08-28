import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fbuKnowledgeGaps } from './knowledgeGaps';

export const fbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fbu-thpt-exam-2026',
    schoolId: 'fbu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fbuKnowledgeGaps,
  },
  /**
   * Nhánh exact — mã phương thức 100 (xét kết quả thi TN THPT), nhóm ngành chung (KHÔNG gồm Luật
   * kinh tế — ngưỡng riêng 60% thang điểm + điều kiện môn Toán, xem `knowledgeGaps.ts`). Quyết
   * định 99/QĐ-ĐHTNH mục 2.1.2 xác nhận công thức Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2
   * + Điểm môn 3)/4] × 3 + ĐKK + ĐXT + ĐƯT (tối đa 30); mục 6.1.1 xác nhận ngưỡng 17,0/30 cho nhóm
   * ngành chung.
   */
  {
    id: 'fbu-thpt-exam-exact-2026',
    schoolId: 'fbu',
    name: 'Xét kết quả thi TN THPT (mã 100) — Ngưỡng đảm bảo chất lượng đầu vào (nhóm ngành chung, trừ Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào FBU (nhóm ngành chung, trừ Luật kinh tế)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: true, priority: true, exactCalculator: true },
  },
];
