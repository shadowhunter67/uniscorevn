import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dtuKnowledgeGaps } from './knowledgeGaps';

export const dtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dtu-thpt-exam-2026',
    schoolId: 'dtu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dtuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact) cho thí sinh KHÔNG có điểm cộng, "ngành chung" (trừ
   * lĩnh vực pháp luật/sức khỏe — điều kiện riêng qua học lực; trừ Kiến trúc/Thanh nhạc — năng
   * khiếu). Trích nguyên văn trang tuyển sinh chính thức (`sources.ts:dtu-admission-info-2026`,
   * mục V.1.a): "Điểm Xét tuyển = Điểm thi môn 1 + Điểm thi môn 2 + Điểm thi môn 3 + Điểm cộng +
   * Điểm ưu tiên" ⇒ với thí sinh không điểm cộng, ĐXT = tổng thô 3 môn + điểm ưu tiên. Điểm ưu
   * tiên theo Điều 7 TT 06/2026 (judgment call, `priority.ts`). Ngưỡng 15,00/30. KHÔNG gắn
   * `knowledgeGaps`.
   */
  {
    id: 'dtu-thpt-exam-exact-2026',
    schoolId: 'dtu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (ngành chung, không điểm cộng)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành "chung" DTU (ngoài pháp luật/sức khỏe/Kiến trúc/Thanh nhạc), không có điểm cộng thành tích'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
