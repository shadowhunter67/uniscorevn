import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { qtuKnowledgeGaps } from './knowledgeGaps';

export const qtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'qtu-thpt-exam-2026',
    schoolId: 'qtu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: qtuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Trích nguyên văn đề án
   * tuyển sinh mục 4.2: "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (nếu
   * có)". Ngưỡng theo nhóm ngành (Điều dưỡng 18/30, còn lại 15/30, `thresholds.ts`). Phạm vi tổ
   * hợp: tập chung nằm trong taxonomy hiện có, chưa ràng buộc chặt theo từng ngành (xem
   * `knowledgeGaps.ts:qtu-combination-scope-not-full`). KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'qtu-thpt-exam-exact-2026',
    schoolId: 'qtu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 11 ngành QTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
